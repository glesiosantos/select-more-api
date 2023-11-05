import { MissingParamError } from '../errors/missing_param_error'
import { type Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.name) {
      return { statusCode: 400, body: new MissingParamError('name') }
    }

    if (!httpRequest.body.email) {
      return { statusCode: 400, body: new MissingParamError('email') }
    }
  }
}
