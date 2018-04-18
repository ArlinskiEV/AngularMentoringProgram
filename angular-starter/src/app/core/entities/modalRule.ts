import { Answer } from './answer';

export interface ModalRule {
  message: string;
  answerArr: Answer[];
  default?: Answer;
}
