import { EmailValidator } from '../protocols/email_validator'
import { InvalidParamError } from '../errors/invalid_param_error'
import { MissingParamError } from '../errors/missing_param_error'
import { badRequest } from '../helpers/http_helper'
import { type Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { AddAccount } from '../../domain/usecase/add_account'

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      await this.addAccount.add({ name, email, password })
    } catch (error) {
      return { statusCode: 500, body: new Error('Internal Server Error') }
    }
  }
}
