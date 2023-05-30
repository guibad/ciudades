/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { NoResultados } from './NoResultados';
import { IdiomaContextProvider } from '../../context/IdiomaContext';

describe('NoResultados', () => {
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

    it('Componente se renderiza correctamente', () => {
        act(() => {
            render(
                <IdiomaContextProvider value={{ idioma: 'es' }}>
                    <NoResultados />
                </IdiomaContextProvider>,
                container
            );
        });

        expect(container.querySelector('.container-no-results')).not.toBeNull();
        expect(container.querySelector('img').getAttribute('alt')).toBe('Lupa con cara triste');
        expect(container.querySelector('h4').textContent).toBe('No se obtuvieron resultados');
    });
});