import { AddAccount } from '../../domain/usecase/add_account'
import { Encrypter } from '../protocols/encrypter'
import { DbAddAccount } from './db_add_account'

type SutTypes = {
  sut: AddAccount
  encrypterStub: Encrypter
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return await new Promise(resolve => { resolve('hashed_password') })
    }
  }

  return new EncrypterStub()
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const sut = new DbAddAccount(encrypterStub)
  return { sut, encrypterStub }
}

describe('DB Add Account', () => {
  it('should calls Encrypter with correct values', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'any_name',
      email: 'any_mail@email.com.br',
      password: 'any_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith(accountData.password)
  })
})
