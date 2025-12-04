import { Message } from '@/types/messages';
import { AttackMessageCard } from './AttackMessageCard';
import { CombatReportCard } from './CombatReportCard';
import { PlayerMessageCard } from './PlayerMessageCard';
import { SystemMessageCard } from './SystemMessageCard';
import { CommerceMessageCard } from './CommerceMessageCard';
import { EspionageMessageCard } from './EspionageMessageCard';

interface MessageCardProps {
  message: Message;
}

export function MessageCard({ message }: MessageCardProps) {
  switch (message.type) {
    case 'combat':
      if (message.subType === 'attack_incoming') {
        return <AttackMessageCard message={message} />;
      }
      return <CombatReportCard message={message} />;
    
    case 'player':
      return <PlayerMessageCard message={message} />;
    
    case 'system':
      return <SystemMessageCard message={message} />;
    
    case 'commerce':
      return <CommerceMessageCard message={message} />;
    
    case 'espionage':
      return <EspionageMessageCard message={message} />;
    
    default:
      return null;
  }
}
