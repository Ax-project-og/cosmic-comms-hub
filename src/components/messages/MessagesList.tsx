import { useState } from 'react';
import { Message } from '@/types/messages';
import { MessageCard } from './MessageCard';
import { MessageDetailDrawer } from './MessageDetailDrawer';
import { cn } from '@/lib/utils';
import { Inbox } from 'lucide-react';

interface MessagesListProps {
  messages: Message[];
}

export function MessagesList({ messages }: MessagesListProps) {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedMessage(null);
  };

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center mb-4">
          <Inbox className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2 font-display">
          Aucun message
        </h3>
        <p className="text-sm text-slate-400 max-w-md">
          Vous n'avez aucun message dans cette catégorie pour le moment.
        </p>
      </div>
    );
  }

  // Sort messages: unread and critical first, then by timestamp
  const sortedMessages = [...messages].sort((a, b) => {
    // Critical unread first
    if (a.isCritical && !a.isRead && (!b.isCritical || b.isRead)) return -1;
    if (b.isCritical && !b.isRead && (!a.isCritical || a.isRead)) return 1;
    
    // Then unread
    if (!a.isRead && b.isRead) return -1;
    if (a.isRead && !b.isRead) return 1;
    
    // Then by timestamp (newest first)
    return b.timestamp.getTime() - a.timestamp.getTime();
  });

  return (
    <>
      <div className="space-y-3">
        {sortedMessages.map((message, index) => (
          <div
            key={message.id}
            className={cn(
              'animate-fade-in',
              `animation-delay-${index * 50}`
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <MessageCard 
              message={message} 
              onClick={() => handleMessageClick(message)}
            />
          </div>
        ))}
      </div>

      <MessageDetailDrawer
        message={selectedMessage}
        open={drawerOpen}
        onClose={handleCloseDrawer}
      />
    </>
  );
}
