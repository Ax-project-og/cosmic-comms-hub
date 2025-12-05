import { CommerceMessage } from '@/types/messages';
import { ArrowRightLeft, Check, X, Clock, Truck, Hexagon, Gem, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommerceMessageDetailProps {
  message: CommerceMessage;
}

export function CommerceMessageDetail({ message }: CommerceMessageDetailProps) {
  const {
    traderName,
    status,
    offer,
    request,
    fleetETA,
  } = message;

  const statusConfig = {
    pending: { icon: Clock, color: 'text-game-commerce', label: 'EN ATTENTE' },
    accepted: { icon: Check, color: 'text-game-player', label: 'ACCEPTÉE' },
    declined: { icon: X, color: 'text-game-combat', label: 'REFUSÉE' },
    completed: { icon: Check, color: 'text-game-player', label: 'TERMINÉE' },
    failed: { icon: X, color: 'text-game-combat', label: 'ÉCHOUÉE' },
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  const formatResource = (value: number | undefined) => {
    if (!value) return null;
    return value.toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Trader info */}
      <div className="bg-secondary/30 rounded-lg p-4 flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">Marchand</div>
          <div className="text-lg font-semibold text-game-commerce">{traderName}</div>
        </div>
        <div className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded text-sm font-semibold uppercase',
          status === 'completed' || status === 'accepted'
            ? 'bg-game-player/20 text-game-player border border-game-player/40'
            : status === 'pending'
            ? 'bg-game-commerce/20 text-game-commerce border border-game-commerce/40'
            : 'bg-game-combat/20 text-game-combat border border-game-combat/40'
        )}>
          <StatusIcon className="w-4 h-4" />
          {config.label}
        </div>
      </div>

      {/* Trade visualization */}
      <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
        {/* You receive */}
        <div className="bg-game-player/10 border border-game-player/40 rounded-lg p-4">
          <div className="text-xs text-slate-300 uppercase tracking-wide mb-3">Vous recevez</div>
          <div className="space-y-3">
            {offer.metal && (
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Hexagon className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">Métal</span>
                </span>
                <span className="font-mono text-lg text-game-player">+{formatResource(offer.metal)}</span>
              </div>
            )}
            {offer.crystal && (
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Gem className="w-4 h-4 text-purple-400" />
                  <span className="text-slate-300">Cristal</span>
                </span>
                <span className="font-mono text-lg text-game-player">+{formatResource(offer.crystal)}</span>
              </div>
            )}
            {offer.energy && (
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-slate-300">Énergie</span>
                </span>
                <span className="font-mono text-lg text-game-player">+{formatResource(offer.energy)}</span>
              </div>
            )}
          </div>
        </div>

        <ArrowRightLeft className="w-6 h-6 text-muted-foreground" />

        {/* You give */}
        <div className="bg-game-combat/10 border border-game-combat/40 rounded-lg p-4">
          <div className="text-xs text-slate-300 uppercase tracking-wide mb-3">Vous donnez</div>
          <div className="space-y-3">
            {request.metal && (
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Hexagon className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">Métal</span>
                </span>
                <span className="font-mono text-lg text-game-combat">-{formatResource(request.metal)}</span>
              </div>
            )}
            {request.crystal && (
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Gem className="w-4 h-4 text-purple-400" />
                  <span className="text-slate-300">Cristal</span>
                </span>
                <span className="font-mono text-lg text-game-combat">-{formatResource(request.crystal)}</span>
              </div>
            )}
            {request.energy && (
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-slate-300">Énergie</span>
                </span>
                <span className="font-mono text-lg text-game-combat">-{formatResource(request.energy)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fleet ETA */}
      {fleetETA && status === 'pending' && (
        <div className="bg-secondary/30 rounded-lg p-4 flex items-center gap-3">
          <Truck className="w-5 h-5 text-game-commerce" />
          <span className="text-slate-300">Flotte commerciale en route</span>
          <span className="ml-auto font-mono text-lg text-game-commerce">{fleetETA}</span>
        </div>
      )}
    </div>
  );
}
