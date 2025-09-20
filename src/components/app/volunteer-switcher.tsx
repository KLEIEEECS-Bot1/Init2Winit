"use client";

import type { Dispatch, SetStateAction } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Volunteer } from '@/lib/types';

interface VolunteerSwitcherProps {
  volunteers: Volunteer[];
  currentVolunteerId: number;
  setCurrentVolunteerId: Dispatch<SetStateAction<number>>;
}

export function VolunteerSwitcher({ volunteers, currentVolunteerId, setCurrentVolunteerId }: VolunteerSwitcherProps) {
  return (
    <Select
      value={String(currentVolunteerId)}
      onValueChange={(value) => setCurrentVolunteerId(Number(value))}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Switch Volunteer" />
      </SelectTrigger>
      <SelectContent>
        {volunteers.map((volunteer) => (
          <SelectItem key={volunteer.id} value={String(volunteer.id)}>
            {volunteer.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
