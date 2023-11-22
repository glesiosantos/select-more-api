import bcrypt from 'bcrypt'
import { BCryptAdapter } from './bcrypt_adapter'

const salt: number = 12

describe('Bcrypt Adapter ', () => {
  it('should calls bcrypt with correct values', async () => {
    const sut = new BCryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
})
