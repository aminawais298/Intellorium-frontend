import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api';
import { DashboardData } from '@/types';

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const { data } = await api.get('/dashboard/student');
      return data.data as DashboardData;
    },
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
}
