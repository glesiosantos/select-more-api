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

  it('should throw when bcrypt throws', async () => {
    const sut = new BCryptAdapter(salt)
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})
