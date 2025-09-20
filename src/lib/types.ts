export type Difficulty = 'easy' | 'intermediate' | 'difficult';
export type Status = 'open' | 'in_progress' | 'completed' | 'verified';
export type UserRole = 'volunteer' | 'organizer';
export type VolunteerLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Volunteer {
  id: number;
  name: string;
  level: VolunteerLevel;
  tokens: number;
  completedTasks: number[];
}

export interface Task {
  id: number;
  title: string;
  description: string;
  difficulty: Difficulty;
  tokens: number;
  status: Status;
  assignedTo: number | null;
  createdBy: UserRole;
  completedBy?: number | null;
}
