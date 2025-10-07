// Central export point for all modules
export { module1 } from './module1';
export { module2 } from './module2';

// Module type definition
export interface Lesson {
  id: number;
  title: string;
  content: string;
  keyPoints: string[];
  activity: string;
  resources: string[];
}

export interface CaseStudy {
  title: string;
  scenario: string;
  questions: Array<{
    q: string;
    hint: string;
  }>;
  modelAnswer: string;
}

export interface Quiz {
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'practical';
  options?: string[];
  answer: string;
  explanation: string;
  sampleAnswer?: string;
  markingCriteria?: string[];
}

export interface Module {
  id: number;
  title: string;
  duration: string;
  objectives: string[];
  lessons: Lesson[];
  caseStudy: CaseStudy;
  quiz: Quiz[];
  practicalExercise: {
    title: string;
    instructions: string;
    submissionGuidelines: string[];
  };
  resources: Array<{
    title: string;
    url: string;
    description: string;
  }>;
  assessmentCriteria: {
    quizWeight: number;
    practicalWeight: number;
    caseStudyWeight: number;
    passMark: number;
  };
}
