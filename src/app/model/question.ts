export interface Question {
  type: 'paragraph' | 'checkbox-list';
  content: string;
  options: string[];
  allowAddAnswer: boolean;
  otherAnswer?: string;
  required: boolean;
  answer?: string[] | string | null;
}
