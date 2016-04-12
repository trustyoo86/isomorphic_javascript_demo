import { CALL_API } from '../middlewares/api';
import constants from '../config/costants';

export const LOADED_QUESTIONS = 'LOADED_QUESTIONS';
export function loadQuestions() {
  return {
    [CALL_API] : {
      method : 'get',
      url : constants.apiEndPoint + '/questions',
      successType : LOADED_QUESTIONS
    }
  };
};