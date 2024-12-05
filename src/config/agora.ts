export const agoraConfig = {
  appId: import.meta.env.VITE_AGORA_APP_ID || '',
  mode: 'rtc' as const,
  codec: 'vp8' as const,
  client: {
    statsCollectorDisabled: true,
    logUploadDisabled: true,
  },
  video: {
    encoderConfig: {
      width: 640,
      height: 480,
      frameRate: 30,
      bitrateMin: 400,
      bitrateMax: 1000,
    },
  },
  audio: {
    encoderConfig: 'high_quality',
  },
};