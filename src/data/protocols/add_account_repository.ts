import { AccountModel } from '../../domain/models/account'
import { AddAccountModel } from '../../domain/usecase/add_account'

export interface AddAccountRepository {
  add(data: AddAccountModel): Promise<AccountModel>
}
