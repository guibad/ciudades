/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { useParams } from 'react-router-dom';
import { IdiomaContextProvider } from '../../context/IdiomaContext';
import { useFetchPolitica } from '../../services/useFetchPolitica';
import { Cargando } from '../../components/Cargando/Cargando';
import { Buscador } from '../../components/Buscador/Buscador';
import { NoResultados } from '../../components/NoResultados/NoResultados';
import BuscarPage from './BuscarPage';
import { InfoPolitica } from '../../components/InfoPolitica/InfoPolitica';
import { InfoClima } from '../../components/InfoClima/InfoClima';
import { InfoGeo } from '../../components/InfoGeo/InfoGeo';

jest.mock("react-router-dom", () => {
    return {
        useParams: jest.fn(),
    };
});

jest.mock('@uiball/loaders', () => ({
    Ring: () => <div id="mocked-ring-component" />,
}));

jest.mock('../../services/useFetchPolitica');
jest.mock('../../components/Cargando/Cargando');
jest.mock('../../components/Buscador/Buscador')
jest.mock('../../components/NoResultados/NoResultados');
jest.mock('../../components/InfoPolitica/InfoPolitica');
jest.mock('../../components/infoClima/infoClima');
jest.mock('../../components/infoGeo/infoGeo');

describe('BuscarPage', () => {
    let container = null;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
    });

    it('Componente se renderiza correctamente (con loading true)', () => {
        Cargando.mockImplementation(() => {
            return <div className='cargando'></div>;
        });

        Buscador.mockImplementation((props) => {
            return <div className='buscador' loading={props.loading}></div>;
        });

        NoResultados.mockImplementation(() => {
            return <div className='no-resultados'></div>;
        });

        useParams.mockReturnValue({ cp: '08020' });

        const mockInfoPolitica = {};

        useFetchPolitica.mockReturnValue({
            infoPolitica: mockInfoPolitica,
            loading1: true,
            error: false,
        });

        act(() => {
            render(
                <IdiomaContextProvider value={{ idioma: "es" }}>
                    <BuscarPage />
                </IdiomaContextProvider>,
                container
            );
        });

        expect(container.querySelector('.container_buscar')).not.toBe(null);
        expect(container.querySelector('.cargando')).not.toBe(null);
        expect(container.querySelector('.no-resultados')).toBe(null);
        expect(container.querySelector('.recuadros-container')).toBe(null);
    });

    it('Componente se renderiza correctamente (con loading false y error true)', () => {
        Cargando.mockImplementation(() => {
            return <div className='cargando'></div>;
        });

        Buscador.mockImplementation((props) => {
            return <div className='buscador' loading={props.loading}></div>;
        });

        NoResultados.mockImplementation(() => {
            return <div className='no-resultados'></div>;
        });

        useParams.mockReturnValue({ cp: '08020' });

        const mockInfoPolitica = {};

        useFetchPolitica.mockReturnValue({
            infoPolitica: mockInfoPolitica,
            loading1: false,
            error: true,
        });

        act(() => {
            render(
                <IdiomaContextProvider value={{ idioma: "es" }}>
                    <BuscarPage />
                </IdiomaContextProvider>,
                container
            );
        });

        expect(container.querySelector('.container_buscar')).not.toBe(null);
        expect(container.querySelector('.cargando')).toBe(null);
        expect(container.querySelector('.no-resultados')).not.toBe(null);
        expect(container.querySelector('.recuadros-container')).toBe(null);
    });

    it('Componente se renderiza correctamente (con loading false y error false)', () => {
        useParams.mockReturnValue({ cp: '08020' });

        const mockInfoPolitica = {
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

        Cargando.mockImplementation(() => {
            return <div className='cargando'></div>;
        });

        Buscador.mockImplementation(() => {
            return <div className='buscador'></div>;
        });

        NoResultados.mockImplementation(() => {
            return <div className='no-resultados'></div>;
        });

        InfoPolitica.mockImplementation((props) => {
            expect(props.infoPolitica).toBe(mockInfoPolitica);
            return <div className='infoPolitica'></div>;
        });

        InfoClima.mockImplementation((props) => {
            expect(props.infoPolitica).toBe(mockInfoPolitica);
            return <div className='infoClima'></div>;
        });

        InfoGeo.mockImplementation((props) => {
            expect(props.infoPolitica).toBe(mockInfoPolitica);
            return <div className='infoGeo'></div>;
        });

        useFetchPolitica.mockReturnValue({
            infoPolitica: mockInfoPolitica,
            loading1: false,
            error: false,
        });

        act(() => {
            render(
                <IdiomaContextProvider value={{ idioma: "es" }}>
                    <BuscarPage />
                </IdiomaContextProvider>,
                container
            );
        });

        expect(container.querySelector('.container_buscar')).not.toBe(null);
        expect(container.querySelector('.cargando')).toBe(null);
        expect(container.querySelector('.no-resultados')).toBe(null);
        expect(container.querySelector('.recuadros-container')).not.toBe(null);
        expect(container.querySelector('.infoPolitica')).not.toBe(null);
        expect(container.querySelector('.infoClima')).not.toBe(null);
        expect(container.querySelector('.infoGeo')).not.toBe(null);
    });
});
