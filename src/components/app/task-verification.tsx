"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Task } from '@/lib/types';
import { CheckCircle } from 'lucide-react';

interface TaskVerificationProps {
  tasks: Task[];
  verifyTask: (taskId: number) => void;
}

export default function TaskVerification({ tasks, verifyTask }: TaskVerificationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify Completed Tasks</CardTitle>
        <CardDescription>Review tasks marked as complete by volunteers and award tokens.</CardDescription>
      </CardHeader>
      <CardContent>
        {tasks.length > 0 ? (
          <div className="space-y-4">
            {tasks.map(task => (
              <div key={task.id} className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-sm text-muted-foreground">Completed by Volunteer ID: {task.completedBy}</p>
                </div>
                <Button onClick={() => verifyTask(task.id)} size="sm" className="gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Verify & Award {task.tokens} Tokens
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border border-dashed rounded-lg">
            <p className="text-muted-foreground">No tasks are currently waiting for verification.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
