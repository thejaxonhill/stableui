import '@testing-library/jest-dom'
import { validateOutpaintDirection } from '../components/edit/OutpaintDirection'
 
describe(validateOutpaintDirection, () => {

  it('given valid outpaint direction then returns true', () => {
    expect(validateOutpaintDirection("10")).toBeTruthy();
  })

  it('given 0 for outpaint direction then returns true', () => {
    expect(validateOutpaintDirection("0")).toBeFalsy();
  })

  it('given undefined outpaint direction then returns true', () => {
    expect(validateOutpaintDirection(undefined)).toBeTruthy();
  })

  it('given negative outpaint direction then returns false', () => {
    expect(validateOutpaintDirection("-215")).toBeFalsy();
  })

  it('given too large outpaint direction then returns false', () => {
    expect(validateOutpaintDirection("2001")).toBeFalsy();
  })

  it('given outpaint direction not instance of number then returns false', () => {
    expect(validateOutpaintDirection("test")).toBeFalsy();
  })

})