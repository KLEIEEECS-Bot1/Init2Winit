"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Task, Difficulty } from '@/lib/types';
import { Award, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  volunteerId: number | null;
  onAction: (taskId: number) => void;
  actionLabel: string;
}

const difficultyBadgeMap: Record<Difficulty, string> = {
  easy: 'bg-chart-2 text-primary-foreground border-transparent hover:bg-chart-2/80',
  intermediate: 'bg-chart-4 text-primary-foreground border-transparent hover:bg-chart-4/80',
  difficult: 'bg-destructive text-destructive-foreground border-transparent hover:bg-destructive/80',
};

export function TaskCard({ task, volunteerId, onAction, actionLabel }: TaskCardProps) {
  const isAssigned = task.assignedTo !== null;
  const isAssignedToMe = task.assignedTo === volunteerId;
  const canTake = task.status === 'open';
  const canComplete = task.status === 'in_progress' && isAssignedToMe;

  return (
    <Card className="flex flex-col justify-between transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-start">
            <CardTitle className="text-lg mb-2 pr-4">{task.title}</CardTitle>
            <Badge className={cn(difficultyBadgeMap[task.difficulty], 'capitalize shrink-0')}>{task.difficulty}</Badge>
        </div>
        <CardDescription>{task.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-muted-foreground gap-2">
            <Award className="h-4 w-4 text-yellow-500"/>
            <span>{task.tokens} Tokens</span>
        </div>
      </CardContent>
      <CardFooter>
        {(canTake || canComplete) && (
            <Button onClick={() => onAction(task.id)} className="w-full gap-2" variant={canComplete ? 'default' : 'secondary'}>
                <Zap className="h-4 w-4" />
                {actionLabel}
            </Button>
        )}
        {task.status === 'in_progress' && !isAssignedToMe && (
            <p className="text-sm text-muted-foreground w-full text-center">Task is in progress</p>
        )}
      </CardFooter>
    </Card>
  );
}
