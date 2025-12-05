import { Mail, Bell, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessagesHeaderProps {
  totalUnread: number;
  criticalUnread: number;
}

export function MessagesHeader({ totalUnread, criticalUnread }: MessagesHeaderProps) {
  return (
    <header className="mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-display text-foreground tracking-wide">
                Messages
              </h1>
              <p className="text-sm text-slate-400">
                Centre de communication
              </p>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-3">
          {criticalUnread > 0 && (
            <div className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-lg',
              'bg-game-combat/20 border border-game-combat/40',
              'badge-critical-glow'
            )}>
              <AlertTriangle className="w-4 h-4 text-game-combat" />
              <span className="font-display font-semibold text-game-combat">
                {criticalUnread} Critique{criticalUnread > 1 ? 's' : ''}
              </span>
            </div>
          )}
          
          {totalUnread > 0 && (
            <div className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-lg',
              'bg-primary/20 border border-primary/40',
              'badge-unread-glow'
            )}>
              <Bell className="w-4 h-4 text-primary" />
              <span className="font-display font-semibold text-primary">
                {totalUnread} Non lu{totalUnread > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
