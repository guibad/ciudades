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

    it('debería renderizar correctamente la información política', () => {
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

        expect(container.querySelector('.politica-container')).not.toBeNull();

        const imagen = container.querySelector('.imagen');
        expect(imagen).not.toBeNull();
        expect(imagen.getAttribute('src')).toBe('/assets/img/flags/bcat.gif');
        expect(imagen.getAttribute('alt')).toBe('Bandera Catalunya');

        const texto = container.querySelector('.texto');
        const ciudad = container.querySelector('.ciudad-texto');
        const comunidad = container.querySelector('.comunidad-texto');
        expect(texto).not.toBeNull();
        expect(ciudad).not.toBeNull();
        expect(comunidad).not.toBeNull();
        expect(ciudad.textContent).toBe('Ciudad: Barcelona');
        expect(comunidad.textContent).toBe('Comunidad: Catalunya');
    });
});
