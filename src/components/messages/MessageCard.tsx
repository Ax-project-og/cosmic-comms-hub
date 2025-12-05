import { Message } from '@/types/messages';
import { AttackMessageCard } from './AttackMessageCard';
import { CombatReportCard } from './CombatReportCard';
import { PlayerMessageCard } from './PlayerMessageCard';
import { SystemMessageCard } from './SystemMessageCard';
import { CommerceMessageCard } from './CommerceMessageCard';
import { EspionageMessageCard } from './EspionageMessageCard';

interface MessageCardProps {
  message: Message;
  onClick?: () => void;
}

export function MessageCard({ message, onClick }: MessageCardProps) {
  switch (message.type) {
    case 'combat':
      if (message.subType === 'attack_incoming') {
        return <AttackMessageCard message={message} onClick={onClick} />;
      }
      return <CombatReportCard message={message} onClick={onClick} />;
    
    case 'player':
      return <PlayerMessageCard message={message} onClick={onClick} />;
    
    case 'system':
      return <SystemMessageCard message={message} onClick={onClick} />;
    
    case 'commerce':
      return <CommerceMessageCard message={message} onClick={onClick} />;
    
    case 'espionage':
      return <EspionageMessageCard message={message} onClick={onClick} />;
    
    default:
      return null;
  }
}
