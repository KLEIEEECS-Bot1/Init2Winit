"use client";

import { useMemo } from 'react';
import { TaskCard } from './task-card';
import type { Task, Volunteer } from '@/lib/types';

interface TaskListProps {
  volunteer: Volunteer;
  tasks: Task[];
  takeTask: (taskId: number) => void;
  completeTask: (taskId: number) => void;
}

export default function TaskList({ volunteer, tasks, takeTask, completeTask }: TaskListProps) {
  const availableTasks = useMemo(() => {
    return tasks.filter(task => {
      const isAvailable = task.status === 'open';
      const isAssignedToMe = task.status === 'in_progress' && task.assignedTo === volunteer.id;

      if (!isAvailable && !isAssignedToMe) return false;

      switch (volunteer.level) {
        case 'beginner':
          return task.difficulty === 'easy';
        case 'intermediate':
          return task.difficulty === 'easy' || task.difficulty === 'intermediate';
        case 'advanced':
          return true;
        default:
          return false;
      }
    });
  }, [tasks, volunteer]);

  const myTasks = availableTasks.filter(task => task.assignedTo === volunteer.id);
  const openTasks = availableTasks.filter(task => task.status === 'open');

  return (
    <section>
      {myTasks.length > 0 && (
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">My Current Tasks</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {myTasks.map(task => (
                <TaskCard key={task.id} task={task} volunteerId={volunteer.id} onAction={completeTask} actionLabel="Mark Complete" />
            ))}
            </div>
        </div>
      )}
      
      <h2 className="text-xl font-semibold mb-4">Available Tasks</h2>
      {openTasks.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {openTasks.map(task => (
            <TaskCard key={task.id} task={task} volunteerId={volunteer.id} onAction={takeTask} actionLabel="Take Task" />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-card rounded-lg border border-dashed">
          <p className="text-muted-foreground">No available tasks for your level right now. Check back later!</p>
        </div>
      )}
    </section>
  );
}
