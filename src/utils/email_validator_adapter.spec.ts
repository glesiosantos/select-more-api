import { EmailValidatorAdapter } from './email_validator_adapter'

describe('Email Validator Adapter', () => {
  it('should return false when validate return false', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('any_email@mail.com.br')
    expect(isValid).toBeFalsy()
  })
})
