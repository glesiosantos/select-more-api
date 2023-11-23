import { Express } from 'express'
import { bodyParser } from '../middlewares/body_parser'
import { cors } from '../middlewares/cors'
import { contentTypes } from '../middlewares/content_type'
export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentTypes)
}
