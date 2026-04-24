import { useQuery, useMutation } from '@tanstack/react-query';
import api from '@/utils/api';
import { Program, Application, ApplicationFormData } from '@/types';

export function usePrograms() {
  return useQuery({
    queryKey: ['programs'],
    queryFn: async () => {
      const { data } = await api.get('/programs');
      return data.data as Program[];
    },
    staleTime: 10 * 60 * 1000,
  });
}

export function useProgram(programId: string) {
  return useQuery({
    queryKey: ['programs', programId],
    queryFn: async () => {
      const { data } = await api.get(`/programs/${programId}`);
      return data.data as Program;
    },
    enabled: !!programId,
  });
}

export function useCohortMembers(programId: string) {
  return useQuery({
    queryKey: ['cohort', programId],
    queryFn: async () => {
      const { data } = await api.get(`/programs/${programId}/cohort`);
      return data.data;
    },
    enabled: !!programId,
  });
}

export function useMyApplications() {
  return useQuery({
    queryKey: ['applications', 'me'],
    queryFn: async () => {
      const { data } = await api.get('/applications/me');
      return data.data as Application[];
    },
  });
}

export function useSubmitApplication() {
  return useMutation({
    mutationFn: async (applicationData: ApplicationFormData) => {
      const { data } = await api.post('/applications', applicationData);
      return data.data;
    },
  });
}

export function useMyPayments() {
  return useQuery({
    queryKey: ['payments', 'me'],
    queryFn: async () => {
      const { data } = await api.get('/payments/me');
      return data.data;
    },
  });
}
