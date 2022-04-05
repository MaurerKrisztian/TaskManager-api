import { Injectable } from '@nestjs/common';
const CryptoJS = require('crypto-js');

@Injectable()
export class BcryptService {
  static encrypt(text: string) {
    const key = process.env['SECRET'];
    return CryptoJS.AES.encrypt(text, key).toString();
  }

  static decrypt(encrypted: string) {
    const key = process.env['SECRET'];
    const bytes = CryptoJS.AES.decrypt(encrypted, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
