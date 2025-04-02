const axios = require('axios');
const { calculateAverage } = require('../utils/mathUtils');

const WINDOW_SIZE = 10;
const TIMEOUT_MS = 500;
const BASE_URL = 'http://20.244.56.144/evaluation-service';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNjAwNTg2LCJpYXQiOjE3NDM2MDAyODYsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjU5ZWQ3YzZhLWEzY2QtNDMxNy1iM2ZiLWEzNzlkZmNmZmRhYiIsInN1YiI6IjIyMDUzNTU0QGtpaXQuYWMuaW4ifSwiZW1haWwiOiIyMjA1MzU1NEBraWl0LmFjLmluIiwibmFtZSI6InNyaXlhbSBtb2hhbnR5Iiwicm9sbE5vIjoiMjIwNTM1NTQiLCJhY2Nlc3NDb2RlIjoibndwd3JaIiwiY2xpZW50SUQiOiI1OWVkN2M2YS1hM2NkLTQzMTctYjNmYi1hMzc5ZGZjZmZkYWIiLCJjbGllbnRTZWNyZXQiOiJWZkRLa1hBWVVlVW1BeFR1In0.mG42YWAx0w4ZXe0i7mU9Mar0J3Zmd6SdAznLLpyusCM';

let numberStore = [];


const endpointMap = {
  p: `${BASE_URL}/primes`,
  f: `${BASE_URL}/fibo`,
  e: `${BASE_URL}/even`,
  r: `${BASE_URL}/rand`,
};

/**
 * @param {string} numberId
 * @returns {Object}
 */
const fetchAndCalculateAverage = async (numberId) => {
  const prevState = [...numberStore];

  const url = endpointMap[numberId];
  let fetchedNumbers = [];
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      timeout: TIMEOUT_MS,
    });
    fetchedNumbers = response.data.numbers || [];
  } catch (error) {
    fetchedNumbers = [];
  }

  fetchedNumbers.forEach((num) => {
    if (!numberStore.includes(num)) {
      if (numberStore.length >= WINDOW_SIZE) {
        numberStore.shift();
      }
      numberStore.push(num);
    }
  });

  const currState = [...numberStore];
  const avg = numberStore.length > 0 ? calculateAverage(numberStore) : 0;

  return {
    windowPrevState: prevState,
    windowCurrState: currState,
    numbers: fetchedNumbers,
    avg: avg.toFixed(2),
  };
};

module.exports = { fetchAndCalculateAverage };