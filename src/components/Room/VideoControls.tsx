import React from 'react';
import { Camera, Mic, CameraOff, MicOff } from 'lucide-react';

interface VideoControlsProps {
  isMicEnabled: boolean;
  isCameraEnabled: boolean;
  onToggleMic: () => void;
  onToggleCamera: () => void;
}

export default function VideoControls({
  isMicEnabled,
  isCameraEnabled,
  onToggleMic,
  onToggleCamera,
}: VideoControlsProps) {
  return (
    <div className="absolute bottom-4 right-4 flex space-x-2">
      <button
        onClick={onToggleMic}
        className={`p-2 rounded-lg ${isMicEnabled ? 'bg-white/20' : 'bg-red-500/50'}`}
      >
        {isMicEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
      </button>
      <button
        onClick={onToggleCamera}
        className={`p-2 rounded-lg ${isCameraEnabled ? 'bg-white/20' : 'bg-red-500/50'}`}
      >
        {isCameraEnabled ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
      </button>
    </div>
  );
}