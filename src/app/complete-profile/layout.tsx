
'use client';

import React from 'react';
import { ProfileProvider } from '@/context/ProfileContext';

export default function CompleteProfileLayout({ children }: { children: React.ReactNode }) {

  return (
    <ProfileProvider>
        {children}
    </ProfileProvider>
  );
}
