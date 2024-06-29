import '@testing-library/jest-dom'
import { validateSeed } from '../components/common/SeedField'
 
describe('Validate seed', () => {

  it('given valid seed length then returns true', () => {
    expect(validateSeed("10")).toBeTruthy();
  })

  it('given undefined seed then returns true', () => {
    expect(validateSeed(undefined)).toBeTruthy();
  })

  it('given negative seed then returns false', () => {
    expect(validateSeed("-215")).toBeFalsy();
  })

  it('given seed not instance of number then returns false', () => {
    expect(validateSeed("test")).toBeFalsy();
  })

})