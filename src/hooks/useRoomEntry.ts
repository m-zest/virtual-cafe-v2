import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function useRoomEntry(roomId: string, entryFee: number) {
  const [canEnterRoom, setCanEnterRoom] = useState(false);
  const hasJoinedRef = useRef(false);
  const { currentUser, updateBalance, addUserToRoom, removeUserFromRoom } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
      return;
    }

    if (currentUser.balance < entryFee) {
      alert(`Insufficient balance. You need ${entryFee} coins to enter this room.`);
      navigate('/rooms');
      return;
    }

    if (!hasJoinedRef.current) {
      updateBalance(-entryFee);
      addUserToRoom(roomId, currentUser);
      setCanEnterRoom(true);
      hasJoinedRef.current = true;
    }

    return () => {
      if (hasJoinedRef.current && currentUser) {
        removeUserFromRoom(roomId, currentUser.id);
        hasJoinedRef.current = false;
      }
    };
  }, [roomId, currentUser?.id, entryFee]); // Simplified dependencies

  return { canEnterRoom };
}