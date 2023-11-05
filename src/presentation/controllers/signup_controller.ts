import { EmailValidator } from '../../validators/email_validator'
import { InvalidParamError } from '../errors/invalid_param_error'
import { MissingParamError } from '../errors/missing_param_error'
import { badRequest } from '../helpers/http_helper'
import { type Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
      return badRequest(new InvalidParamError('passwordConfirmation'))
    }
    this.emailValidator.isValid(httpRequest.body.email)
  }
}
