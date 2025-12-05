import { EspionageMessage } from '@/types/messages';
import { Eye, EyeOff, Target, Shield, Swords, Hexagon, Gem, Zap, AlertTriangle, ThumbsUp, ThumbsDown, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EspionageMessageDetailProps {
  message: EspionageMessage;
}

export function EspionageMessageDetail({ message }: EspionageMessageDetailProps) {
  const {
    subType,
    targetName,
    targetPlanet,
    targetCoords,
    detectionProbability,
    resources,
    fleetPower,
    defensePower,
    fleetDetails,
    defenseDetails,
    recommendation,
  } = message;

  const isDetected = subType === 'spy_detected';

  const recommendationConfig = {
    attack: { icon: ThumbsUp, color: 'text-game-player', bg: 'bg-game-player/20', label: 'Attaque recommandée' },
    avoid: { icon: ThumbsDown, color: 'text-game-combat', bg: 'bg-game-combat/20', label: 'Éviter' },
    spy_again: { icon: RefreshCw, color: 'text-game-commerce', bg: 'bg-game-commerce/20', label: 'Espionner à nouveau' },
  };

  return (
    <div className="space-y-6">
      {/* Target info */}
      <div className="bg-secondary/30 rounded-lg p-4">
        <div className="flex items-center gap-4">
          <div className={cn(
            'w-12 h-12 rounded-lg flex items-center justify-center border',
            isDetected
              ? 'bg-game-combat/20 border-game-combat/40'
              : 'bg-game-espionage/20 border-game-espionage/40'
          )}>
            {isDetected ? (
              <EyeOff className="w-6 h-6 text-game-combat" />
            ) : (
              <Eye className="w-6 h-6 text-game-espionage" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-game-espionage" />
              {targetName && <span className="font-semibold text-foreground">{targetName}</span>}
              <span className="text-slate-300">•</span>
              <span className="text-slate-300">{targetPlanet}</span>
              <span className="font-mono text-slate-400">{targetCoords}</span>
            </div>
            {detectionProbability !== undefined && !isDetected && (
              <div className={cn(
                'mt-2 inline-flex items-center gap-2 px-2 py-1 rounded text-xs font-semibold',
                detectionProbability < 30
                  ? 'bg-game-player/20 text-game-player'
                  : detectionProbability < 60
                  ? 'bg-game-commerce/20 text-game-commerce'
                  : 'bg-game-combat/20 text-game-combat'
              )}>
                Risque de détection: {detectionProbability}%
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detected warning */}
      {isDetected && (
        <div className="bg-game-combat/10 border border-game-combat/40 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-game-combat flex-shrink-0" />
          <div>
            <div className="font-semibold text-game-combat mb-1">Sonde détectée !</div>
            <p className="text-slate-300 text-sm">
              Une sonde d'espionnage ennemie a été détectée sur {targetPlanet}. 
              Votre position a été compromise. L'ennemi connaît désormais vos coordonnées.
            </p>
          </div>
        </div>
      )}

      {/* Resources */}
      {!isDetected && resources && (
        <div className="bg-secondary/30 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wide mb-3">Ressources disponibles</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center bg-panel rounded-lg p-3 border border-panel-border">
              <Hexagon className="w-5 h-5 text-slate-400 mx-auto mb-2" />
              <div className="font-mono text-lg text-foreground">{resources.metal.toLocaleString()}</div>
              <div className="text-xs text-slate-400">Métal</div>
            </div>
            <div className="text-center bg-panel rounded-lg p-3 border border-panel-border">
              <Gem className="w-5 h-5 text-purple-400 mx-auto mb-2" />
              <div className="font-mono text-lg text-foreground">{resources.crystal.toLocaleString()}</div>
              <div className="text-xs text-slate-400">Cristal</div>
            </div>
            <div className="text-center bg-panel rounded-lg p-3 border border-panel-border">
              <Zap className="w-5 h-5 text-yellow-400 mx-auto mb-2" />
              <div className="font-mono text-lg text-foreground">{resources.energy.toLocaleString()}</div>
              <div className="text-xs text-slate-400">Énergie</div>
            </div>
          </div>
        </div>
      )}

      {/* Military power */}
      {!isDetected && (fleetPower !== undefined || defensePower !== undefined) && (
        <div className="grid grid-cols-2 gap-4">
          {fleetPower !== undefined && (
            <div className="bg-secondary/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Swords className="w-4 h-4 text-game-combat" />
                <span className="text-sm text-slate-300">Puissance de flotte</span>
              </div>
              <div className="font-mono text-2xl font-bold text-foreground">{fleetPower.toLocaleString()}</div>
              {fleetDetails && fleetDetails.length > 0 && (
                <div className="mt-3 space-y-1">
                  {fleetDetails.map((unit, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-slate-400">{unit.name}</span>
                      <span className="font-mono text-slate-300">{unit.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {defensePower !== undefined && (
            <div className="bg-secondary/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-game-system" />
                <span className="text-sm text-slate-300">Puissance défensive</span>
              </div>
              <div className="font-mono text-2xl font-bold text-foreground">{defensePower.toLocaleString()}</div>
              {defenseDetails && defenseDetails.length > 0 && (
                <div className="mt-3 space-y-1">
                  {defenseDetails.map((unit, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-slate-400">{unit.name}</span>
                      <span className="font-mono text-slate-300">{unit.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Recommendation */}
      {!isDetected && recommendation && (
        <div className={cn(
          'rounded-lg p-4 flex items-center gap-3',
          recommendationConfig[recommendation].bg,
          'border',
          recommendation === 'attack' ? 'border-game-player/40' :
          recommendation === 'avoid' ? 'border-game-combat/40' : 'border-game-commerce/40'
        )}>
          {(() => {
            const Rec = recommendationConfig[recommendation];
            return (
              <>
                <Rec.icon className={cn('w-6 h-6', Rec.color)} />
                <span className={cn('font-semibold', Rec.color)}>{Rec.label}</span>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
