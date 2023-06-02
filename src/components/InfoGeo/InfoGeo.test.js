/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { IdiomaContextProvider } from '../../context/IdiomaContext';
import { InfoGeo } from './InfoGeo';

describe('InfoGeo', () => {
    let container = null;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
    });

    it('Componente se renderiza correctamente', () => {
        const infoPolitica = {
            places: [
                {
                    "state abbreviation": "CT",
                    latitude: 41.3833,
                    longitude: 2.1833,
                },
            ],
        };

        act(() => {
            render(
                <IdiomaContextProvider value={{ idioma: 'es' }}>
                    <InfoGeo infoPolitica={infoPolitica} />
                </IdiomaContextProvider>
                , container);
        });

        expect(container.querySelector('.geo-container')).not.toBeNull();

        const latitud = container.querySelector('.texto p:first-child');
        const longitud = container.querySelector('.texto p:last-child');
        expect(latitud).not.toBeNull();
        expect(latitud.textContent).toContain('41.383');
        expect(longitud).not.toBeNull();
        expect(longitud.textContent).toContain('2.1833');

        const iconoMapa = container.querySelector('.icono-mapa');
        expect(iconoMapa).not.toBeNull();

    });
});
