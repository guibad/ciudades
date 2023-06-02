/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { IdiomaContextProvider } from '../../context/IdiomaContext';
import { InfoPolitica } from './InfoPolitica';

describe('InfoPolitica', () => {
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
                    "place name": "Barcelona",
                    state: "Catalunya",
                },
            ],
        };

        act(() => {
            render(
                <IdiomaContextProvider value={{ idioma: 'es' }}>
                    <InfoPolitica infoPolitica={infoPolitica} />
                </IdiomaContextProvider>
                , container);
        });

        expect(container.querySelector('.politica-container')).not.toBe(null);

        const imagen = container.querySelector('.imagen');
        expect(imagen).not.toBeNull();
        expect(imagen.getAttribute('src')).toBe('/assets/img/flags/bcat.gif');
        expect(imagen.getAttribute('alt')).toBe('Bandera Catalunya');

        const ciudad = container.querySelector('.ciudad-texto');
        const comunidad = container.querySelector('.comunidad-texto');
        expect(container.querySelector('.texto')).not.toBe(null);
        expect(ciudad).not.toBe(null);
        expect(comunidad).not.toBe(null);
        expect(container.querySelector('.no-info')).toBe(null);
        expect(ciudad.textContent).toBe('Ciudad: Barcelona');
        expect(comunidad.textContent).toBe('Comunidad: Catalunya');
    });

    it('Si el array infoPolitica está undefined, el recuadro no muestra nada', () => {
        const infoPolitica = undefined;

        act(() => {
            render(
                <IdiomaContextProvider value={{ idioma: 'es' }}>
                    <InfoPolitica infoPolitica={infoPolitica} />
                </IdiomaContextProvider>
                , container);
        });

        expect(container.querySelector('.no-info')).not.toBe(null);
    });
});
