import { Message } from '@/types/messages';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { MessageBadge } from './MessageBadge';
import { SeverityBadge } from './SeverityBadge';
import { X } from 'lucide-react';
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
            <>
              <Button variant="default" className="flex-1 bg-game-combat hover:bg-game-combat/80">
                Envoyer flotte
              </Button>
              <Button variant="outline" className="flex-1">
                Simuler défense
              </Button>
            </>
          );
        }
        return (
          <Button variant="outline" className="flex-1">
            Voir détails
          </Button>
        );
      case 'player':
        return (
          <Button variant="default" className="flex-1 bg-game-player hover:bg-game-player/80">
            Répondre
          </Button>
        );
      case 'commerce':
        if (message.status === 'pending') {
          return (
            <>
              <Button variant="default" className="flex-1 bg-game-player hover:bg-game-player/80">
                Accepter
              </Button>
              <Button variant="outline" className="flex-1">
                Renégocier
              </Button>
            </>
          );
        }
        return null;
      case 'espionage':
        return (
          <Button variant="default" className="flex-1 bg-game-espionage hover:bg-game-espionage/80">
            Relancer une sonde
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Drawer open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DrawerContent className="bg-panel border-panel-border max-h-[90vh]">
        <div className="mx-auto w-full max-w-3xl">
          <DrawerHeader className="border-b border-panel-border pb-4">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <MessageBadge type={message.type} />
                  <SeverityBadge severity={message.severity} />
                </div>
                <DrawerTitle className="text-xl font-display text-foreground">
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
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          <div className="p-6 overflow-y-auto max-h-[50vh] custom-scrollbar">
            {renderContent()}
          </div>

          <DrawerFooter className="border-t border-panel-border pt-4">
            <div className="flex gap-3 w-full">
              {renderActions()}
              <DrawerClose asChild>
                <Button variant="ghost">Fermer</Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
