/**
 * @jest-environment node
 */
import { erase, EraseParams, inpaint, InpaintParams, outpaint, OutpaintParams, searchAndReplace, SearchAndReplaceParams } from "../ts/client/edit";
import { ExtendedFormData } from "../ts/components/extended-formdata";
import { OutputFormat } from "../ts/types";
import { mockFetch } from "./shared/mock-fetch";

describe(erase, () => {
    it('when erase then formData is set correctly', async () => {
        const params: EraseParams = {
            image: new File([], 'test.png'),
            growMask: 5,
            mask: new File([], 'mask.png'),
            outputFormat: OutputFormat.PNG,
            seed: '1000',
        };
        
        await erase(params);

        expect(mockFetch).toHaveBeenCalledWith('/api/edit/erase',  expect.objectContaining({
                body: expect.any(ExtendedFormData),
                method: 'post',
                headers: { "Accept": "image/*" }
            }))

        const body: any = mockFetch.mock.calls[0][1]?.body;
        expect(body.has('image')).toBeTruthy();
        expect(body.has('grow_mask')).toBeTruthy();
        expect(body.has('mask')).toBeTruthy();
        expect(body.has('output_format')).toBeTruthy();
        expect(body.has('seed')).toBeTruthy();
    })
});

describe(inpaint, () => {
    it('when inpaint then formData is set correctly', async () => {
        const params: InpaintParams = {
            image: new File([], 'test.png'),
            growMask: 5,
            mask: new File([], 'mask.png'),
            outputFormat: OutputFormat.PNG,
            prompt: 'test',
            seed: '1000',
        };
        
        await inpaint(params);

        expect(mockFetch).toHaveBeenCalledWith('/api/edit/inpaint',  expect.objectContaining({
                body: expect.any(ExtendedFormData),
                method: 'post',
                headers: { "Accept": "image/*" }
            }))

        const body: any = mockFetch.mock.calls[1][1]?.body;
        expect(body.has('image')).toBeTruthy();
        expect(body.has('grow_mask')).toBeTruthy();
        expect(body.has('mask')).toBeTruthy();
        expect(body.has('output_format')).toBeTruthy();
        expect(body.has('prompt')).toBeTruthy();
        expect(body.has('seed')).toBeTruthy();
    })
});

describe(outpaint, () => {
    it('when outpaint then formData is set correctly', async () => {
        const params: OutpaintParams = {
            creativity: 5,
            image: new File([], 'test.png'),
            left: '500',
            right: '500',
            up: '500',
            down: '500',
            outputFormat: OutputFormat.PNG,
            prompt: 'test',
            seed: '1000',
        };
        
        await outpaint(params);

        expect(mockFetch).toHaveBeenCalledWith('/api/edit/outpaint',  expect.objectContaining({
                body: expect.any(ExtendedFormData),
                method: 'post',
                headers: { "Accept": "image/*" }
            }))

        const body: any = mockFetch.mock.calls[2][1]?.body;
        expect(body.has('creativity')).toBeTruthy();
        expect(body.has('image')).toBeTruthy();
        expect(body.has('left')).toBeTruthy();
        expect(body.has('right')).toBeTruthy();
        expect(body.has('up')).toBeTruthy();
        expect(body.has('down')).toBeTruthy();
        expect(body.has('output_format')).toBeTruthy();
        expect(body.has('prompt')).toBeTruthy();
        expect(body.has('seed')).toBeTruthy();
    })
});

describe(searchAndReplace, () => {
    it('when searchAndReplace then formData is set correctly', async () => {
        const params: SearchAndReplaceParams = {
            image: new File([], 'test.png'),
            growMask: 5,
            negativePrompt: 'test',
            outputFormat: OutputFormat.PNG,
            prompt: 'test',
            searchPrompt: 'test',
            seed: '1000',
        };
        
        await searchAndReplace(params);

        expect(mockFetch).toHaveBeenCalledWith('/api/edit/search-and-replace',  expect.objectContaining({
                body: expect.any(ExtendedFormData),
                method: 'post',
                headers: { "Accept": "image/*" }
            }))

        const body: any = mockFetch.mock.calls[3][1]?.body;
        expect(body.has('image')).toBeTruthy();
        expect(body.has('grow_mask')).toBeTruthy();
        expect(body.has('negative_prompt')).toBeTruthy();
        expect(body.has('output_format')).toBeTruthy();
        expect(body.has('prompt')).toBeTruthy();
        expect(body.has('search_prompt')).toBeTruthy();
        expect(body.has('seed')).toBeTruthy();
    })
});