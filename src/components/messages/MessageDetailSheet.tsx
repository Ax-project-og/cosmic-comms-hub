import { Message } from '@/types/messages';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { MessageBadge } from './MessageBadge';
import { AttackMessageDetail } from './details/AttackMessageDetail';
import { CombatReportDetail } from './details/CombatReportDetail';
import { PlayerMessageDetail } from './details/PlayerMessageDetail';
import { SystemMessageDetail } from './details/SystemMessageDetail';
import { CommerceMessageDetail } from './details/CommerceMessageDetail';
import { EspionageMessageDetail } from './details/EspionageMessageDetail';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MessageDetailSheetProps {
  message: Message | null;
  open: boolean;
  onClose: () => void;
}

export function MessageDetailSheet({ message, open, onClose }: MessageDetailSheetProps) {
  const renderContent = () => {
    if (!message) return null;
    
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
    if (!message) return null;
    
    switch (message.type) {
      case 'combat':
        if (message.subType === 'attack_incoming') {
          return (
            <div className="flex gap-2 w-full">
              <Button size="sm" variant="default" className="flex-1 bg-game-combat hover:bg-game-combat/80">
                Envoyer flotte
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                Simuler défense
              </Button>
            </div>
          );
        }
        return (
          <Button size="sm" variant="outline" className="w-full">
            Voir détails
          </Button>
        );
      case 'player':
        return (
          <Button size="sm" variant="default" className="w-full bg-game-player hover:bg-game-player/80">
            Répondre
          </Button>
        );
      case 'commerce':
        if (message.status === 'pending') {
          return (
            <div className="flex gap-2 w-full">
              <Button size="sm" variant="default" className="flex-1 bg-game-player hover:bg-game-player/80">
                Accepter
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                Renégocier
              </Button>
            </div>
          );
        }
        return null;
      case 'espionage':
        return (
          <Button size="sm" variant="default" className="w-full bg-game-espionage hover:bg-game-espionage/80">
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
        className="w-full sm:max-w-md bg-panel border-l border-panel-border p-0 flex flex-col"
      >
        {message && (
          <>
            <SheetHeader className="border-b border-panel-border p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <MessageBadge type={message.type} />
              </div>
              <SheetTitle className="text-lg font-display text-foreground text-left leading-tight">
                {message.title}
              </SheetTitle>
              <div className="text-xs text-muted-foreground">
                {message.timestamp.toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })} à {message.timestamp.toLocaleTimeString('fr-FR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </SheetHeader>

            <ScrollArea className="flex-1 overflow-auto">
              <div className="p-4">
                {renderContent()}
              </div>
            </ScrollArea>

            <SheetFooter className="border-t border-panel-border p-4 flex-col gap-2">
              {renderActions()}
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
