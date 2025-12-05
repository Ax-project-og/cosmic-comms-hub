import { CommerceMessage } from '@/types/messages';
import { MessageBadge } from './MessageBadge';
import { cn } from '@/lib/utils';
import { ArrowRightLeft, Check, X, Clock, Truck, Gem, Zap, Hexagon } from 'lucide-react';

interface CommerceMessageCardProps {
  message: CommerceMessage;
  onClick?: () => void;
}

export function CommerceMessageCard({ message, onClick }: CommerceMessageCardProps) {
  const { 
    isRead,
    severity,
    title,
    traderName, 
    status, 
    offer,
    request,
    fleetETA,
    timestamp 
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
    <div
      onClick={onClick}
      className={cn(
        'relative rounded-lg border p-4 transition-all duration-200 cursor-pointer',
        'bg-panel border-panel-border',
        !isRead && 'glow-unread',
        status === 'pending' && 'border-game-commerce/50',
        'hover:bg-panel-hover'
      )}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 rounded-lg gradient-commerce pointer-events-none" />

      <div className="relative flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-game-commerce/20 border border-game-commerce/40">
          <ArrowRightLeft className="w-6 h-6 text-game-commerce" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <MessageBadge type="commerce" />
            {status === 'pending' && <MessageBadge type="offer" />}
            {!isRead && <span className="unread-dot" />}
          </div>

          <h3 className="text-foreground font-semibold text-lg mb-1 font-display">
            {title}
          </h3>
          
          <p className="text-sm text-slate-300 mb-3">
            Marchand: <span className="text-game-commerce font-medium">{traderName}</span>
          </p>

          {/* Trade visualization */}
          <div className="flex items-center gap-4 mb-2">
            {/* You receive */}
            <div className="flex-1 bg-secondary/30 rounded-lg p-3">
              <div className="text-[10px] text-slate-400 uppercase tracking-wide mb-2">
                Vous recevez
              </div>
              <div className="flex flex-wrap gap-2">
                {offer.metal && (
                  <span className="flex items-center gap-1 text-sm">
                    <Hexagon className="w-3 h-3 text-slate-400" />
                    <span className="font-mono text-game-player">+{formatResource(offer.metal)}</span>
                  </span>
                )}
                {offer.crystal && (
                  <span className="flex items-center gap-1 text-sm">
                    <Gem className="w-3 h-3 text-purple-400" />
                    <span className="font-mono text-game-player">+{formatResource(offer.crystal)}</span>
                  </span>
                )}
                {offer.energy && (
                  <span className="flex items-center gap-1 text-sm">
                    <Zap className="w-3 h-3 text-yellow-400" />
                    <span className="font-mono text-game-player">+{formatResource(offer.energy)}</span>
                  </span>
                )}
              </div>
            </div>

            <ArrowRightLeft className="w-5 h-5 text-slate-500 flex-shrink-0" />

            {/* You give */}
            <div className="flex-1 bg-secondary/30 rounded-lg p-3">
              <div className="text-[10px] text-slate-400 uppercase tracking-wide mb-2">
                Vous donnez
              </div>
              <div className="flex flex-wrap gap-2">
                {request.metal && (
                  <span className="flex items-center gap-1 text-sm">
                    <Hexagon className="w-3 h-3 text-slate-400" />
                    <span className="font-mono text-game-combat">-{formatResource(request.metal)}</span>
                  </span>
                )}
                {request.crystal && (
                  <span className="flex items-center gap-1 text-sm">
                    <Gem className="w-3 h-3 text-purple-400" />
                    <span className="font-mono text-game-combat">-{formatResource(request.crystal)}</span>
                  </span>
                )}
                {request.energy && (
                  <span className="flex items-center gap-1 text-sm">
                    <Zap className="w-3 h-3 text-yellow-400" />
                    <span className="font-mono text-game-combat">-{formatResource(request.energy)}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Fleet ETA */}
          {fleetETA && status === 'pending' && (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Truck className="w-3 h-3" />
              <span>Flotte commerciale en route — ETA:</span>
              <span className="font-mono text-game-commerce">{fleetETA}</span>
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="flex-shrink-0 text-right">
          <div className="text-xs text-slate-400 mb-2">
            {timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className={cn(
            'flex items-center gap-1 px-2 py-1 rounded text-[10px] font-semibold uppercase tracking-wide',
            status === 'completed' || status === 'accepted' 
              ? 'bg-game-player/20 text-game-player border border-game-player/40'
              : status === 'pending'
              ? 'bg-game-commerce/20 text-game-commerce border border-game-commerce/40'
              : 'bg-game-combat/20 text-game-combat border border-game-combat/40'
          )}>
            <StatusIcon className="w-3 h-3" />
            {config.label}
          </div>
        </div>
      </div>
    </div>
  );
}
