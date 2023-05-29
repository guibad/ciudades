/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Buscador } from './Buscador';
import { IdiomaContextProvider } from '../../context/IdiomaContext';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

describe('Buscador', () => {
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
                <MemoryRouter>
                    <IdiomaContextProvider value={{ idioma: 'es' }}>
                        <Buscador loading={false} />
                    </IdiomaContextProvider>
                </MemoryRouter>,
                container
            );
        });

        const input = container.querySelector('input');
        const boton = container.querySelector('button');
        expect(input).not.toBe(null);
        expect(boton).not.toBe(null);
    });

    it('Lanza mensaje de error cuando se hace click y no hay texto en el buscador', () => {
        act(() => {
            render(
                <MemoryRouter>
                    <IdiomaContextProvider value={{ idioma: 'es' }}>
                        <Buscador loading={false} />
                    </IdiomaContextProvider>
                </MemoryRouter>,
                container
            );
        });

        const boton = container.querySelector('button');
        const mensajeError = container.querySelector(".mensaje-error");
        act(() => {
            boton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(mensajeError.textContent).toBe("Se debe introducir un código postal.")

    });

    it('Lanza mensaje de error cuando se introducen letras en vez de números', () => {
        act(() => {
            render(
                <MemoryRouter>
                    <IdiomaContextProvider value={{ idioma: 'es' }}>
                        <Buscador loading={false} value='ABCDE' />
                    </IdiomaContextProvider>
                </MemoryRouter>,
                container
            );
        });

        const input = container.querySelector('input');
        const boton = container.querySelector('button');
        const mensajeError = container.querySelector('.mensaje-error');

        act(() => {
            boton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(mensajeError.textContent).toBe('El código postal debe ser numérico.');
        console.log('input.value :>> ', input.value);
    });
});