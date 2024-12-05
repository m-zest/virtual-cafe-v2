import { useState, useEffect } from 'react';
import AgoraRTC, { ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-sdk-ng';

export function useLocalTracks() {
  const [localTracks, setLocalTracks] = useState<[IMicrophoneAudioTrack, ICameraVideoTrack] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function initializeTracks() {
      try {
        // Request permissions first
        await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        const tracks = await AgoraRTC.createMicrophoneAndCameraTracks(
          { encoderConfig: 'high_quality' },
          { 
            encoderConfig: { 
              width: 640, 
              height: 480, 
              frameRate: 30,
              bitrateMin: 400,
              bitrateMax: 1000
            } 
          }
        );

        if (mounted) {
          setLocalTracks(tracks);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError('Failed to initialize camera and microphone. Please check your permissions.');
          console.error('Track initialization error:', err);
        }
      }
    }

    initializeTracks();

    return () => {
      mounted = false;
      if (localTracks) {
        localTracks[0].close();
        localTracks[1].close();
      }
    };
  }, []);

  return { localTracks, error };
}