import { AttackMessage } from '@/types/messages';
import { MessageBadge } from './MessageBadge';
import { cn } from '@/lib/utils';
import { Swords, Clock, Target, Zap, Ship } from 'lucide-react';

interface AttackMessageCardProps {
  message: AttackMessage;
}

export function AttackMessageCard({ message }: AttackMessageCardProps) {
  const { 
    isRead, 
    isCritical, 
    attackerName, 
    attackerAlliance, 
    targetPlanet, 
    estimatedPower, 
    impactTime,
    fleetComposition,
    timestamp 
  } = message;

  return (
    <div
      className={cn(
        'relative rounded-lg border p-4 transition-all duration-200 cursor-pointer',
        'bg-panel border-panel-border',
        !isRead && 'glow-unread',
        isCritical && 'glow-critical border-game-combat/50',
        'hover:bg-panel-hover'
      )}
    >
      {/* Critical gradient overlay */}
      {isCritical && (
        <div className="absolute inset-0 rounded-lg gradient-combat pointer-events-none" />
      )}
      
      <div className="relative flex items-start gap-4">
        {/* Icon */}
        <div className={cn(
          'flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center',
          'bg-game-combat/20 border border-game-combat/40'
        )}>
          <Swords className="w-6 h-6 text-game-combat" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <MessageBadge type="combat" />
            {isCritical && <MessageBadge type="alert" />}
            {!isRead && <span className="unread-dot" />}
          </div>

          <h3 className="text-foreground font-semibold text-lg mb-2 font-display">
            Attaque hostile en approche
          </h3>

          {/* Attack details grid */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex items-center gap-2 text-sm">
              <Target className="w-4 h-4 text-game-combat" />
              <span className="text-muted-foreground">Cible:</span>
              <span className="text-foreground font-medium">{targetPlanet}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-game-commerce" />
              <span className="text-muted-foreground">Puissance:</span>
              <span className="text-game-combat font-mono font-semibold">{estimatedPower.toLocaleString()}</span>
            </div>
          </div>

          {/* Attacker info */}
          <div className="flex items-center gap-2 text-sm mb-3">
            <span className="text-muted-foreground">Attaquant:</span>
            <span className="text-game-combat font-semibold">{attackerName}</span>
            {attackerAlliance && (
              <span className="text-muted-foreground">{attackerAlliance}</span>
            )}
          </div>

          {/* Fleet composition preview */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <Ship className="w-3 h-3" />
            {fleetComposition.slice(0, 3).map((unit, i) => (
              <span key={i} className="bg-secondary/50 px-2 py-0.5 rounded">
                {unit.count}× {unit.name}
              </span>
            ))}
          </div>
        </div>

        {/* Right side - Time info */}
        <div className="flex-shrink-0 text-right">
          <div className="text-xs text-muted-foreground mb-1">
            {timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className={cn(
            'flex items-center gap-1 px-3 py-1.5 rounded-lg',
            'bg-game-combat/20 border border-game-combat/40'
          )}>
            <Clock className="w-4 h-4 text-game-combat" />
            <span className="font-mono text-game-combat font-bold text-lg">{impactTime}</span>
          </div>
          <div className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wide">
            Impact
          </div>
        </div>
      </div>
    </div>
  );
}
