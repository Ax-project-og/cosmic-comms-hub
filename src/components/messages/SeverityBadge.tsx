import { MessageSeverity } from '@/types/messages';
import { cn } from '@/lib/utils';
import { Flame, AlertTriangle, Info, MessageCircle } from 'lucide-react';

interface SeverityBadgeProps {
  severity: MessageSeverity;
  className?: string;
}

const severityConfig: Record<MessageSeverity, {
  icon: typeof Flame;
  label: string;
  color: string;
  bg: string;
  border: string;
}> = {
  critical: {
    icon: Flame,
    label: 'Critique',
    color: 'text-game-combat',
    bg: 'bg-game-combat/20',
    border: 'border-game-combat/50',
  },
  alert: {
    icon: AlertTriangle,
    label: 'Alerte',
    color: 'text-game-commerce',
    bg: 'bg-game-commerce/20',
    border: 'border-game-commerce/50',
  },
  info: {
    icon: Info,
    label: 'Info',
    color: 'text-game-system',
    bg: 'bg-game-system/20',
    border: 'border-game-system/50',
  },
  communication: {
    icon: MessageCircle,
    label: 'Message',
    color: 'text-game-player',
    bg: 'bg-game-player/20',
    border: 'border-game-player/50',
  },
};

export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-1 rounded border text-[10px] font-semibold uppercase tracking-wide',
        config.bg,
        config.border,
        config.color,
        className
      )}
    >
      <Icon className="w-3 h-3" />
      <span>{config.label}</span>
    </div>
  );
}
