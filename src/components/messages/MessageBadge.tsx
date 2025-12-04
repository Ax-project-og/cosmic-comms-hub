import { cn } from '@/lib/utils';
import { MessageType } from '@/types/messages';

interface MessageBadgeProps {
  type: MessageType | 'alert' | 'report' | 'private' | 'offer';
  className?: string;
}

const badgeStyles: Record<string, string> = {
  system: 'bg-game-system/20 text-game-system border-game-system/40',
  player: 'bg-game-player/20 text-game-player border-game-player/40',
  combat: 'bg-game-combat/20 text-game-combat border-game-combat/40',
  commerce: 'bg-game-commerce/20 text-game-commerce border-game-commerce/40',
  espionage: 'bg-game-espionage/20 text-game-espionage border-game-espionage/40',
  alert: 'bg-game-combat/30 text-game-combat border-game-combat/60 animate-pulse',
  report: 'bg-muted text-muted-foreground border-border',
  private: 'bg-game-player/20 text-game-player border-game-player/40',
  offer: 'bg-game-commerce/20 text-game-commerce border-game-commerce/40',
};

const badgeLabels: Record<string, string> = {
  system: 'SYSTÈME',
  player: 'JOUEUR',
  combat: 'COMBAT',
  commerce: 'COMMERCE',
  espionage: 'ESPIONNAGE',
  alert: 'ALERTE',
  report: 'RAPPORT',
  private: 'PRIVÉ',
  offer: 'OFFRE',
};

export function MessageBadge({ type, className }: MessageBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase border rounded font-display',
        badgeStyles[type],
        className
      )}
    >
      {badgeLabels[type]}
    </span>
  );
}
