import { cn } from '@/lib/utils';
import { MessageType } from '@/types/messages';
import { 
  Inbox, 
  Server, 
  Users, 
  Swords, 
  ArrowRightLeft, 
  Eye 
} from 'lucide-react';

export type TabFilter = 'all' | MessageType;

interface MessagesTabsProps {
  activeTab: TabFilter;
  onTabChange: (tab: TabFilter) => void;
  counts: Record<TabFilter, number>;
}

interface TabConfig {
  id: TabFilter;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  activeColor: string;
  bgColor: string;
}

const tabs: TabConfig[] = [
  { 
    id: 'all', 
    label: 'Tous', 
    icon: Inbox, 
    color: 'text-muted-foreground',
    activeColor: 'text-primary',
    bgColor: 'bg-primary/20 border-primary/40'
  },
  { 
    id: 'system', 
    label: 'Système', 
    icon: Server, 
    color: 'text-muted-foreground',
    activeColor: 'text-game-system',
    bgColor: 'bg-game-system/20 border-game-system/40'
  },
  { 
    id: 'player', 
    label: 'Joueurs', 
    icon: Users, 
    color: 'text-muted-foreground',
    activeColor: 'text-game-player',
    bgColor: 'bg-game-player/20 border-game-player/40'
  },
  { 
    id: 'combat', 
    label: 'Combat', 
    icon: Swords, 
    color: 'text-muted-foreground',
    activeColor: 'text-game-combat',
    bgColor: 'bg-game-combat/20 border-game-combat/40'
  },
  { 
    id: 'commerce', 
    label: 'Commerce', 
    icon: ArrowRightLeft, 
    color: 'text-muted-foreground',
    activeColor: 'text-game-commerce',
    bgColor: 'bg-game-commerce/20 border-game-commerce/40'
  },
  { 
    id: 'espionage', 
    label: 'Espionnage', 
    icon: Eye, 
    color: 'text-muted-foreground',
    activeColor: 'text-game-espionage',
    bgColor: 'bg-game-espionage/20 border-game-espionage/40'
  },
];

export function MessagesTabs({ activeTab, onTabChange, counts }: MessagesTabsProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 p-1.5 bg-panel rounded-xl border border-panel-border overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          const count = counts[tab.id];
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200',
                'whitespace-nowrap',
                isActive 
                  ? cn(tab.bgColor, 'border', tab.activeColor)
                  : 'hover:bg-secondary/50 text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className={cn('w-4 h-4', isActive ? tab.activeColor : tab.color)} />
              <span>{tab.label}</span>
              {count > 0 && (
                <span className={cn(
                  'px-2 py-0.5 rounded-full text-xs font-semibold font-mono',
                  isActive 
                    ? 'bg-background/30' 
                    : 'bg-secondary text-muted-foreground'
                )}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
