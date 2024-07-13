/**
 * @jest-environment node
 */
import { upscaleConservative, UpscaleImageParams } from "../ts/client/upscale";
import { ExtendedFormData } from "../ts/components/extended-formdata";
import { OutputFormat } from "../ts/types";
import { mockFetch } from "./shared/mock-fetch";

describe(upscaleConservative, () => {
    it('when upscaleConservative then formData is set correctly', async () => {
        const params: UpscaleImageParams = {
            creativity: 5,
            image: new File([], 'test.png'),
            negativePrompt: 'test',
            prompt: 'test',
            outputFormat: OutputFormat.PNG,
            seed: '1000',
        };
        
        await upscaleConservative(params);

        expect(mockFetch).toHaveBeenCalledWith('/api/upscale/conservative',  expect.objectContaining({
                body: expect.any(ExtendedFormData),
                method: 'post',
                headers: { "Accept": "image/*" }
            }))

        const body: any = mockFetch.mock.calls[0][1]?.body;
        expect(body.has('creativity')).toBeTruthy();
        expect(body.has('image')).toBeTruthy();
        expect(body.has('negative_prompt')).toBeTruthy();
        expect(body.has('prompt')).toBeTruthy();
        expect(body.has('output_format')).toBeTruthy();
        expect(body.has('seed')).toBeTruthy();
    })
});