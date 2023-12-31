import bcrypt from 'bcrypt'
import { BCryptAdapter } from './bcrypt_adapter'
import { Encrypter } from '../../data/protocols/encrypter'

const salt: number = 12

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> { return new Promise(resolve => { resolve('hashed_value') }) }
}))

const makeSut = (): Encrypter => new BCryptAdapter(salt)

describe('Bcrypt Adapter ', () => {
  it('should calls bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  it('should return a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hashed_value')
  })

  it('should throw when bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})
