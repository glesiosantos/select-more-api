import { AccountModel } from '../../domain/models/account'
import { AddAccount, AddAccountModel } from '../../domain/usecase/add_account'

export class AccountMongoRepository implements AddAccount {
  async add(data: AddAccountModel): Promise<AccountModel> {
    return new Promise(resolve => { resolve(null) })
  }
}
