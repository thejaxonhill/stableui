import '@testing-library/jest-dom'
import { validatePrompt } from '../components/common/PromptField'
 
describe('Validate prompt', () => {

  it('given valid prompt length then returns true', () => {
    expect(validatePrompt("test")).toBeTruthy()
  })

  it('given undefined prompt then returns true', () => {
    expect(validatePrompt(undefined)).toBeTruthy()
  })

})