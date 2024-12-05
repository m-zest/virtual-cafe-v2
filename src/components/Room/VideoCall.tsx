import React, { useState, useEffect } from 'react';
import AgoraRTC, { IAgoraRTCRemoteUser, ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-sdk-ng';
import { Camera, CameraOff, Mic, MicOff } from 'lucide-react';

interface VideoCallProps {
  channelName: string;
  userId: string;
}

const client = AgoraRTC.createClient({
  mode: 'rtc',
  codec: 'vp8',
});

export default function VideoCall({ channelName, userId }: VideoCallProps) {
  const [localTracks, setLocalTracks] = useState<[IMicrophoneAudioTrack, ICameraVideoTrack] | null>(null);
  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);

  useEffect(() => {
    const initializeAgora = async () => {
      if (!import.meta.env.VITE_AGORA_APP_ID) {
        console.error('Agora App ID is missing');
        return;
      }

      try {
        await client.join(
          import.meta.env.VITE_AGORA_APP_ID,
          channelName,
          null,
          userId
        );

        const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks(
          { encoderConfig: 'high_quality' },
          {
            encoderConfig: {
              width: 640,
              height: 480,
              frameRate: 30,
            },
          }
        );

        setLocalTracks([audioTrack, videoTrack]);
        await client.publish([audioTrack, videoTrack]);

        client.on('user-published', async (user, mediaType) => {
          await client.subscribe(user, mediaType);
          if (mediaType === 'video') {
            setRemoteUsers(prev => [...prev, user]);
          }
          if (mediaType === 'audio') {
            user.audioTrack?.play();
          }
        });

        client.on('user-unpublished', (user) => {
          setRemoteUsers(prev => prev.filter(u => u.uid !== user.uid));
        });
      } catch (error) {
        console.error('Error initializing Agora:', error);
      }
    };

    initializeAgora();

    return () => {
      localTracks?.[0].close();
      localTracks?.[1].close();
      client.removeAllListeners();
      client.leave();
    };
  }, [channelName, userId]);

  const toggleMic = async () => {
    if (!localTracks) return;
    await localTracks[0].setEnabled(!isMicEnabled);
    setIsMicEnabled(!isMicEnabled);
  };

  const toggleCamera = async () => {
    if (!localTracks) return;
    await localTracks[1].setEnabled(!isCameraEnabled);
    setIsCameraEnabled(!isCameraEnabled);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Local Video */}
      <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
        <div
          ref={node => node && localTracks?.[1].play(node)}
          className="w-full h-full"
        />
        <div className="absolute bottom-4 left-4 text-white bg-black/50 px-2 py-1 rounded">
          You
        </div>
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <button
            onClick={toggleMic}
            className={`p-2 rounded-lg ${isMicEnabled ? 'bg-white/20' : 'bg-red-500/50'}`}
          >
            {isMicEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>
          <button
            onClick={toggleCamera}
            className={`p-2 rounded-lg ${isCameraEnabled ? 'bg-white/20' : 'bg-red-500/50'}`}
          >
            {isCameraEnabled ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Remote Videos */}
      {remoteUsers.map(user => (
        <div key={user.uid} className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
          <div
            ref={node => node && user.videoTrack?.play(node)}
            className="w-full h-full"
          />
          <div className="absolute bottom-4 left-4 text-white bg-black/50 px-2 py-1 rounded">
            User {user.uid}
          </div>
        </div>
      ))}

      {/* Placeholder for empty grid spots */}
      {Array.from({ length: Math.max(0, 4 - remoteUsers.length - 1) }).map((_, i) => (
        <div
          key={`empty-${i}`}
          className="aspect-video bg-gray-900/50 rounded-lg flex items-center justify-center"
        >
          <p className="text-white/50">Waiting for participants...</p>
        </div>
      ))}
    </div>
  );
}