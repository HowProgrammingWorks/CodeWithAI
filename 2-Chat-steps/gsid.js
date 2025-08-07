'use strict';

const crypto = require('crypto');
const os = require('os');

class MachineId {
  static generate() {
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
}

class EntropyPool {
  constructor() {
    this.pool = crypto.randomBytes(32);
    this.index = 0;
  }

  getBytes(count) {
    if (this.index + count > this.pool.length) {
      this.pool = crypto.randomBytes(32);
      this.index = 0;
    }
    const bytes = this.pool.slice(this.index, this.index + count);
    this.index += count;
    return bytes;
  }
}

class CounterManager {
  constructor() {
    this.counter = 0;
    this.lastTimestamp = 0;
  }

  getNext() {
    const now = Date.now();
    if (now === this.lastTimestamp) {
      this.counter++;
    } else {
      this.counter = 0;
      this.lastTimestamp = now;
    }
    return this.counter;
  }
}

class GSID {
  constructor() {
    this.counterManager = new CounterManager();
    this.entropyPool = new EntropyPool();
    this.machineId = MachineId.generate();
    this.processId = process.pid;
  }

  generate() {
    const counter = this.counterManager.getNext();
    const entropy = this.entropyPool.getBytes(8);
    const buffer = Buffer.allocUnsafe(20);
    buffer.writeUInt32BE(counter, 0);
    buffer.writeUInt32BE(this.processId, 4);
    buffer.set(Buffer.from(this.machineId, 'hex'), 8);
    buffer.set(entropy, 12);
    return buffer.toString('base64url').replace(/=/g, '');
  }
}

module.exports = GSID;
