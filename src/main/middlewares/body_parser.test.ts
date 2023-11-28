import request from 'supertest'
import app from '../config/app'

describe('Body Parser Middlewares Test', () => {
  it('should parser body as json', async () => {
    app.post('/body_parser', (req, res) => res.send(req.body))

    await request(app)
      .post('/body_parser')
      .send({ name: 'Glêsio Santos' })
      .expect({ name: 'Glêsio Santos' })
  })
})
