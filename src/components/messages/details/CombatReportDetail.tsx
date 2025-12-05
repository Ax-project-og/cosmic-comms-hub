import { CombatReportMessage } from '@/types/messages';
import { Trophy, Skull, Scale, Package, Sparkles, Clock, Hexagon, Gem, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CombatReportDetailProps {
  message: CombatReportMessage;
}

export function CombatReportDetail({ message }: CombatReportDetailProps) {
  const {
    outcome,
    enemyName,
    location,
    loot,
    losses,
    enemyLosses,
    debrisField,
    combatDuration,
  } = message;

  const outcomeConfig = {
    victory: { icon: Trophy, color: 'text-game-player', bg: 'bg-game-player/20', label: 'VICTOIRE' },
    defeat: { icon: Skull, color: 'text-game-combat', bg: 'bg-game-combat/20', label: 'DÉFAITE' },
    draw: { icon: Scale, color: 'text-game-commerce', bg: 'bg-game-commerce/20', label: 'MATCH NUL' },
  };

  const config = outcomeConfig[outcome];
  const OutcomeIcon = config.icon;

  return (
    <div className="space-y-6">
      {/* Outcome banner */}
      <div className={cn('rounded-lg p-6 text-center', config.bg)}>
        <OutcomeIcon className={cn('w-12 h-12 mx-auto mb-3', config.color)} />
        <div className={cn('text-2xl font-display font-bold', config.color)}>
          {config.label}
        </div>
        <div className="text-slate-300 mt-2">
          Combat contre <span className="text-foreground font-semibold">{enemyName}</span>
        </div>
        <div className="text-sm text-slate-400 mt-1">{location}</div>
      </div>

      {/* Combat stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-secondary/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-300">Durée du combat</span>
          </div>
          <div className="font-mono text-xl text-foreground">{combatDuration}</div>
        </div>
        <div className="bg-secondary/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-300">Champ de débris</span>
          </div>
          <div className="font-mono text-xl text-foreground">
            {(debrisField.metal + debrisField.crystal).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Loot */}
      {outcome === 'victory' && (
        <div className="bg-game-player/10 border border-game-player/40 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wide mb-3 flex items-center gap-2">
            <Package className="w-4 h-4 text-game-player" />
            Butin récupéré
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <Hexagon className="w-5 h-5 text-slate-400 mx-auto mb-1" />
              <div className="font-mono text-lg text-game-player">+{loot.metal.toLocaleString()}</div>
              <div className="text-xs text-slate-400">Métal</div>
            </div>
            <div className="text-center">
              <Gem className="w-5 h-5 text-purple-400 mx-auto mb-1" />
              <div className="font-mono text-lg text-game-player">+{loot.crystal.toLocaleString()}</div>
              <div className="text-xs text-slate-400">Cristal</div>
            </div>
            <div className="text-center">
              <Zap className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
              <div className="font-mono text-lg text-game-player">+{loot.energy.toLocaleString()}</div>
              <div className="text-xs text-slate-400">Énergie</div>
            </div>
          </div>
        </div>
      )}

      {/* Losses */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-secondary/30 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wide mb-3">Vos pertes</h4>
          {losses.length > 0 ? (
            <div className="space-y-2">
              {losses.map((loss, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-slate-300">{loss.name}</span>
                  <span className="font-mono text-game-combat">-{loss.count}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-game-player">Aucune perte</div>
          )}
        </div>
        <div className="bg-secondary/30 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wide mb-3">Pertes ennemies</h4>
          {enemyLosses.length > 0 ? (
            <div className="space-y-2">
              {enemyLosses.map((loss, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-slate-300">{loss.name}</span>
                  <span className="font-mono text-game-player">-{loss.count}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-slate-400">Aucune perte</div>
          )}
        </div>
      </div>
    </div>
  );
}
