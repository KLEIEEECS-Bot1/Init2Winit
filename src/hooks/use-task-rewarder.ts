"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useToast } from "@/hooks/use-toast";
import type { Task, Volunteer, Difficulty, UserRole, VolunteerLevel } from '@/lib/types';
import { initialTasks, initialVolunteers } from '@/lib/data';

const TASKS_STORAGE_KEY = 'taskRewarder_tasks';
const VOLUNTEERS_STORAGE_KEY = 'taskRewarder_volunteers';

const getFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
};

export const useTaskRewarder = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [currentRole, setCurrentRole] = useState<UserRole>('volunteer');
  const [currentVolunteerId, setCurrentVolunteerId] = useState<number>(1);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    setTasks(getFromLocalStorage(TASKS_STORAGE_KEY, initialTasks));
    setVolunteers(getFromLocalStorage(VOLUNTEERS_STORAGE_KEY, initialVolunteers));
    setIsDataLoaded(true);
  }, []);

  useEffect(() => {
    if (isDataLoaded) {
      window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, isDataLoaded]);

  useEffect(() => {
    if (isDataLoaded) {
      window.localStorage.setItem(VOLUNTEERS_STORAGE_KEY, JSON.stringify(volunteers));
    }
  }, [volunteers, isDataLoaded]);

  const calculateLevel = useCallback((completedTaskCount: number): VolunteerLevel => {
    if (completedTaskCount >= 8) return 'advanced';
    if (completedTaskCount >= 3) return 'intermediate';
    return 'beginner';
  }, []);

  const createTask = useCallback((title: string, description: string, difficulty: Difficulty) => {
    const tokenMap: Record<Difficulty, number> = {
      easy: 10,
      intermediate: 25,
      difficult: 50,
    };
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      difficulty,
      tokens: tokenMap[difficulty],
      status: 'open',
      assignedTo: null,
      createdBy: 'organizer',
    };
    setTasks(prev => [...prev, newTask]);
    toast({
      title: 'Task Created!',
      description: `"${title}" has been added to the task list.`,
    });
  }, [toast]);

  const takeTask = useCallback((taskId: number) => {
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === taskId ? { ...task, status: 'in_progress', assignedTo: currentVolunteerId } : task
    ));
    toast({ title: 'Task Taken!', variant: 'default' });
  }, [currentVolunteerId, toast]);

  const completeTask = useCallback((taskId: number) => {
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === taskId ? { ...task, status: 'completed', completedBy: currentVolunteerId } : task
    ));
    toast({ title: 'Task Marked as Complete!', description: 'An organizer will verify it soon.' });
  }, [currentVolunteerId, toast]);

  const verifyTask = useCallback((taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || !task.completedBy) return;

    setTasks(prevTasks => prevTasks.map(t =>
      t.id === taskId ? { ...t, status: 'verified' } : t
    ));

    setVolunteers(prevVolunteers => prevVolunteers.map(v => {
      if (v.id === task.completedBy) {
        const newCompletedTasks = [...v.completedTasks, taskId];
        const oldLevel = v.level;
        const newLevel = calculateLevel(newCompletedTasks.length);
        
        if (newLevel !== oldLevel) {
          toast({
            title: 'Level Up!',
            description: `Congratulations, you are now level: ${newLevel}!`,
            variant: 'default'
          });
        }
        
        return {
          ...v,
          tokens: v.tokens + task.tokens,
          completedTasks: newCompletedTasks,
          level: newLevel,
        };
      }
      return v;
    }));
    
    toast({
      title: 'Task Verified!',
      description: `${task.tokens} tokens awarded.`,
    });
  }, [tasks, calculateLevel, toast]);

  const currentVolunteer = useMemo(() => volunteers.find(v => v.id === currentVolunteerId), [volunteers, currentVolunteerId]);

  return {
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
  };
};
