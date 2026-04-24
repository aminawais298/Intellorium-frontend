import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/utils/api';
import { Student, BusinessLog } from '@/types';

export function useStudent() {
  return useQuery({
    queryKey: ['student', 'me'],
    queryFn: async () => {
      const { data } = await api.get('/students/me');
      return data.data as Student;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateStudent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updates: Partial<Student>) => {
      const { data } = await api.put('/students/me', updates);
      return data.data as Student;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student', 'me'] });
    },
  });
}

export function useBusinessLogs() {
  return useQuery({
    queryKey: ['business-logs'],
    queryFn: async () => {
      const { data } = await api.get('/students/me/business-logs');
      return data.data as BusinessLog[];
    },
  });
}

export function useCreateBusinessLog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (log: Omit<BusinessLog, 'id' | 'createdAt'>) => {
      const { data } = await api.post('/students/me/business-logs', log);
      return data.data as BusinessLog;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business-logs'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useStudentPublicProfile(studentId: string) {
  return useQuery({
    queryKey: ['student', studentId],
    queryFn: async () => {
      const { data } = await api.get(`/students/${studentId}/profile`);
      return data.data;
    },
    enabled: !!studentId,
  });
}
