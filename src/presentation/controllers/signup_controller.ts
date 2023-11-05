import { MissingParamError } from '../errors/missing_param_error'
import { type Controller } from '../protocols/controller'

export class SignUpController implements Controller {
  async handle(httpRequest: any): Promise<any> {
    if (!httpRequest.body.name) {
      return { statusCode: 400, body: new MissingParamError('name') }
    }

    if (!httpRequest.body.email) {
      return { statusCode: 400, body: new MissingParamError('email') }
    }
  }
}
