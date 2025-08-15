'use strict';

const generateId = (length = 24) => {
  let result = '';
  while (result.length < length) {
    result += Math.random().toString(32).substr(2);
  }
  return result.substr(0, length);
};

module.exports = { generateId };
