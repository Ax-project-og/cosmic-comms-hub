export type MessageType = 'system' | 'player' | 'combat' | 'commerce' | 'espionage';
export type MessageSubType = 
  | 'attack_incoming' 
  | 'combat_report' 
  | 'private_message' 
  | 'production_report' 
  | 'storage_warning'
  | 'trade_offer' 
  | 'trade_complete'
  | 'spy_report'
  | 'spy_detected';

export interface BaseMessage {
  id: string;
  type: MessageType;
  subType: MessageSubType;
  title: string;
  timestamp: Date;
  isRead: boolean;
  isCritical: boolean;
}

export interface AttackMessage extends BaseMessage {
  type: 'combat';
  subType: 'attack_incoming';
  attackerName: string;
  attackerAlliance?: string;
  originPlanet: string;
  targetPlanet: string;
  estimatedPower: number;
  impactTime: string;
  fleetComposition: { name: string; count: number }[];
}

export interface CombatReportMessage extends BaseMessage {
  type: 'combat';
  subType: 'combat_report';
  outcome: 'victory' | 'defeat' | 'draw';
  enemyName: string;
  location: string;
  loot: { metal: number; crystal: number; energy: number };
  losses: { name: string; count: number }[];
  enemyLosses: { name: string; count: number }[];
  debrisField: { metal: number; crystal: number };
  combatDuration: string;
}

export interface PlayerMessage extends BaseMessage {
  type: 'player';
  subType: 'private_message';
  senderName: string;
  senderAlliance?: string;
  relation: 'ally' | 'neutral' | 'enemy' | 'unknown';
  content: string;
}

export interface SystemMessage extends BaseMessage {
  type: 'system';
  subType: 'production_report' | 'storage_warning';
  content: string;
  details?: { label: string; value: string }[];
  actionRequired?: boolean;
}

export interface CommerceMessage extends BaseMessage {
  type: 'commerce';
  subType: 'trade_offer' | 'trade_complete';
  traderName: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed' | 'failed';
  offer: { metal?: number; crystal?: number; energy?: number };
  request: { metal?: number; crystal?: number; energy?: number };
  fleetETA?: string;
}

export interface EspionageMessage extends BaseMessage {
  type: 'espionage';
  subType: 'spy_report' | 'spy_detected';
  targetName?: string;
  targetPlanet: string;
  targetCoords: string;
  detectionProbability?: number;
  resources?: { metal: number; crystal: number; energy: number };
  fleetPower?: number;
  defensePower?: number;
  fleetDetails?: { name: string; count: number }[];
  defenseDetails?: { name: string; count: number }[];
  recommendation?: 'attack' | 'avoid' | 'spy_again';
}

export type Message = 
  | AttackMessage 
  | CombatReportMessage 
  | PlayerMessage 
  | SystemMessage 
  | CommerceMessage 
  | EspionageMessage;
