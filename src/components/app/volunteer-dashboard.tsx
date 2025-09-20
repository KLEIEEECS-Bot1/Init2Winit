"use client";

import VolunteerStats from './volunteer-stats';
import TaskList from './task-list';
import type { Task, Volunteer } from '@/lib/types';

interface VolunteerDashboardProps {
  volunteer: Volunteer;
  tasks: Task[];
  takeTask: (taskId: number) => void;
  completeTask: (taskId: number) => void;
}

export default function VolunteerDashboard({ volunteer, tasks, takeTask, completeTask }: VolunteerDashboardProps) {
  return (
    <div className="space-y-6">
      <VolunteerStats volunteer={volunteer} />
      <TaskList
        volunteer={volunteer}
        tasks={tasks}
        takeTask={takeTask}
        completeTask={completeTask}
      />
    </div>
  );
}
