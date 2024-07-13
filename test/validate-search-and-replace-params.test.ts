import '@testing-library/jest-dom';
import { validateSearchAndReplaceParams } from '../components/edit/SearchAndReplaceForm';
import { SearchAndReplaceParams } from '../ts/client/edit';

 
describe(validateSearchAndReplaceParams, () => {

  it('given valid search and replace params length then returns true', () => {
    const params: SearchAndReplaceParams = {prompt:'test', searchPrompt: 'test', image: new File([], 'test.png')};
    expect(validateSearchAndReplaceParams(params)).toBeTruthy()
  })

  it('given invalid seed then returns false', () => {
    const params: SearchAndReplaceParams = {prompt:'test', searchPrompt: 'test', image: new File([], 'test.png'), seed: '5000000000'};
    expect(validateSearchAndReplaceParams(params)).toBeFalsy()
  })

})