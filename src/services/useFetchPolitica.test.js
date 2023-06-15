/* eslint-disable testing-library/no-unnecessary-act */
import { useContext, useEffect } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { InfoHistorialContext } from '../context/InfoHistorialContext';
import { useFetch } from './useFetch';
import { useFetchPolitica } from './useFetchPolitica';

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

describe('useFetchPolitica', () => {
    it('Componente se renderiza y hace fetch correctamente', async () => {
        const mockCp = '08020';
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
        }

        let checkUrl = "";
        const callMock = jest.fn();

        const mockContextValue = {
            infoPolitica: {},
            setInfoPolitica: jest.fn(),
            historial: [],
            setHistorial: jest.fn(),
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

        let hookResult;

        const TestComponent = () => {
            hookResult = useFetchPolitica(mockCp);
            return (
                <div>
                    <div id="TestComponent_Data">{JSON.stringify(hookResult.infoPolitica)}</div>
                </div>
            );
        };

        await act(async () => {
            render(
                <InfoHistorialContext.Provider value={mockContextValue}>
                    <TestComponent />
                </InfoHistorialContext.Provider>,
                container
            );
        });

        expect(hookResult.loadingPolitica).toBe(false);
        expect(hookResult.error).toBe(false);
        expect(checkUrl).toBe(`https://api.zippopotam.us/es/${mockCp}`);
        expect(mockContextValue.setInfoPolitica).toHaveBeenCalledWith(mockData);
        expect(mockContextValue.setHistorial).toHaveBeenCalledWith([
            {
                cp: mockData['post code'],
                ciudad: mockData.places[0]['place name'],
                comunidad: mockData.places[0].state,
            },
            ...mockContextValue.historial,
        ]);
        expect(container.querySelector("#TestComponent_Data").textContent).toBe(JSON.stringify(hookResult.infoPolitica));
    });

    it('Se añade la latitud y longitud manualmente cuando se hace fetch a un CP de Canarias', async () => {
        const mockCp = '35001';
        const mockData = {
            "post code": "35001",
            "country": "Spain",
            "country abbreviation": "ES",
            "places": [
                {
                    "place name": "Las Palmas De Gran Canaria",
                    "longitude": "28.1",
                    "state": "Canarias",
                    "state abbreviation": "CN",
                    "latitude": ""
                }
            ]
        }

        let checkUrl = "";
        const callMock = jest.fn();

        const mockContextValue = {
            infoPolitica: {},
            setInfoPolitica: jest.fn(),
            historial: [],
            setHistorial: jest.fn(),
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

        let hookResult;

        const TestComponent = () => {
            hookResult = useFetchPolitica(mockCp);
            return (
                <div>
                    <div id="TestComponent_Data">{JSON.stringify(hookResult.infoPolitica)}</div>
                </div>
            );
        };

        await act(async () => {
            render(
                <InfoHistorialContext.Provider value={mockContextValue}>
                    <TestComponent />
                </InfoHistorialContext.Provider>,
                container
            );
        });

        expect(hookResult.loadingPolitica).toBe(false);
        expect(hookResult.error).toBe(false);
        expect(checkUrl).toBe(`https://api.zippopotam.us/es/${mockCp}`);
        expect(container.querySelector("#TestComponent_Data").textContent).toBe(JSON.stringify(hookResult.infoPolitica));
        expect(mockData.places[0].latitude).toBe(28.1);
        expect(mockData.places[0].longitude).toBe(-15.5);
    });

    it('Maneja el error correctamente', async () => {
        const mockCp = '35001';

        let checkUrl = "";
        const callMock = jest.fn();

        const mockContextValue = {
            infoPolitica: {},
            setInfoPolitica: jest.fn(),
            historial: [],
            setHistorial: jest.fn(),
        };

        useFetch.mockReturnValue({
            call: callMock,
            loading: false,
            error: true,
            data: null,
        });

        callMock.mockImplementation((url) => {
            checkUrl = url;
        });

        let hookResult;

        const TestComponent = () => {
            hookResult = useFetchPolitica(mockCp);
            return (
                <div>
                    <div id="TestComponent_Data">{JSON.stringify(hookResult.infoPolitica)}</div>
                </div>
            );
        };

        await act(async () => {
            render(
                <InfoHistorialContext.Provider value={mockContextValue}>
                    <TestComponent />
                </InfoHistorialContext.Provider>,
                container
            );
        });

        expect(hookResult.loadingPolitica).toBe(false);
        expect(hookResult.error).toBe(true);
        expect(hookResult.infoPolitica).toEqual({});
        expect(mockContextValue.setInfoPolitica).not.toHaveBeenCalled();
        expect(mockContextValue.setHistorial).not.toHaveBeenCalled();
    });

    it('Componente se renderiza correctamente pero data es null (para obtener el 100% de las branches)', async () => {
        const mockCp = '08020';

        let checkUrl = "";
        const callMock = jest.fn();

        const mockContextValue = {
            infoPolitica: {},
            setInfoPolitica: jest.fn(),
            historial: [],
            setHistorial: jest.fn(),
        };

        useFetch.mockReturnValue({
            call: callMock,
            loading: false,
            error: false,
            data: null,
        });

        callMock.mockImplementation((url) => {
            checkUrl = url;
        });

        let hookResult;

        const TestComponent = () => {
            hookResult = useFetchPolitica(mockCp);
            return (
                <div>
                    <div id="TestComponent_Data">{JSON.stringify(hookResult.infoPolitica)}</div>
                </div>
            );
        };

        await act(async () => {
            render(
                <InfoHistorialContext.Provider value={mockContextValue}>
                    <TestComponent />
                </InfoHistorialContext.Provider>,
                container
            );
        });

        expect(checkUrl).toBe(`https://api.zippopotam.us/es/${mockCp}`);
        expect(hookResult.error).toBe(false);
        expect(hookResult.loadingPolitica).toBe(true);
    });
});
