import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,

  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(process.env.MONGO_URL)
  },

  async disconnect(): Promise<void> {
    await this.client.close()
  },

  getCollection(nameCollection: string): Collection {
    return this.client.db().collection(nameCollection)
  },

  mapCollection(data: any): any {
    const { _id, objectWithoutId } = data
    return Object.assign({}, objectWithoutId, { id: _id.toHexString() })
  }
}
