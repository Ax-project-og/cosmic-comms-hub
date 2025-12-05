import { SystemMessage } from '@/types/messages';
import { Server, AlertTriangle, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SystemMessageDetailProps {
  message: SystemMessage;
}

export function SystemMessageDetail({ message }: SystemMessageDetailProps) {
  const {
    subType,
    content,
    details,
    actionRequired,
  } = message;

  const isWarning = subType === 'storage_warning';
  const Icon = isWarning ? AlertTriangle : subType === 'production_report' ? BarChart3 : Server;

  return (
    <div className="space-y-6">
      {/* System icon */}
      <div className={cn(
        'flex items-center gap-4 p-4 rounded-lg',
        isWarning ? 'bg-game-commerce/10 border border-game-commerce/40' : 'bg-game-system/10 border border-game-system/40'
      )}>
        <div className={cn(
          'w-12 h-12 rounded-lg flex items-center justify-center',
          isWarning ? 'bg-game-commerce/20' : 'bg-game-system/20'
        )}>
          <Icon className={cn('w-6 h-6', isWarning ? 'text-game-commerce' : 'text-game-system')} />
        </div>
        <div>
          <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">Message système</div>
          <div className={cn(
            'font-semibold',
            isWarning ? 'text-game-commerce' : 'text-game-system'
          )}>
            {isWarning ? 'Avertissement' : 'Rapport de production'}
          </div>
        </div>
        {actionRequired && (
          <div className="ml-auto px-3 py-1.5 bg-game-commerce/20 border border-game-commerce/40 rounded text-xs font-semibold text-game-commerce uppercase">
            Action requise
          </div>
        )}
      </div>

      {/* Content */}
      <div className="bg-panel border border-panel-border rounded-lg p-6">
        <p className="text-slate-200 leading-relaxed">
          {content}
        </p>
      </div>

      {/* Details grid */}
      {details && details.length > 0 && (
        <div className="bg-secondary/30 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wide mb-4">Détails</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {details.map((detail, index) => (
              <div key={index} className="bg-panel rounded-lg px-4 py-3 border border-panel-border">
                <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">
                  {detail.label}
                </div>
                <div className={cn(
                  'font-mono font-semibold text-lg',
                  detail.value.startsWith('+') ? 'text-game-player' :
                  detail.value.includes('%') ? 'text-game-system' : 'text-foreground'
                )}>
                  {detail.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
