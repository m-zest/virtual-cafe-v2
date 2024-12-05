import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Music, Users, Video, MessageCircle, Play, Pause, SkipForward, Volume2, Crown } from 'lucide-react';
import { useStore } from '../../store/useStore';
import VideoCall from './VideoCall';
import Chat from './Chat';
import { defaultRooms } from '../../config/rooms';

export default function RoomView() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { currentUser, activeUsers, customRooms, addUserToRoom, removeUserFromRoom, updateBalance } = useStore();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [audio] = useState(new Audio());
  const [achievements, setAchievements] = useState<string[]>([]);

  const hasJoinedRef = useRef(false);
  const achievementIntervalRef = useRef<number>();
  
  const customRoom = roomId ? customRooms.find(room => room.id === roomId) : null;
  const defaultRoom = roomId && roomId in defaultRooms ? defaultRooms[roomId as keyof typeof defaultRooms] : null;
  const room = customRoom || defaultRoom;

  // Handle room entry fee and user joining
  useEffect(() => {
    if (!currentUser || !room || !roomId) {
      navigate('/');
      return;
    }

    const entryFee = room.entryFee || 0;
    if (currentUser.balance < entryFee) {
      alert(`Insufficient balance. You need ${entryFee} coins to enter this room.`);
      navigate('/rooms');
      return;
    }

    if (!hasJoinedRef.current) {
      updateBalance(-entryFee);
      addUserToRoom(roomId, currentUser);
      hasJoinedRef.current = true;
    }

    // Cleanup function
    return () => {
      if (hasJoinedRef.current && roomId && currentUser) {
        removeUserFromRoom(roomId, currentUser.id);
        audio.pause();
        hasJoinedRef.current = false;
      }
    };
  }, [roomId, currentUser?.id]); // Only depend on roomId and currentUser.id

  // Handle audio volume
  useEffect(() => {
    audio.volume = volume;
  }, [volume, audio]);

  // Handle track ending
  useEffect(() => {
    const handleEnded = () => nextTrack();
    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [audio]);

  // Handle achievements
  useEffect(() => {
    if (!currentUser || !roomId) return;

    achievementIntervalRef.current = window.setInterval(() => {
      setAchievements(prev => {
        const newAchievement = `${currentUser.name} reached a new milestone! 10$ coins added`;
        return [...prev, newAchievement].slice(-5);
      });
    }, 10000);

    return () => {
      if (achievementIntervalRef.current) {
        clearInterval(achievementIntervalRef.current);
      }
    };
  }, [currentUser?.id, roomId]); // Only depend on currentUser.id and roomId

  const togglePlay = useCallback(() => {
    if (!room?.music?.length) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.src = room.music[currentTrack].url;
      audio.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, audio, room, currentTrack]);

  const nextTrack = useCallback(() => {
    if (!room?.music?.length) return;

    const nextIndex = (currentTrack + 1) % room.music.length;
    setCurrentTrack(nextIndex);
    audio.src = room.music[nextIndex].url;
    
    if (isPlaying) {
      audio.play().catch(console.error);
    }
  }, [currentTrack, isPlaying, audio, room]);

  if (!room || !currentUser || !roomId) return null;

  const roomUsers = activeUsers[roomId] || [];
  const currentSong = room.music?.[currentTrack];

  return (
    <div className="min-h-screen bg-gray-900 p-4 pt-20">
      {room.video && (
        <div className="fixed inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/70 z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            src={room.video}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 relative z-10">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-bold mb-4 flex items-center text-white">
              <Video className="w-6 h-6 mr-2" />
              Video Chat
            </h2>
            <VideoCall channelName={roomId} userId={currentUser.id} />
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center text-white">
              <Music className="w-6 h-6 mr-2" />
              Room Music
            </h2>
            {currentSong && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-white">
                  <div>
                    <p className="font-medium">{currentSong.title}</p>
                    <p className="text-sm text-white/70">{currentSong.artist}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={togglePlay}
                      className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6" />
                      )}
                    </button>
                    <button
                      onClick={nextTrack}
                      className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <SkipForward className="w-6 h-6" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-white">
                  <Volume2 className="w-5 h-5" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center text-white">
              <Crown className="w-6 h-6 mr-2" />
              Room Achievements
            </h2>
            <div className="space-y-2">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-lg p-3 text-white flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  {achievement}
                </div>
              ))}
              {achievements.length === 0 && (
                <p className="text-gray-400">Stay active to earn achievements!</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-bold mb-4 flex items-center text-white">
              <Users className="w-6 h-6 mr-2" />
              Active Users ({roomUsers.length})
            </h2>
            <div className="space-y-2">
              {roomUsers.map((user) => (
                <div key={user.id} className="flex items-center space-x-2 text-white">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{user.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-bold mb-4 flex items-center text-white">
              <MessageCircle className="w-6 h-6 mr-2" />
              Room Chat
            </h2>
            <Chat roomId={roomId} />
          </div>
        </div>
      </div>
    </div>
  );
}