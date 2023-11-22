import bcrypt from 'bcrypt'
import { Encrypter } from '../../data/protocols/encrypter'

export class BCryptAdapter implements Encrypter {
  constructor(private readonly salt: number) { }
  async encrypt(value: string): Promise<string> {
    const hashed = await bcrypt.hash(value, this.salt)
    return hashed
  }
}
