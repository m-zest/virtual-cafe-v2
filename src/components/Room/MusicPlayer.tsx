import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { socket } from '../../services/socket';

interface MusicPlayerProps {
  roomId: string;
  playlist: Array<{
    title: string;
    artist: string;
    url: string;
  }>;
}

export default function MusicPlayer({ roomId, playlist }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { currentUser } = useStore();

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    audio.volume = isMuted ? 0 : volume;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      handleNext();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [volume, isMuted]);

  useEffect(() => {
    socket.on(`music-control-${roomId}`, (data: {
      type: string;
      track?: number;
      time?: number;
      userId: string;
    }) => {
      if (data.userId === currentUser?.id) return;

      switch (data.type) {
        case 'play':
          if (audioRef.current) {
            audioRef.current.play();
            setIsPlaying(true);
          }
          break;
        case 'pause':
          if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
          }
          break;
        case 'next':
          if (data.track !== undefined) {
            setCurrentTrack(data.track);
          }
          break;
        case 'seek':
          if (audioRef.current && data.time !== undefined) {
            audioRef.current.currentTime = data.time;
          }
          break;
      }
    });

    return () => {
      socket.off(`music-control-${roomId}`);
    };
  }, [roomId, currentUser?.id]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      socket.emit('music-control', {
        roomId,
        type: 'pause',
        userId: currentUser?.id,
      });
    } else {
      audioRef.current.play();
      socket.emit('music-control', {
        roomId,
        type: 'play',
        userId: currentUser?.id,
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const nextTrack = (currentTrack + 1) % playlist.length;
    setCurrentTrack(nextTrack);
    socket.emit('music-control', {
      roomId,
      type: 'next',
      track: nextTrack,
      userId: currentUser?.id,
    });
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    
    const time = (parseFloat(e.target.value) / 100) * audioRef.current.duration;
    audioRef.current.currentTime = time;
    socket.emit('music-control', {
      roomId,
      type: 'seek',
      time,
      userId: currentUser?.id,
    });
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const currentSong = playlist[currentTrack];

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-lg p-6">
      <audio
        ref={audioRef}
        src={currentSong.url}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">{currentSong.title}</h3>
            <p className="text-sm text-white/70">{currentSong.artist}</p>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className="p-3 bg-indigo-600 rounded-full text-white hover:bg-indigo-700"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20"
            >
              <SkipForward className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleMute}
              className="p-2 text-white hover:text-white/80"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-24 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}