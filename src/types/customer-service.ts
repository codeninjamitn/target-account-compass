
export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  options?: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
}
