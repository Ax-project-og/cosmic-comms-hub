import { PlayerMessage } from '@/types/messages';
import { User, Shield, Swords, Users, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlayerMessageDetailProps {
  message: PlayerMessage;
}

export function PlayerMessageDetail({ message }: PlayerMessageDetailProps) {
  const {
    senderName,
    senderAlliance,
    relation,
    content,
  } = message;

  const relationConfig = {
    ally: { icon: Shield, color: 'text-game-player', bg: 'bg-game-player/20', label: 'ALLIÉ' },
    neutral: { icon: Users, color: 'text-game-system', bg: 'bg-game-system/20', label: 'NEUTRE' },
    enemy: { icon: Swords, color: 'text-game-combat', bg: 'bg-game-combat/20', label: 'ENNEMI' },
    unknown: { icon: HelpCircle, color: 'text-muted-foreground', bg: 'bg-muted', label: 'INCONNU' },
  };

  const config = relationConfig[relation];
  const RelationIcon = config.icon;

  return (
    <div className="space-y-6">
      {/* Sender card */}
      <div className="bg-secondary/30 rounded-lg p-4">
        <div className="flex items-center gap-4">
          <div className={cn(
            'w-14 h-14 rounded-lg flex items-center justify-center border',
            config.bg,
            relation === 'ally' ? 'border-game-player/40' :
            relation === 'enemy' ? 'border-game-combat/40' :
            relation === 'neutral' ? 'border-game-system/40' : 'border-border'
          )}>
            <User className={cn('w-7 h-7', config.color)} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={cn('font-semibold text-lg', config.color)}>{senderName}</span>
              {senderAlliance && (
                <span className="text-slate-400">{senderAlliance}</span>
              )}
            </div>
            <div className={cn(
              'inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-semibold uppercase tracking-wide border',
              config.bg,
              relation === 'ally' ? 'border-game-player/40' :
              relation === 'enemy' ? 'border-game-combat/40' :
              relation === 'neutral' ? 'border-game-system/40' : 'border-border',
              config.color
            )}>
              <RelationIcon className="w-3 h-3" />
              {config.label}
            </div>
          </div>
        </div>
      </div>

      {/* Message content */}
      <div className="bg-panel border border-panel-border rounded-lg p-6">
        <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      </div>
    </div>
  );
}
