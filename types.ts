
export type View = 'concepts' | 'quiz' | 'practice';

export interface Concept {
  title: string;
  explanation: string;
  codeExample: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface PracticeProblem {
  title: string;
  problemStatement: string;
  solution: string;
}

export interface EducationalContent {
  concepts: Concept[];
  quiz: QuizQuestion[];
  practiceProblems: PracticeProblem[];
}
