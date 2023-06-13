/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { IdiomaContextProvider } from '../../context/IdiomaContext';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
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

        act(() => {
            render(
                <IdiomaContextProvider value={{ idioma: 'es' }}>
                    <NotFoundPage />
                </IdiomaContextProvider>,
                container);
        });

        expect(container.querySelector('.error-container')).not.toBe(null);
        expect(container.querySelector('.error-text-container')).not.toBe(null);
        expect(container.querySelector('.text-404').textContent).toBe("404");
        expect(container.querySelector('.texto-no-encontrado').textContent).toBe("Oops! Página no encontrada.");
        expect(container.querySelector('.subtexto-no-encontrado').textContent).toBe("La página que buscabas no existe.");
        expect(container.querySelector('.boton-volver-container').getAttribute("href")).toBe("/");
        expect(container.querySelector('button')).not.toBe(null);
    });
});
