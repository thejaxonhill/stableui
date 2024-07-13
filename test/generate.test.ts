/**
 * @jest-environment node
 */
import { generateImageCore, GenerateImageCoreParams, generateImageSD3, GenerateImageSD3Params, generateImageUltra, GenerateImageUltraParams, StylePreset } from "../ts/client/generate"
import { ExtendedFormData } from "../ts/components/extended-formdata"
import { AspectRatio, OutputFormat } from "../ts/types"
import { mockFetch } from "./shared/mock-fetch";

describe(generateImageSD3, () => {
    it('given text to image request when generateImageSD3 then formData is set correctly', async () => {
        const params: GenerateImageSD3Params = {
            aspectRatio: AspectRatio["1:1"],
            model: 'sd3-medium',
            negativePrompt: 'test',
            outputFormat: OutputFormat.PNG,
            prompt: 'test',
            seed: '1000',
            strength: .5,
        };
        
        await generateImageSD3(params);

        expect(mockFetch).toHaveBeenCalledWith('/api/generate/sd3',  expect.objectContaining({
                body: expect.any(ExtendedFormData),
                method: 'post',
                headers: { "Accept": "image/*" }
            }))

        const body: any = mockFetch.mock.calls[0][1]?.body;
        expect(body.has('aspect_ratio')).toBeTruthy();
        expect(body.has('model')).toBeTruthy();
        expect(body.has('negative_prompt')).toBeTruthy();
        expect(body.has('output_format')).toBeTruthy();
        expect(body.has('prompt')).toBeTruthy();
        expect(body.has('seed')).toBeTruthy();
        expect(body.has('strength')).toBeFalsy();
    })

    it('given image to image request when generateImageSD3 then formData is set correctly', async () => {
        const params: GenerateImageSD3Params = {
            aspectRatio: AspectRatio["1:1"],
            image: new File([], 'test.png'),
            model: 'sd3-medium',
            negativePrompt: 'test',
            outputFormat: OutputFormat.PNG,
            prompt: 'test',
            seed: '1000',
            strength: .5,
        };
        
        await generateImageSD3(params);

        expect(mockFetch).toHaveBeenCalledWith('/api/generate/sd3',  expect.objectContaining({
                body: expect.any(ExtendedFormData),
                method: 'post',
                headers: { "Accept": "image/*" }
            }))

        const body: any = mockFetch.mock.calls[1][1]?.body;
        expect(body.has('aspect_ratio')).toBeFalsy();
        expect(body.has('image')).toBeTruthy();
        expect(body.has('model')).toBeTruthy();
        expect(body.has('negative_prompt')).toBeTruthy();
        expect(body.has('output_format')).toBeTruthy();
        expect(body.has('prompt')).toBeTruthy();
        expect(body.has('seed')).toBeTruthy();
        expect(body.has('strength')).toBeTruthy();
    })
});

describe(generateImageCore, () => {
    it('when generateImageCore then formData is set correctly', async () => {
        const params: GenerateImageCoreParams = {
            aspectRatio: AspectRatio["1:1"],
            negativePrompt: 'test',
            outputFormat: OutputFormat.PNG,
            prompt: 'test',
            seed: '1000',
            stylePreset: StylePreset["Analog film"]
        };
        
        await generateImageCore(params);

        expect(mockFetch).toHaveBeenCalledWith('/api/generate/core',  expect.objectContaining({
                body: expect.any(ExtendedFormData),
                method: 'post',
                headers: { "Accept": "image/*" }
            }))

        const body: any = mockFetch.mock.calls[2][1]?.body;
        expect(body.has('aspect_ratio')).toBeTruthy();
        expect(body.has('negative_prompt')).toBeTruthy();
        expect(body.has('output_format')).toBeTruthy();
        expect(body.has('prompt')).toBeTruthy();
        expect(body.has('seed')).toBeTruthy();
        expect(body.has('style_preset')).toBeTruthy();
    })
})

describe(generateImageUltra, () => {
    it('when generateImageUltra then formData is set correctly', async () => {
        const params: GenerateImageUltraParams = {
            aspectRatio: AspectRatio["1:1"],
            negativePrompt: 'test',
            outputFormat: OutputFormat.PNG,
            prompt: 'test',
            seed: '1000',
        };
        
        await generateImageUltra(params);

        expect(mockFetch).toHaveBeenCalledWith('/api/generate/ultra',  expect.objectContaining({
                body: expect.any(ExtendedFormData),
                method: 'post',
                headers: { "Accept": "image/*" }
            }))

        const body: any = mockFetch.mock.calls[3][1]?.body;
        expect(body.has('aspect_ratio')).toBeTruthy();
        expect(body.has('negative_prompt')).toBeTruthy();
        expect(body.has('output_format')).toBeTruthy();
        expect(body.has('prompt')).toBeTruthy();
        expect(body.has('seed')).toBeTruthy();
    })
})