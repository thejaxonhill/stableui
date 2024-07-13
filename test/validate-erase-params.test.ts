import '@testing-library/jest-dom';
import { validateEraseParams } from '../components/edit/EraseForm';
import { EraseParams } from '../ts/client/edit';

 
describe(validateEraseParams, () => {

  it('given valid erase params length then returns true', () => {
    const params: EraseParams = {image: new File([], 'test.png')};
    expect(validateEraseParams(params)).toBeTruthy()
  })

  it('given invalid seed then returns false', () => {
    const params: EraseParams = {image: new File([], 'test.png'), seed: '5000000000'};
    expect(validateEraseParams(params)).toBeFalsy()
  })

})