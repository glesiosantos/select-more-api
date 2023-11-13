import { AccountModel } from '../../domain/models/account'
import { AddAccount, AddAccountModel } from '../../domain/usecase/add_account'
import { AddAccountRepository } from '../protocols/add_account_repository'
import { Encrypter } from '../protocols/encrypter'
import { DbAddAccount } from './db_add_account'

type SutTypes = {
  sut: AddAccount
  encrypterStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(data: AddAccountModel): Promise<AccountModel> {
      return await new Promise(resolve => {
        resolve({
          id: 'valid_id',
          name: 'any_name',
          email: 'any_email@mail.com.br',
          password: 'hashed_password'
        })
      })
    }
  }

  return new AddAccountRepositoryStub()
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
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
  return { sut, encrypterStub, addAccountRepositoryStub }
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

  it('should throw when Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(() => { throw new Error() })
    const accountData = {
      name: 'any_name',
      email: 'any_mail@email.com.br',
      password: 'any_password'
    }
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  it('should throw when Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(() => { throw new Error() })
    const accountData = {
      name: 'any_name',
      email: 'any_mail@email.com.br',
      password: 'any_password'
    }
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  it('should calls AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = {
      name: 'any_name',
      email: 'any_mail@email.com.br',
      password: 'any_password'
    }
    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_mail@email.com.br',
      password: 'hashed_password'
    })
  })
})
