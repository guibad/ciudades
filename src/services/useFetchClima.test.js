/* eslint-disable testing-library/no-unnecessary-act */
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { useFetchClima } from './useFetchClima';
import { useFetch } from './useFetch';

jest.mock('./useFetch');

let container = null;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe('useFetchClima', () => {
    it('Componente se renderiza y hace fetch correctamente', async () => {
        const mockLatitud = 41.387;
        const mockLongitud = 2.1701;
        const mockData = {
            hourly: {
                temperature_2m: [22, 25, 26],
            },
        };

        useFetch.mockReturnValue({
            loading: false,
            error: false,
            data: mockData,
        });

        let customHook;

        const TestComponent = () => {
            customHook = useFetchClima(mockLatitud, mockLongitud);
            return (
                <div>
                    <div id="TestComponent_Data">{JSON.stringify(customHook.infoClima)}</div>
                </div>
            );
        };

        await act(async () => {
            render(<TestComponent />, container);
        });

        expect(customHook.loading1).toBe(false);
        expect(customHook.error).toBe(false);
        expect(useFetch).toHaveBeenCalledWith(`https://api.open-meteo.com/v1/forecast?latitude=${mockLatitud}&longitude=${mockLongitud}&hourly=temperature_2m`);
        expect(customHook.infoClima).toEqual(mockData);
        expect(container.querySelector("#TestComponent_Data").textContent).toBe(JSON.stringify(customHook.infoClima));
    });

    it('Maneja el error correctamente', async () => {
        const mockLatitud = 41.387;
        const mockLongitud = 2.1701;

        useFetch.mockReturnValue({
            loading: false,
            error: true,
            data: null,
        });

        let customHook;

        const TestComponent = () => {
            customHook = useFetchClima(mockLatitud, mockLongitud);
            return (
                <div>
                    {
                        customHook.loading1 ? "" : (
                            <div id="TestComponent_Data">{JSON.stringify(customHook.infoClima)}</div>
                        )
                    }
                </div>
            );
        };

        await act(async () => {
            render(<TestComponent />, container);
        });

        expect(customHook.loading1).toBe(false);
        expect(customHook.error).toBe(true);
        expect(container.querySelector("#TestComponent_Data").textContent).toBe(JSON.stringify(customHook.infoClima));
    });
});
