import { useEffect, useRef } from 'react';
import AgoraRTC, { IAgoraRTCClient, ClientConfig } from 'agora-rtc-sdk-ng';
import { agoraConfig } from '../config/agora';

const config: ClientConfig = {
  mode: 'rtc',
  codec: 'vp8',
  appId: agoraConfig.appId,
  statsCollectorDisabled: agoraConfig.statsCollectorDisabled,
  logUploadDisabled: agoraConfig.logUploadDisabled,
};

export function useAgoraClient() {
  const clientRef = useRef<IAgoraRTCClient | null>(null);

  useEffect(() => {
    if (!clientRef.current) {
      clientRef.current = AgoraRTC.createClient(config);
    }

    return () => {
      if (clientRef.current) {
        clientRef.current.leave().catch(() => {});
        clientRef.current.removeAllListeners();
        clientRef.current = null;
      }
    };
  }, []);

  return clientRef.current;
}