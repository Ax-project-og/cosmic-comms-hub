import { Message } from '@/types/messages';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { MessageBadge } from './MessageBadge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AttackMessageDetail } from './details/AttackMessageDetail';
import { CombatReportDetail } from './details/CombatReportDetail';
import { PlayerMessageDetail } from './details/PlayerMessageDetail';
import { SystemMessageDetail } from './details/SystemMessageDetail';
import { CommerceMessageDetail } from './details/CommerceMessageDetail';
import { EspionageMessageDetail } from './details/EspionageMessageDetail';

interface MessageDetailDrawerProps {
  message: Message | null;
  open: boolean;
  onClose: () => void;
}

export function MessageDetailDrawer({ message, open, onClose }: MessageDetailDrawerProps) {
  if (!message) return null;

  const renderContent = () => {
    switch (message.type) {
      case 'combat':
        if (message.subType === 'attack_incoming') {
          return <AttackMessageDetail message={message} />;
        }
        return <CombatReportDetail message={message} />;
      case 'player':
        return <PlayerMessageDetail message={message} />;
      case 'system':
        return <SystemMessageDetail message={message} />;
      case 'commerce':
        return <CommerceMessageDetail message={message} />;
      case 'espionage':
        return <EspionageMessageDetail message={message} />;
      default:
        return null;
    }
  };

  const renderActions = () => {
    switch (message.type) {
      case 'combat':
        if (message.subType === 'attack_incoming') {
          return (
            <div className="flex flex-col gap-2 w-full">
              <Button variant="default" className="w-full bg-game-combat hover:bg-game-combat/80">
                Envoyer flotte
              </Button>
              <Button variant="outline" className="w-full">
                Simuler défense
              </Button>
            </div>
          );
        }
        return (
          <Button variant="outline" className="w-full">
            Voir détails
          </Button>
        );
      case 'player':
        return (
          <Button variant="default" className="w-full bg-game-player hover:bg-game-player/80">
            Répondre
          </Button>
        );
      case 'commerce':
        if (message.status === 'pending') {
          return (
            <div className="flex flex-col gap-2 w-full">
              <Button variant="default" className="w-full bg-game-player hover:bg-game-player/80">
                Accepter
              </Button>
              <Button variant="outline" className="w-full">
                Renégocier
              </Button>
            </div>
          );
        }
        return null;
      case 'espionage':
        return (
          <Button variant="default" className="w-full bg-game-espionage hover:bg-game-espionage/80">
            Relancer une sonde
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-md bg-panel border-panel-border p-0 flex flex-col"
      >
        <SheetHeader className="border-b border-panel-border p-6 pb-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <MessageBadge type={message.type} />
            </div>
            <SheetTitle className="text-xl font-display text-foreground text-left">
              {message.title}
            </SheetTitle>
            <div className="text-sm text-slate-300">
              {message.timestamp.toLocaleDateString('fr-FR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })} à {message.timestamp.toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 p-6">
          {renderContent()}
        </ScrollArea>

        <div className="border-t border-panel-border p-6 pt-4 flex flex-col gap-2">
          {renderActions()}
          <Button variant="ghost" className="w-full" onClick={onClose}>Fermer</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}