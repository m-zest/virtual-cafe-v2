import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { currentUser } = useStore();
  const location = useLocation();

  useEffect(() => {
    // This effect ensures we don't cause unnecessary re-renders
    if (!currentUser) {
      return;
    }
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}