const DIGITS = '0123456789';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const CHARS = DIGITS + LOWER + UPPER + '-_';
const CHARS_LENGTH = CHARS.length;

const POSSIBLE = new Uint8Array(CHARS_LENGTH);
for (let i = 0; i < CHARS_LENGTH; i++) {
  POSSIBLE[i] = CHARS.charCodeAt(i);
}

const DEFAULT_LENGTH = 24;
const BUF_SIZE = DEFAULT_LENGTH * 1024;
const MAX_LENGTH = 256;

const randomBuffer = new Uint8Array(BUF_SIZE);
const resultBuffer = new Uint8Array(MAX_LENGTH);

crypto.getRandomValues(randomBuffer);

let bufferPos = 0;

const generateId = (length = DEFAULT_LENGTH) => {
  if (bufferPos + length > randomBuffer.length) {
    crypto.getRandomValues(randomBuffer);
    bufferPos = 0;
  }
  const start = bufferPos;
  bufferPos += length;
  for (let i = 0; i < length; i++) {
    resultBuffer[i] = POSSIBLE[randomBuffer[start + i] & 0x3f];
  }
  return String.fromCharCode(...resultBuffer.slice(0, length));
};

export { generateId, CHARS };
