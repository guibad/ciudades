/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { useFetchClima } from '../../services/useFetchClima';
import { InfoClima } from './InfoClima';
import { IdiomaContextProvider } from '../../context/IdiomaContext';

jest.mock('../../services/useFetchClima');

describe('InfoClima', () => {
    let container = null;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        useFetchClima.mockReturnValue({
            infoClima: {
                hourly: {
                    temperature_2m: [10, 15, 12, 8],
                    time: ['2023-05-30T12:00:00', '2023-05-30T13:00:00', '2023-05-30T14:00:00', '2023-05-30T15:00:00'],
                },
            },
            loading1: false,
            error: null,
        });
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        jest.restoreAllMocks();
        container.remove();
    });

    it('Componente se renderiza correctamente', () => {
        act(() => {
            render(
                <IdiomaContextProvider value={{ idioma: 'es' }}>
                    <InfoClima infoPolitica={{ places: [{ latitude: 41.3833, longitude: 2.1833 }] }} />
                </IdiomaContextProvider>
                , container);
        });

        const chartElement = container.querySelector('.chart');
        expect(chartElement).not.toBe(null);

        const yAxisElement = container.querySelector('.y-axis');
        expect(yAxisElement).not.toBe(null);
    });

    it('Muestra mensaje de error cuando error es true', () => {
        useFetchClima.mockReturnValue({
            infoClima: null,
            loading1: false,
            error: true,
        });

        act(() => {
            render(
                <IdiomaContextProvider value={{ idioma: 'es' }}>
                    <InfoClima infoPolitica={{ places: [{ latitude: 41.3833, longitude: 2.1833 }] }} />
                </IdiomaContextProvider>
                , container);
        });

        const errorElement = container.querySelector('.error-clima');
        expect(errorElement.textContent).toBe('Error recuperando datos');
    });

    it('Muestra mensaje de carga cuando loading es true', () => {
        useFetchClima.mockReturnValue({
            infoClima: null,
            loading1: true,
            error: null,
        });

        act(() => {
            render(<InfoClima infoPolitica={{ places: [{ latitude: 41.3833, longitude: 2.1833 }] }} />, container);
        });

        const loadingElement = container.querySelector('div');
        expect(loadingElement.textContent).toBe('Cargando...');
    });
});
