import { Message } from '@/types/messages';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { MessageBadge } from './MessageBadge';
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
            <>
              <Button variant="default" className="w-full bg-game-combat hover:bg-game-combat/80">
                Envoyer flotte
              </Button>
              <Button variant="outline" className="w-full">
                Simuler défense
              </Button>
            </>
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
            <>
              <Button variant="default" className="w-full bg-game-player hover:bg-game-player/80">
                Accepter
              </Button>
              <Button variant="outline" className="w-full">
                Renégocier
              </Button>
            </>
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
    <Drawer open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DrawerContent className="max-h-[90vh] bg-panel border-panel-border">
        {message && (
          <>
            <DrawerHeader className="border-b border-panel-border">
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <MessageBadge type={message.type} />
                </div>
                <DrawerTitle className="text-xl font-display text-foreground text-left">
                  {message.title}
                </DrawerTitle>
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
            </DrawerHeader>

            <div className="p-6 overflow-auto max-h-[50vh]">
              {renderContent()}
            </div>

            <DrawerFooter className="border-t border-panel-border">
              {renderActions()}
              <DrawerClose asChild>
                <Button variant="ghost" className="w-full">Fermer</Button>
              </DrawerClose>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}