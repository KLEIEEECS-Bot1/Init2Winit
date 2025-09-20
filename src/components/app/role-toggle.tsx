"use client";

import type { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import { UserCog, User } from 'lucide-react';
import type { UserRole } from '@/lib/types';

interface RoleToggleProps {
  currentRole: UserRole;
  setCurrentRole: Dispatch<SetStateAction<UserRole>>;
}

export function RoleToggle({ currentRole, setCurrentRole }: RoleToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant={currentRole === 'volunteer' ? 'default' : 'outline'}
        onClick={() => setCurrentRole('volunteer')}
        className="gap-2"
      >
        <User />
        Volunteer
      </Button>
      <Button
        variant={currentRole === 'organizer' ? 'default' : 'outline'}
        onClick={() => setCurrentRole('organizer')}
        className="gap-2"
      >
        <UserCog />
        Organizer
      </Button>
    </div>
  );
}
