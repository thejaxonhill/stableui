/**
 * @jest-environment node
 */
import { generateImageSD3 } from "../ts/client/generate"
import { ExtendedFormData } from "../ts/components/extended-formdata"
import { AspectRatio, OutputFormat } from "../ts/types"

const fetchMock = jest
  .spyOn(global, 'fetch')
  .mockImplementation(jest.fn(
    () => Promise.resolve({ 
        blob: () => new Blob([]),
        json: () => Promise.resolve({ data: 100 }),
        ok: true 
  }), 
) as jest.Mock) 

describe('generateImageSD3', () => {
    it('given text to image request when generateImageSD3 then formData is set correctly', async () => {
        const request = {
            aspectRatio: AspectRatio["1:1"],
            prompt: 'test',
            outputFormat: OutputFormat.PNG
        };
        
        await generateImageSD3(request);

        expect(fetchMock).toHaveBeenCalledWith('/api/generate/sd3',  expect.objectContaining({
                body: expect.any(ExtendedFormData),
                method: 'post',
                headers: { "Accept": "image/*" }
            }))
    })
})