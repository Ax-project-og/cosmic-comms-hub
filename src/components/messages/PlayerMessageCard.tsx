import { PlayerMessage } from '@/types/messages';
import { MessageBadge } from './MessageBadge';
import { cn } from '@/lib/utils';
import { User, Users, Shield, Swords, HelpCircle } from 'lucide-react';

interface PlayerMessageCardProps {
  message: PlayerMessage;
  onClick?: () => void;
}

export function PlayerMessageCard({ message, onClick }: PlayerMessageCardProps) {
  const { 
    isRead,
    severity,
    title,
    senderName, 
    senderAlliance, 
    relation, 
    content,
    timestamp 
  } = message;

  const relationConfig = {
    ally: { icon: Shield, color: 'text-game-player', bg: 'bg-game-player/20', border: 'border-game-player/40', label: 'ALLIÉ' },
    neutral: { icon: Users, color: 'text-game-system', bg: 'bg-game-system/20', border: 'border-game-system/40', label: 'NEUTRE' },
    enemy: { icon: Swords, color: 'text-game-combat', bg: 'bg-game-combat/20', border: 'border-game-combat/40', label: 'ENNEMI' },
    unknown: { icon: HelpCircle, color: 'text-muted-foreground', bg: 'bg-muted', border: 'border-border', label: 'INCONNU' },
  };

  const config = relationConfig[relation];
  const RelationIcon = config.icon;

  return (
    <div
      onClick={onClick}
      className={cn(
        'relative rounded-lg border p-4 transition-all duration-200 cursor-pointer',
        'bg-panel border-panel-border',
        !isRead && 'glow-unread',
        'hover:bg-panel-hover'
      )}
    >
      {/* Gradient overlay based on relation */}
      <div className={cn(
        'absolute inset-0 rounded-lg pointer-events-none',
        relation === 'ally' && 'gradient-player',
        relation === 'enemy' && 'gradient-combat'
      )} />

      <div className="relative flex items-start gap-4">
        {/* Avatar */}
        <div className={cn(
          'flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center border',
          config.bg,
          config.border
        )}>
          <User className={cn('w-6 h-6', config.color)} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <MessageBadge type="player" />
            <MessageBadge type="private" />
            {!isRead && <span className="unread-dot" />}
          </div>

          <h3 className="text-foreground font-semibold text-lg mb-1 font-display">
            {title}
          </h3>
          
          {/* Sender info */}
          <div className="flex items-center gap-2 text-sm mb-3">
            <span className="text-slate-400">De:</span>
            <span className={cn('font-semibold', config.color)}>{senderName}</span>
            {senderAlliance && (
              <span className="text-slate-400">{senderAlliance}</span>
            )}
            <span className={cn(
              'inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide',
              config.bg,
              config.border,
              'border'
            )}>
              <RelationIcon className="w-3 h-3" />
              {config.label}
            </span>
          </div>

          {/* Message preview with fade */}
          <div className="relative">
            <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
              {content}
            </p>
            {content.length > 150 && (
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-panel to-transparent pointer-events-none" />
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="flex-shrink-0 text-right">
          <div className="text-xs text-slate-400">
            {timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            {timestamp.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
          </div>
        </div>
      </div>
    </div>
  );
}
