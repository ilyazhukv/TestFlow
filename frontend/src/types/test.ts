export interface Option {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  _id?: string;
  text: string;
  options: [Option];
  points: number;
}

export interface Test {
  _id: string;
  title: string;
  description: string;
  createdBy: { _id: string; name: string };
  questions: [Question];
  createdAt: string;
}
