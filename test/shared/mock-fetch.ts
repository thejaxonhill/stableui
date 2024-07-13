export const mockFetch = jest
.spyOn(global, 'fetch')
.mockImplementation(jest.fn(
  () => Promise.resolve({ 
      blob: () => new Blob([]),
      json: () => Promise.resolve({ errors: ['test error'] }),
      ok: true 
}), 
) as jest.Mock);