import '@testing-library/jest-dom'
import { validateSeed } from '../components/common/SeedField'
 
describe(validateSeed, () => {

  it('given valid seed then returns true', () => {
    expect(validateSeed("10")).toBeTruthy();
  })

  it('given 0 for seed then returns true', () => {
    expect(validateSeed("0")).toBeTruthy();
  })

  it('given undefined seed then returns true', () => {
    expect(validateSeed(undefined)).toBeTruthy();
  })

  it('given negative seed then returns false', () => {
    expect(validateSeed("-215")).toBeFalsy();
  })

  it('given too large seed then returns false', () => {
    expect(validateSeed("5000000000")).toBeFalsy();
  })

  it('given seed not instance of number then returns false', () => {
    expect(validateSeed("test")).toBeFalsy();
  })

})