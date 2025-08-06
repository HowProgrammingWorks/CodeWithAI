'use strict';

const crypto = require('crypto');
const { performance } = require('perf_hooks');
const os = require('os');

class GSID {
  constructor() {
    this.counter = 0;
    this.lastTimestamp = 0;
    this.machineId = GSID.generateMachineId();
    this.processId = process.pid;
    this.entropyPool = crypto.randomBytes(32);
    this.entropyIndex = 0;
  }

  static generateMachineId() {
    const networkInterfaces = os.networkInterfaces();
    const macAddresses = [];
    for (const interfaceName in networkInterfaces) {
      const interfaces = networkInterfaces[interfaceName];
      for (const iface of interfaces) {
        if (iface.mac && iface.mac !== '00:00:00:00:00:00') {
          macAddresses.push(iface.mac);
        }
      }
    }
    const hostname = os.hostname();
    const combined = hostname + macAddresses.join('');
    return crypto
      .createHash('sha256')
      .update(combined)
      .digest('hex')
      .substring(0, 8);
  }

  getTimestamp() {
    const now = Date.now();
    if (now === this.lastTimestamp) {
      this.counter++;
    } else {
      this.counter = 0;
      this.lastTimestamp = now;
    }
    return now;
  }

  getEntropyBytes(count) {
    if (this.entropyIndex + count > this.entropyPool.length) {
      this.entropyPool = crypto.randomBytes(32);
      this.entropyIndex = 0;
    }
    const bytes = this.entropyPool.slice(
      this.entropyIndex,
      this.entropyIndex + count,
    );
    this.entropyIndex += count;
    return bytes;
  }

  generate() {
    const entropy = this.getEntropyBytes(8);
    const buffer = Buffer.allocUnsafe(20);
    buffer.writeUInt32BE(this.counter, 0);
    buffer.writeUInt32BE(this.processId, 4);
    buffer.set(Buffer.from(this.machineId, 'hex'), 8);
    buffer.set(entropy, 12);
    return buffer.toString('base64url').replace(/=/g, '');
  }

  static generateUUID() {
    return crypto.randomUUID();
  }

  generateHybrid() {
    const entropy = this.getEntropyBytes(6);
    const buffer = Buffer.allocUnsafe(14);
    buffer.writeUInt16BE(this.counter % 65536, 0);
    buffer.writeUInt32BE(this.processId, 2);
    buffer.set(Buffer.from(this.machineId.substring(0, 4), 'hex'), 6);
    buffer.set(entropy, 8);
    return buffer.toString('base64url').replace(/=/g, '');
  }

  benchmark(iterations = 100000) {
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
      this.generate();
    }
    const gsidTime = performance.now() - start;
    const uuidStart = performance.now();
    for (let i = 0; i < iterations; i++) {
      GSID.generateUUID();
    }
    const uuidTime = performance.now() - uuidStart;
    return {
      gsid: gsidTime,
      uuid: uuidTime,
      ratio: uuidTime / gsidTime,
    };
  }
}

module.exports = GSID;
