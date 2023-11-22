import { AccountModel } from '../../domain/models/account'
import { AddAccount, AddAccountModel } from '../../domain/usecase/add_account'
import { AddAccountRepository } from '../protocols/add_account_repository'
import { Encrypter } from '../protocols/encrypter'

export class DbAddAccount implements AddAccount {
  constructor(private readonly encrypter: Encrypter, private readonly addAccountRepository: AddAccountRepository) { }
  async add(data: AddAccountModel): Promise<AccountModel> {
    const hash = await this.encrypter.encrypt(data.password)
    await this.addAccountRepository.add(Object.assign({}, data, { password: hash }))
    return await new Promise(resolve => { resolve(null) })
  }
}
