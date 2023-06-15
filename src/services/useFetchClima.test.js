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
    it('Componente se renderiza y hace fetch correctamente', () => {
        let checkUrl = "";
        const callMock = jest.fn();

        const mockLatitud = 41.387;
        const mockLongitud = 2.1701;
        const mockData = {
            hourly: {
                temperature_2m: [22, 25, 26],
            },
        };

        useFetch.mockReturnValue({
            call: callMock,
            loading: false,
            error: false,
            data: mockData,
        });

        callMock.mockImplementation((url) => {
            checkUrl = url;
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

        act(() => {
            render(<TestComponent />, container);
        });

        expect(customHook.infoClima.data).not.toBe(null)
        expect(checkUrl).toBe(`https://api.open-meteo.com/v1/forecast?latitude=${mockLatitud}&longitude=${mockLongitud}&hourly=temperature_2m`);
        expect(container.querySelector("#TestComponent_Data").textContent).toBe(JSON.stringify(mockData));
        expect(customHook.loadingClima).toBe(false);
    });

    it('Maneja el error correctamente', async () => {
        const mockLatitud = 41.387;
        const mockLongitud = 2.1701;

        const callMock = jest.fn();
        let checkUrl = "";

        useFetch.mockReturnValue({
            call: callMock,
            loading: false,
            error: true,
            data: null,
        });

        callMock.mockImplementation((url) => {
            checkUrl = url;
        });

        let customHook;

        const TestComponent = () => {
            customHook = useFetchClima(mockLatitud, mockLongitud);
            return (
                <div>
                    {
                        customHook.loadingClima ? "" : (
                            <div id="TestComponent_Data">{JSON.stringify(customHook.infoClima)}</div>
                        )
                    }
                </div>
            );
        };

        await act(async () => {
            render(<TestComponent />, container);
        });

        expect(customHook.loadingClima).toBe(false);
        expect(customHook.error).toBe(true);
        expect(container.querySelector("#TestComponent_Data").textContent).toBe(JSON.stringify(customHook.infoClima));
    });

    it('Componente se renderiza correctamente pero data es null (para obtener el 100% de las branches)', () => {
        let checkUrl = "";
        const callMock = jest.fn();

        const mockLatitud = 41.387;
        const mockLongitud = 2.1701;

        useFetch.mockReturnValue({
            call: callMock,
            loading: false,
            error: false,
            data: null,
        });

        callMock.mockImplementation((url) => {
            checkUrl = url;
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

        act(() => {
            render(<TestComponent />, container);
        });

        expect(checkUrl).toBe(`https://api.open-meteo.com/v1/forecast?latitude=${mockLatitud}&longitude=${mockLongitud}&hourly=temperature_2m`);
        expect(customHook.loadingClima).toBe(true);
    });
});
