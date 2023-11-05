import { MissingParamError } from '../errors/missing_param_error'
import { Controller } from '../protocols/controller'
import { SignUpController } from './signup_controller'

const makeSut = (): Controller => new SignUpController()

describe('Sign Up Controller', () => {
  it('should return 400 when name is not provided', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        email: 'any_mail@email.com.br',
        password: 'any_password',
        confirmationPassword: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({ statusCode: 400, body: new MissingParamError('name') })
  })

  it('should return 400 when email is not provided', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        confirmationPassword: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({ statusCode: 400, body: new MissingParamError('email') })
  })
})
