import { CombatReportMessage } from '@/types/messages';
import { MessageBadge } from './MessageBadge';
import { SeverityBadge } from './SeverityBadge';
import { cn } from '@/lib/utils';
import { Trophy, Skull, Scale, Clock, Package, Sparkles } from 'lucide-react';

interface CombatReportCardProps {
  message: CombatReportMessage;
  onClick?: () => void;
}

export function CombatReportCard({ message, onClick }: CombatReportCardProps) {
  const { 
    isRead,
    severity,
    outcome, 
    enemyName, 
    location, 
    loot, 
    losses, 
    debrisField,
    combatDuration,
    timestamp 
  } = message;

  const outcomeConfig = {
    victory: { icon: Trophy, color: 'text-game-player', bg: 'bg-game-player/20', label: 'VICTOIRE' },
    defeat: { icon: Skull, color: 'text-game-combat', bg: 'bg-game-combat/20', label: 'DÉFAITE' },
    draw: { icon: Scale, color: 'text-game-commerce', bg: 'bg-game-commerce/20', label: 'MATCH NUL' },
  };

  const config = outcomeConfig[outcome];
  const OutcomeIcon = config.icon;

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
      <div className="relative flex items-start gap-4">
        {/* Icon */}
        <div className={cn(
          'flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center border',
          config.bg,
          outcome === 'victory' ? 'border-game-player/40' : outcome === 'defeat' ? 'border-game-combat/40' : 'border-game-commerce/40'
        )}>
          <OutcomeIcon className={cn('w-6 h-6', config.color)} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <SeverityBadge severity={severity} />
            <MessageBadge type="combat" />
            <MessageBadge type="report" />
            {!isRead && <span className="unread-dot" />}
          </div>

          <h3 className="text-foreground font-semibold text-lg mb-1 font-display">
            Rapport de combat
          </h3>
          
          <p className="text-sm text-slate-300 mb-3">
            Combat contre <span className="text-slate-100 font-medium">{enemyName}</span> • {location}
          </p>

          {/* Outcome banner */}
          <div className={cn(
            'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-3',
            config.bg,
            outcome === 'victory' ? 'border border-game-player/40' : outcome === 'defeat' ? 'border border-game-combat/40' : 'border border-game-commerce/40'
          )}>
            <OutcomeIcon className={cn('w-4 h-4', config.color)} />
            <span className={cn('font-display font-bold tracking-wide', config.color)}>
              {config.label}
            </span>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {outcome === 'victory' && (
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-game-commerce" />
                <span className="text-slate-400">Butin:</span>
                <span className="text-game-commerce font-mono font-semibold">
                  {(loot.metal + loot.crystal + loot.energy).toLocaleString()} res.
                </span>
              </div>
            )}
            
            {losses.length > 0 && (
              <div className="flex items-center gap-2">
                <Skull className="w-4 h-4 text-game-combat" />
                <span className="text-slate-400">Pertes:</span>
                <span className="text-game-combat font-mono">
                  {losses.reduce((acc, l) => acc + l.count, 0)} unités
                </span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400">Débris:</span>
              <span className="font-mono text-slate-200">
                {(debrisField.metal + debrisField.crystal).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex-shrink-0 text-right">
          <div className="text-xs text-slate-400 mb-1">
            {timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Clock className="w-3 h-3" />
            <span className="font-mono">{combatDuration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
