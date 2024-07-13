import '@testing-library/jest-dom';
import { validateInpaintParams } from '../components/edit/InpaintForm';
import { InpaintParams } from '../ts/client/edit';

 
describe(validateInpaintParams, () => {

  it('given valid inpaint params length then returns true', () => {
    const params: InpaintParams = {prompt: 'test', image: new File([], 'test.png')};
    expect(validateInpaintParams(params)).toBeTruthy()
  })

  it('given invalid seed then returns false', () => {
    const params: InpaintParams = {prompt: 'test', image: new File([], 'test.png'), seed: '5000000000'};
    expect(validateInpaintParams(params)).toBeFalsy()
  })

  it('given invalid prompt then returns false', () => {
    const params: InpaintParams = {prompt: "", image: new File([], 'test.png')};
    expect(validateInpaintParams(params)).toBeFalsy()
  })

})