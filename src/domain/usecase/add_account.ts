import { AccountModel } from '../models/account'

type AddAccountModel = {
  name: string
  email: string
  password: string
}
export interface AddAccount {
  add(data: AddAccountModel): Promise<AccountModel>
}
