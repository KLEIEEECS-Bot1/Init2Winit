"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Star, CheckSquare } from 'lucide-react';
import type { Volunteer } from '@/lib/types';

interface VolunteerStatsProps {
  volunteer: Volunteer;
}

const StatCard = ({ icon, title, value }: { icon: React.ReactNode, title: string, value: string | number }) => (
    <div className="flex items-center space-x-4 rounded-md border p-4 bg-background">
        <div className="flex-shrink-0">{icon}</div>
        <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    </div>
);

export default function VolunteerStats({ volunteer }: VolunteerStatsProps) {
  return (
    <section>
        <h2 className="text-xl font-semibold mb-4">Your Stats</h2>
        <div className="grid gap-4 md:grid-cols-3">
            <StatCard icon={<Award className="h-8 w-8 text-yellow-500" />} title="Tokens" value={volunteer.tokens} />
            <StatCard icon={<Star className="h-8 w-8 text-blue-500" />} title="Level" value={volunteer.level.charAt(0).toUpperCase() + volunteer.level.slice(1)} />
            <StatCard icon={<CheckSquare className="h-8 w-8 text-green-500" />} title="Tasks Completed" value={volunteer.completedTasks.length} />
        </div>
    </section>
  );
}
