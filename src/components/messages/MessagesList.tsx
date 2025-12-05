import { useState } from 'react';
import { Message } from '@/types/messages';
import { MessageCard } from './MessageCard';
import { MessageDetailDrawer } from './MessageDetailDrawer';
import { MessageDetailSheet } from './MessageDetailSheet';
import { Inbox } from 'lucide-react';

export type DrawerMode = 'bottom' | 'right';

interface MessagesListProps {
  messages: Message[];
  drawerMode?: DrawerMode;
}

export function MessagesList({ messages, drawerMode = 'bottom' }: MessagesListProps) {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
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

  const sortedMessages = [...messages].sort((a, b) => {
    if (a.isCritical && !a.isRead && (!b.isCritical || b.isRead)) return -1;
    if (b.isCritical && !b.isRead && (!a.isCritical || a.isRead)) return 1;
    if (!a.isRead && b.isRead) return -1;
    if (a.isRead && !b.isRead) return 1;
    return b.timestamp.getTime() - a.timestamp.getTime();
  });

  return (
    <>
      <div className="space-y-3">
        {sortedMessages.map((message, index) => (
          <div
            key={message.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <MessageCard 
              message={message} 
              onClick={() => handleMessageClick(message)}
            />
          </div>
        ))}
      </div>

      {drawerMode === 'bottom' ? (
        <MessageDetailDrawer
          message={selectedMessage}
          open={drawerOpen}
          onClose={handleCloseDrawer}
        />
      ) : (
        <MessageDetailSheet
          message={selectedMessage}
          open={drawerOpen}
          onClose={handleCloseDrawer}
        />
      )}
    </>
  );
}