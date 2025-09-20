"use client";

import { useTaskRewarder } from '@/hooks/use-task-rewarder';
import { Skeleton } from '@/components/ui/skeleton';
import { AppHeader } from './header';
import VolunteerDashboard from './volunteer-dashboard';
import OrganizerDashboard from './organizer-dashboard';

export function TaskRewarderApp() {
  const {
    isDataLoaded,
    tasks,
    volunteers,
    currentRole,
    setCurrentRole,
    currentVolunteer,
    setCurrentVolunteerId,
    createTask,
    takeTask,
    completeTask,
    verifyTask,
  } = useTaskRewarder();

  if (!isDataLoaded || !currentVolunteer) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-16 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AppHeader
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        volunteers={volunteers}
        currentVolunteerId={currentVolunteer.id}
        setCurrentVolunteerId={setCurrentVolunteerId}
      />
      
      {currentRole === 'volunteer' ? (
        <VolunteerDashboard
          volunteer={currentVolunteer}
          tasks={tasks}
          takeTask={takeTask}
          completeTask={completeTask}
        />
      ) : (
        <OrganizerDashboard
          tasks={tasks}
          createTask={createTask}
          verifyTask={verifyTask}
        />
      )}
    </div>
  );
}
