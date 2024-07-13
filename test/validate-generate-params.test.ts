import '@testing-library/jest-dom'
import { validateGenerateParams } from '../components/generate/GenerateImageForm'
import { GenerateParams } from '../ts/client/generate';
 
describe(validateGenerateParams, () => {

  it('given valid generate params length then returns true', () => {
    const params: GenerateParams = {prompt: "test"};
    expect(validateGenerateParams(params)).toBeTruthy()
  })

  it('given invalid seed then returns false', () => {
    const params: GenerateParams = {prompt: "test", seed: '5000000000'};
    expect(validateGenerateParams(params)).toBeFalsy()
  })

  it('given invalid prompt then returns false', () => {
    const params: GenerateParams = {prompt: ""};
    expect(validateGenerateParams(params)).toBeFalsy()
  })

})