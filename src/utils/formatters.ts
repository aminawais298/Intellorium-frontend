export function formatCurrency(amount: number): string {
  return `PKR ${amount.toLocaleString('en-PK')}`;
}

export function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function formatDateShort(dateStr: string | undefined): string {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('en-PK', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    PENDING: 'text-yellow-400 bg-yellow-400/10',
    SUBMITTED: 'text-blue-400 bg-blue-400/10',
    UNDER_REVIEW: 'text-orange-DEFAULT bg-orange/10',
    APPROVED: 'text-green-400 bg-green-400/10',
    REJECTED: 'text-red-400 bg-red-400/10',
    COMPLETED: 'text-green-400 bg-green-400/10',
    FAILED: 'text-red-400 bg-red-400/10',
    ACTIVE: 'text-green-400 bg-green-400/10',
    UPCOMING: 'text-blue-400 bg-blue-400/10',
    PAID: 'text-green-400 bg-green-400/10',
    UNPAID: 'text-red-400 bg-red-400/10',
    PARTIAL: 'text-yellow-400 bg-yellow-400/10',
  };
  return colors[status] || 'text-white/60 bg-white/5';
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

export function getGrowthIndicator(growth: number): { icon: string; color: string } {
  if (growth > 0) return { icon: '↑', color: 'text-green-400' };
  if (growth < 0) return { icon: '↓', color: 'text-red-400' };
  return { icon: '→', color: 'text-white/40' };
}
