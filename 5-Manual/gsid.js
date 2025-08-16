'use strict';

const crypto = require('node:crypto');

const DIGITS = '0123456789';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const CHARS = DIGITS + LOWER + UPPER + '-_';
const CHARS_LENGTH = CHARS.length;

const LOOKUP_TABLE = new Uint8Array(256);

for (let i = 0; i < 256; i++) {
  LOOKUP_TABLE[i] = CHARS.charCodeAt(i % CHARS_LENGTH);
}

const DEFAULT_LENGTH = 24;
const BUF_SIZE = DEFAULT_LENGTH * 4096;

const result = Buffer.allocUnsafe(DEFAULT_LENGTH);
const randomBuffer = crypto.randomBytes(BUF_SIZE);

let bufferPos = 0;

const generateGSID = (length = DEFAULT_LENGTH) => {
  if (bufferPos + length > randomBuffer.length) {
    crypto.randomFillSync(randomBuffer);
    bufferPos = 0;
  }
  const start = bufferPos;
  bufferPos += length;
  for (let i = 0; i < length; i++) {
    result[i] = LOOKUP_TABLE[randomBuffer[start + i]];
  }
  return result.toString('ascii');
};

module.exports = { generateGSID, CHARS };
