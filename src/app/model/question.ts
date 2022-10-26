export interface Question {
  type: 'paragraph' | 'checkbox-list';
  name: string;
  content: string;
  options?: string[];
  allowAddAnswer: boolean;
  required: boolean;
}
