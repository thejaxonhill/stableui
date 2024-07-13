import '@testing-library/jest-dom';
import { validateOutpaintParams } from '../components/edit/OutpaintForm';
import { OutpaintParams } from '../ts/client/edit';

 
describe(validateOutpaintParams, () => {

  it('given valid outpaint params length then returns true', () => {
    const params: OutpaintParams = {left: '1500', creativity: 5, image: new File([], 'test.png')};
    expect(validateOutpaintParams(params)).toBeTruthy()
  })

  it('given invalid seed then returns false', () => {
    const params: OutpaintParams = {left: '1500', creativity: 5, image: new File([], 'test.png'), seed: '5000000000'};
    expect(validateOutpaintParams(params)).toBeFalsy()
  })

  it('given no direction then returns false', () => {
    const params: OutpaintParams = {creativity: 5, image: new File([], 'test.png')};
    expect(validateOutpaintParams(params)).toBeFalsy()
  })

  it('given invalid direction then returns false', () => {
    const params: OutpaintParams = {left: '2500', creativity: 5, image: new File([], 'test.png')};
    expect(validateOutpaintParams(params)).toBeFalsy()
  })

})