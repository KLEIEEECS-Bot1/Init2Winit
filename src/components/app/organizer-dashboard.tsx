"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TaskCreator } from './task-creator';
import TaskVerification from './task-verification';
import type { Task, Difficulty } from '@/lib/types';

interface OrganizerDashboardProps {
  tasks: Task[];
  createTask: (title: string, description: string, difficulty: Difficulty) => void;
  verifyTask: (taskId: number) => void;
}

export default function OrganizerDashboard({ tasks, createTask, verifyTask }: OrganizerDashboardProps) {
    const tasksToVerify = tasks.filter(task => task.status === 'completed');

  return (
    <Tabs defaultValue="verify">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="verify">Verify Tasks ({tasksToVerify.length})</TabsTrigger>
        <TabsTrigger value="create">Create Task</TabsTrigger>
      </TabsList>
      <TabsContent value="verify">
        <TaskVerification tasks={tasksToVerify} verifyTask={verifyTask} />
      </TabsContent>
      <TabsContent value="create">
        <TaskCreator createTask={createTask} />
      </TabsContent>
    </Tabs>
  );
}
