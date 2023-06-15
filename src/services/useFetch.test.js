import React, { useState } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';
import { useFetch } from './useFetch';

describe('useFetch', () => {
    let container = null;

    beforeEach(() => {
        global.fetch = jest.fn();
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
        jest.resetAllMocks();
    });

    it('Montaje de componente correcto', async () => {
        const mockData = {
            "post code": "08020",
            "country": "Spain",
            "country abbreviation": "ES",
            "places": [
                {
                    "place name": "Barcelona",
                    "longitude": "2.1833",
                    "state": "Cataluna",
                    "state abbreviation": "CT",
                    "latitude": "41.3833"
                }
            ]
        };

        const mockResponse = {
            ok: true,
            status: 200,
            json: jest.fn().mockResolvedValue(mockData),
        };

        global.fetch.mockResolvedValueOnce(mockResponse);

        let result = {};

        await act(async () => {
            await new Promise((resolve) => {
                const Component = () => {
                    result = useFetch(null);
                    resolve();
                    return <div id="TestComponent"></div>;
                };

                render(<Component />, container);
            });
        });

        await act(async () => {
            await result.call('https://api.zippopotam.us/es/08020');
        });

        expect(result.loading).toBe(false);
        expect(result.error).toBe(false);
        expect(result.data).toEqual(mockData);
    });

    it('Maneja error correctamente', async () => {
        const mockResponse = {
            ok: false,
            status: 404,
        };
        global.fetch.mockResolvedValueOnce(mockResponse);

        let result = {};

        await act(async () => {
            await new Promise((resolve) => {
                const Component = () => {
                    result = useFetch(null);
                    resolve();
                    return <div id="TestComponent">{result.data}</div>;
                };

                render(<Component />, container);
            });
        });

        await act(async () => {
            await result.call('https://api.zippopotam.us/es/08020');
        });

        expect(result.loading).toBe(false);
        expect(result.error).toBe(true);
        expect(result.data).toBe(null);
        expect(container.querySelector('#TestComponent').textContent).toBe("")
    });
});
