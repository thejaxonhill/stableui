import '@testing-library/jest-dom'
import { validateUpscaleParams } from '../components/upscale/UpscaleForm'
import { UpscaleParams } from '../ts/client/upscale';

 
describe(validateUpscaleParams, () => {

  it('given valid upscale params length then returns true', () => {
    const params: UpscaleParams = {prompt: "test", image: new File([], 'test.png')};
    expect(validateUpscaleParams(params)).toBeTruthy()
  })

  it('given invalid seed then returns false', () => {
    const params: UpscaleParams = {prompt: "test", image: new File([], 'test.png'), seed: '5000000000'};
    expect(validateUpscaleParams(params)).toBeFalsy()
  })

  it('given invalid prompt then returns false', () => {
    const params: UpscaleParams = {prompt: "", image: new File([], 'test.png')};
    expect(validateUpscaleParams(params)).toBeFalsy()
  })

})