import { useState, useMemo } from 'react';
import { MessagesHeader } from '@/components/messages/MessagesHeader';
import { MessagesTabs, TabFilter } from '@/components/messages/MessagesTabs';
import { MessagesList } from '@/components/messages/MessagesList';
import { mockMessages } from '@/data/mockMessages';
import { Message } from '@/types/messages';

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState<TabFilter>('all');

  // Calculate counts for each tab
  const counts = useMemo(() => {
    const result: Record<TabFilter, number> = {
      all: mockMessages.filter(m => !m.isRead).length,
      system: mockMessages.filter(m => m.type === 'system' && !m.isRead).length,
      player: mockMessages.filter(m => m.type === 'player' && !m.isRead).length,
      combat: mockMessages.filter(m => m.type === 'combat' && !m.isRead).length,
      commerce: mockMessages.filter(m => m.type === 'commerce' && !m.isRead).length,
      espionage: mockMessages.filter(m => m.type === 'espionage' && !m.isRead).length,
    };
    return result;
  }, []);

  // Filter messages based on active tab
  const filteredMessages = useMemo(() => {
    if (activeTab === 'all') return mockMessages;
    return mockMessages.filter(m => m.type === activeTab);
  }, [activeTab]);

  // Calculate header stats
  const totalUnread = mockMessages.filter(m => !m.isRead).length;
  const criticalUnread = mockMessages.filter(m => !m.isRead && m.isCritical).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Top resource bar placeholder */}
      <div className="border-b border-panel-border bg-panel/50 backdrop-blur-sm">
        <div className="container max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-display text-primary font-semibold">ASTRA</span>
              <span>•</span>
              <span>Centre de Commandement</span>
            </div>
            <div className="flex items-center gap-6 text-sm font-mono">
              <span className="text-slate-400">⬡ 612 000</span>
              <span className="text-purple-400">◆ 1 043 920</span>
              <span className="text-yellow-400">⚡ 190 210</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="container max-w-6xl mx-auto px-4 py-6">
        <MessagesHeader totalUnread={totalUnread} criticalUnread={criticalUnread} />
        <MessagesTabs 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          counts={counts}
        />
        <MessagesList messages={filteredMessages} />
      </main>
    </div>
  );
}
