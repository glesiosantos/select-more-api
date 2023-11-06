import validator from 'validator'
import { EmailValidatorAdapter } from './email_validator_adapter'

jest.mock('validator', () => ({
  isEmail(): boolean { return true }
}))

describe('Email Validator Adapter', () => {
  it('should return false when validator return false', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('any_email@mail.com.br')
    expect(isValid).toBeFalsy()
  })

  it('should return true when validator return true', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('any_email@mail.com.br')
    expect(isValid).toBeTruthy()
  })
})
