import { SignUpController } from './signup_controller'

describe('Sign Up Controller', () => {
  it('should return 400 when name is not provided', async () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'any_mail@email.com.br',
        password: 'any_password',
        confirmationPassword: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({ statusCode: 400, body: new Error('Missing param: name') })
  })
})
