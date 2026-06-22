export interface StudentEnrollment {
  id: string;
  studentName: string;
  parentNumber: string;
  interestedCourse: string;
  timestamp: string;
  status: 'pending' | 'success' | 'failed';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface WebhookConfig {
  n8nUrl: string;
  isActive: boolean;
  history: Array<{
    id: string;
    timestamp: string;
    payload: any;
    status: string;
    success: boolean;
  }>;
}
