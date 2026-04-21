import { QuizResult } from '../types';

const STORAGE_KEY = 'dfti_result_history';

export const saveResultToHistory = (result: QuizResult) => {
  try {
    const history = getResultHistory();
    // Prepend new result, keeping only the last 10
    const newHistory = [result, ...history].slice(0, 10);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  } catch (error) {
    console.error('Failed to save result history:', error);
  }
};

export const getResultHistory = (): QuizResult[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load result history:', error);
    return [];
  }
};

export const clearResultHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};
