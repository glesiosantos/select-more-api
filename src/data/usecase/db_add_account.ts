import { AccountModel } from '../../domain/models/account'
import { AddAccount, AddAccountModel } from '../../domain/usecase/add_account'
import { Encrypter } from '../protocols/encrypter'

export class DbAddAccount implements AddAccount {
  constructor(private readonly encrypter: Encrypter) { }
  async add(data: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(data.password)
    return await new Promise(resolve => { resolve(null) })
  }
}
