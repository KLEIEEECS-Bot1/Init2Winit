"use client";

import type { Dispatch, SetStateAction } from 'react';
import { RoleToggle } from './role-toggle';
import { VolunteerSwitcher } from './volunteer-switcher';
import type { UserRole, Volunteer } from '@/lib/types';
import { Gem } from 'lucide-react';

interface AppHeaderProps {
  currentRole: UserRole;
  setCurrentRole: Dispatch<SetStateAction<UserRole>>;
  volunteers: Volunteer[];
  currentVolunteerId: number;
  setCurrentVolunteerId: Dispatch<SetStateAction<number>>;
}

export function AppHeader({
  currentRole,
  setCurrentRole,
  volunteers,
  currentVolunteerId,
  setCurrentVolunteerId,
}: AppHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center p-4 bg-card rounded-lg shadow-md border">
      <div className="flex items-center gap-3 mb-4 sm:mb-0">
        <Gem className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold text-primary">TaskRewarder</h1>
      </div>
      <div className="flex items-center gap-4">
        <RoleToggle currentRole={currentRole} setCurrentRole={setCurrentRole} />
        {currentRole === 'volunteer' && (
          <VolunteerSwitcher
            volunteers={volunteers}
            currentVolunteerId={currentVolunteerId}
            setCurrentVolunteerId={setCurrentVolunteerId}
          />
        )}
      </div>
    </header>
  );
}
