import { MongoHelper } from './mongo_helpers'
import { AccountMongoRepository } from './account_mongo_repository'

describe('Account Mongo Repository Test', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('should return an account on success', async () => {
    const sut = new AccountMongoRepository()
    const account = await sut.add({
      name: 'any_email',
      email: 'any_password',
      password: 'hashed_password'
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
  })
})
