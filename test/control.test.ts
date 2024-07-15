/**
 * @jest-environment node
 */

import { ControlParams, sketch, structure } from "../ts/client/control";
import { ExtendedFormData } from "../ts/components/extended-formdata";
import { OutputFormat } from "../ts/types";
import { mockFetch } from "./shared/mock-fetch";

describe(sketch, () => {
    it('when sketch then formData is set correctly', async () => {
        const params: ControlParams = {
            controlStrength: .7,
            image: new File([], 'test.png'),
            negativePrompt: 'test',
            outputFormat: OutputFormat.PNG,
            prompt: 'test',
            seed: '1000',
        };
        
        await sketch(params);

        expect(mockFetch).toHaveBeenCalledWith('/api/control/sketch',  expect.objectContaining({
                body: expect.any(ExtendedFormData),
                method: 'post',
                headers: { "Accept": "image/*" }
            }))

        const body: any = mockFetch.mock.calls[0][1]?.body;
        expect(body.has('control_strength')).toBeTruthy();
        expect(body.has('image')).toBeTruthy();
        expect(body.has('negative_prompt')).toBeTruthy();
        expect(body.has('output_format')).toBeTruthy();
        expect(body.has('prompt')).toBeTruthy();
        expect(body.has('seed')).toBeTruthy();
    })
});

describe(structure, () => {
    it('when structure then formData is set correctly', async () => {
        const params: ControlParams = {
            controlStrength: .7,
            image: new File([], 'test.png'),
            negativePrompt: 'test',
            outputFormat: OutputFormat.PNG,
            prompt: 'test',
            seed: '1000',
        };
        
        await structure(params);

        expect(mockFetch).toHaveBeenCalledWith('/api/control/structure',  expect.objectContaining({
                body: expect.any(ExtendedFormData),
                method: 'post',
                headers: { "Accept": "image/*" }
            }))

        const body: any = mockFetch.mock.calls[1][1]?.body;
        expect(body.has('control_strength')).toBeTruthy();
        expect(body.has('image')).toBeTruthy();
        expect(body.has('negative_prompt')).toBeTruthy();
        expect(body.has('output_format')).toBeTruthy();
        expect(body.has('prompt')).toBeTruthy();
        expect(body.has('seed')).toBeTruthy();
    })
});