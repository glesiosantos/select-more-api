import { MissingParamError } from '../errors/missing_param_error'
import { badRequest } from '../helpers/http_helper'
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
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  it('should return 400 when email is not provided', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  it('should return 400 when password is not provided', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@email.com.br',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  it('should return 400 when password confirmation is not provided', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@email.com.br',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('passwordConfirmation')))
  })
})
