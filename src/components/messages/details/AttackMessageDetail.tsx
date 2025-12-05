import { AttackMessage } from '@/types/messages';
import { Target, Zap, Clock, Ship, MapPin, User } from 'lucide-react';

interface AttackMessageDetailProps {
  message: AttackMessage;
}

export function AttackMessageDetail({ message }: AttackMessageDetailProps) {
  const {
    attackerName,
    attackerAlliance,
    originPlanet,
    targetPlanet,
    estimatedPower,
    impactTime,
    fleetComposition,
  } = message;

  return (
    <div className="space-y-6">
      {/* Alert banner */}
      <div className="bg-game-combat/10 border border-game-combat/40 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-game-combat/20 flex items-center justify-center">
            <Clock className="w-6 h-6 text-game-combat" />
          </div>
          <div>
            <div className="text-sm text-slate-300 mb-1">Temps avant impact</div>
            <div className="text-3xl font-mono font-bold text-game-combat">{impactTime}</div>
          </div>
        </div>
      </div>

      {/* Attacker info */}
      <div className="bg-secondary/30 rounded-lg p-4 space-y-3">
        <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">Attaquant</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-game-combat" />
            <span className="text-slate-300">Joueur:</span>
            <span className="text-foreground font-semibold">{attackerName}</span>
          </div>
          {attackerAlliance && (
            <div className="flex items-center gap-2">
              <span className="text-slate-300">Alliance:</span>
              <span className="text-foreground">{attackerAlliance}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span className="text-slate-300">Origine:</span>
            <span className="text-foreground">{originPlanet}</span>
          </div>
        </div>
      </div>

      {/* Target info */}
      <div className="bg-secondary/30 rounded-lg p-4 space-y-3">
        <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">Cible</h4>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-game-alert" />
            <span className="text-slate-300">Planète:</span>
            <span className="text-foreground font-semibold">{targetPlanet}</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-game-commerce" />
            <span className="text-slate-300">Puissance estimée:</span>
            <span className="text-game-combat font-mono font-bold">{estimatedPower.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Fleet composition */}
      <div className="bg-secondary/30 rounded-lg p-4 space-y-3">
        <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wide flex items-center gap-2">
          <Ship className="w-4 h-4" />
          Composition de la flotte
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {fleetComposition.map((unit, i) => (
            <div key={i} className="bg-panel rounded-lg px-3 py-2 border border-panel-border">
              <div className="text-lg font-mono font-bold text-foreground">{unit.count}</div>
              <div className="text-xs text-slate-300">{unit.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
