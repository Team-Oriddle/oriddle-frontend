export interface UserData{
  nickname:string,
  position: number,
  userId:number,
  isHost:boolean
  score?: number;
}

export interface QuizData {
  roomTitle:      string;
  quizTitle:      string;
  maxParticipant: number;
  participants:   UserData[];
}

export interface ChatData{
  nickname: string,
  content: string
}

export interface Answer{
  userId?: number;
  answer: string;
  score?: number;
}

export interface QuestionData{
  description: string;
  number: number;
  score: number;
  source: string;
  sourceType: string;
  timeLimit: number;
  type: string;
}