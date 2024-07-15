import '@testing-library/jest-dom';
import { validateControlParams } from '../components/control/ControlForm';
import { ControlParams } from '../ts/client/control';
 
describe(validateControlParams, () => {

  it('given valid control params length then returns true', () => {
    const params: ControlParams = {image: new File([], 'test.png'), prompt: "test"};
    expect(validateControlParams(params)).toBeTruthy()
  })

  it('given undefined image then returns false', () => {
    const params: ControlParams = {prompt: "test"};
    expect(validateControlParams(params)).toBeFalsy()
  })

  it('given invalid seed then returns false', () => {
    const params: ControlParams = {image: new File([], 'test.png'), prompt: "test", seed: '5000000000'};
    expect(validateControlParams(params)).toBeFalsy()
  })

  it('given invalid prompt then returns false', () => {
    const params: ControlParams = {image: new File([], 'test.png'), prompt: ""};
    expect(validateControlParams(params)).toBeFalsy()
  })

})