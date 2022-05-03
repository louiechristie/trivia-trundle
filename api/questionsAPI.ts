import axios from 'axios';

export default axios.create({
  baseURL: 'https://opentdb.com/api.php?amount=10&difficulty=easy&type=boolean&category=9',
});
