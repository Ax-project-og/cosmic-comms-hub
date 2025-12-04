import { EspionageMessage } from '@/types/messages';
import { MessageBadge } from './MessageBadge';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, Target, Shield, Swords, Gem, Hexagon, Zap, AlertTriangle, ThumbsUp, ThumbsDown, RefreshCw } from 'lucide-react';

interface EspionageMessageCardProps {
  message: EspionageMessage;
}

export function EspionageMessageCard({ message }: EspionageMessageCardProps) {
  const { 
    isRead, 
    isCritical,
    subType,
    title,
    targetName,
    targetPlanet,
    targetCoords,
    detectionProbability,
    resources,
    fleetPower,
    defensePower,
    recommendation,
    timestamp 
  } = message;

  const isDetected = subType === 'spy_detected';
  const Icon = isDetected ? EyeOff : Eye;

  const recommendationConfig = {
    attack: { icon: ThumbsUp, color: 'text-game-player', label: 'Attaque recommandée' },
    avoid: { icon: ThumbsDown, color: 'text-game-combat', label: 'Éviter' },
    spy_again: { icon: RefreshCw, color: 'text-game-commerce', label: 'Espionner à nouveau' },
  };

  return (
    <div
      className={cn(
        'relative rounded-lg border p-4 transition-all duration-200 cursor-pointer',
        'bg-panel border-panel-border',
        !isRead && 'glow-unread',
        isCritical && 'glow-critical border-game-espionage/50',
        'hover:bg-panel-hover'
      )}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 rounded-lg gradient-espionage pointer-events-none" />

      <div className="relative flex items-start gap-4">
        {/* Icon */}
        <div className={cn(
          'flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center border',
          isDetected 
            ? 'bg-game-combat/20 border-game-combat/40' 
            : 'bg-game-espionage/20 border-game-espionage/40'
        )}>
          <Icon className={cn('w-6 h-6', isDetected ? 'text-game-combat' : 'text-game-espionage')} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <MessageBadge type="espionage" />
            {isDetected && <MessageBadge type="alert" />}
            {!isRead && <span className="unread-dot" />}
          </div>

          <h3 className="text-foreground font-semibold text-lg mb-1 font-display">
            {title}
          </h3>
          
          {/* Target info */}
          <div className="flex items-center gap-3 text-sm mb-3">
            <div className="flex items-center gap-1">
              <Target className="w-4 h-4 text-game-espionage" />
              <span className="text-muted-foreground">Cible:</span>
              {targetName && <span className="text-foreground font-medium">{targetName}</span>}
              <span className="text-muted-foreground">•</span>
              <span className="text-foreground">{targetPlanet}</span>
              <span className="font-mono text-muted-foreground">{targetCoords}</span>
            </div>
          </div>

          {/* Spy report details */}
          {!isDetected && resources && (
            <>
              {/* Resources */}
              <div className="flex flex-wrap items-center gap-4 mb-3 p-3 bg-secondary/30 rounded-lg">
                <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Ressources:</div>
                <div className="flex items-center gap-1">
                  <Hexagon className="w-3 h-3 text-slate-400" />
                  <span className="font-mono text-sm text-foreground">{resources.metal.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Gem className="w-3 h-3 text-purple-400" />
                  <span className="font-mono text-sm text-foreground">{resources.crystal.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  <span className="font-mono text-sm text-foreground">{resources.energy.toLocaleString()}</span>
                </div>
              </div>

              {/* Power stats */}
              <div className="flex items-center gap-6 text-sm mb-3">
                {fleetPower !== undefined && (
                  <div className="flex items-center gap-2">
                    <Swords className="w-4 h-4 text-game-combat" />
                    <span className="text-muted-foreground">Flotte:</span>
                    <span className="font-mono font-semibold text-foreground">{fleetPower.toLocaleString()}</span>
                  </div>
                )}
                {defensePower !== undefined && (
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-game-system" />
                    <span className="text-muted-foreground">Défense:</span>
                    <span className="font-mono font-semibold text-foreground">{defensePower.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Recommendation */}
              {recommendation && (
                <div className={cn(
                  'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm',
                  recommendation === 'attack' && 'bg-game-player/20 border border-game-player/40',
                  recommendation === 'avoid' && 'bg-game-combat/20 border border-game-combat/40',
                  recommendation === 'spy_again' && 'bg-game-commerce/20 border border-game-commerce/40'
                )}>
                  {(() => {
                    const Rec = recommendationConfig[recommendation];
                    return (
                      <>
                        <Rec.icon className={cn('w-4 h-4', Rec.color)} />
                        <span className={Rec.color}>{Rec.label}</span>
                      </>
                    );
                  })()}
                </div>
              )}
            </>
          )}

          {/* Detected warning */}
          {isDetected && (
            <div className="flex items-center gap-2 p-3 bg-game-combat/10 border border-game-combat/30 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-game-combat" />
              <span className="text-sm text-game-combat">
                Une sonde d'espionnage ennemie a été détectée sur {targetPlanet}. 
                Votre position a été compromise.
              </span>
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="flex-shrink-0 text-right">
          <div className="text-xs text-muted-foreground mb-2">
            {timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
          </div>
          
          {detectionProbability !== undefined && !isDetected && (
            <div className={cn(
              'px-2 py-1 rounded text-[10px] font-semibold uppercase tracking-wide',
              detectionProbability < 30 
                ? 'bg-game-player/20 text-game-player border border-game-player/40'
                : detectionProbability < 60
                ? 'bg-game-commerce/20 text-game-commerce border border-game-commerce/40'
                : 'bg-game-combat/20 text-game-combat border border-game-combat/40'
            )}>
              Détection: {detectionProbability}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
