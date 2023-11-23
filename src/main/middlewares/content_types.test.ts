import request from 'supertest'
import app from '../config/app'

describe('Content Types Middlewares Test', () => {
  it('should return default content_type as json', async () => {
    app.get('/content_types', (req, res) => res.send(''))

    await request(app)
      .get('/content_types')
      .expect('content-type', /json/)
  })
})
