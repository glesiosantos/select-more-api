import { AccountModel } from '../../domain/models/account'
import { AddAccount, AddAccountModel } from '../../domain/usecase/add_account'
import { MongoHelper } from './mongo_helpers'

export class AccountMongoRepository implements AddAccount {
  async add(data: AddAccountModel): Promise<AccountModel> {
    const accountRepository = MongoHelper.getCollection('accounts')
    const result = await accountRepository.insertOne(data)
    const accountById = await accountRepository.findOne({ _id: result.insertedId })
    return MongoHelper.mapCollection(accountById)
  }
}
