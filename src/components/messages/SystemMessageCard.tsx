import { SystemMessage } from '@/types/messages';
import { MessageBadge } from './MessageBadge';
import { cn } from '@/lib/utils';
import { Server, AlertTriangle, BarChart3, Database } from 'lucide-react';

interface SystemMessageCardProps {
  message: SystemMessage;
}

export function SystemMessageCard({ message }: SystemMessageCardProps) {
  const { 
    isRead, 
    title,
    subType,
    content,
    details,
    actionRequired,
    timestamp 
  } = message;

  const isWarning = subType === 'storage_warning';
  const Icon = isWarning ? AlertTriangle : subType === 'production_report' ? BarChart3 : Server;

  return (
    <div
      className={cn(
        'relative rounded-lg border p-4 transition-all duration-200 cursor-pointer',
        'bg-panel border-panel-border',
        !isRead && 'glow-unread',
        isWarning && actionRequired && 'border-game-commerce/50',
        'hover:bg-panel-hover'
      )}
    >
      {/* Gradient overlay */}
      <div className={cn(
        'absolute inset-0 rounded-lg pointer-events-none',
        isWarning ? 'gradient-commerce' : 'gradient-system'
      )} />

      <div className="relative flex items-start gap-4">
        {/* Icon */}
        <div className={cn(
          'flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center border',
          isWarning ? 'bg-game-commerce/20 border-game-commerce/40' : 'bg-game-system/20 border-game-system/40'
        )}>
          <Icon className={cn('w-6 h-6', isWarning ? 'text-game-commerce' : 'text-game-system')} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <MessageBadge type="system" />
            {actionRequired && <MessageBadge type="alert" />}
            {!isRead && <span className="unread-dot" />}
          </div>

          <h3 className="text-foreground font-semibold text-lg mb-1 font-display">
            {title}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-3">
            {content}
          </p>

          {/* Details grid */}
          {details && details.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {details.map((detail, index) => (
                <div key={index} className="bg-secondary/30 rounded-lg px-3 py-2">
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">
                    {detail.label}
                  </div>
                  <div className={cn(
                    'font-mono font-semibold text-sm',
                    detail.value.startsWith('+') ? 'text-game-player' : 
                    detail.value.includes('%') ? 'text-game-system' : 'text-foreground'
                  )}>
                    {detail.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="flex-shrink-0 text-right">
          <div className="text-xs text-muted-foreground">
            {timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
          </div>
          {actionRequired && (
            <div className={cn(
              'mt-2 px-2 py-1 rounded text-[10px] font-semibold uppercase tracking-wide',
              'bg-game-commerce/20 text-game-commerce border border-game-commerce/40'
            )}>
              Action requise
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
