/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { IdiomaContextProvider } from '../../context/IdiomaContext';
import { toHaveClass } from '@testing-library/jest-dom'
import { Navbar } from './Navbar';


describe('Navbar', () => {
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

    it('Renderiza el componente correctamente', () => {
        act(() => {
            render(
                <MemoryRouter>
                    <IdiomaContextProvider value={{ idioma: 'es' }}>
                        <Navbar />
                    </IdiomaContextProvider>
                </MemoryRouter>,
                container
            );
        })

        expect(container.querySelector('.navbar')).not.toBe(null);
        expect(container.querySelector('.navbar-brand')).not.toBe(null);
        expect(container.querySelector('.titulo')).not.toBe(null);
        expect(container.querySelector('.links-container')).not.toBe(null);
    });

    it('A los enlaces se les aplican las clases correctamente', () => {
        act(() => {
            render(
                <MemoryRouter>
                    <IdiomaContextProvider value={{ idioma: 'es' }}>
                        <Navbar />
                    </IdiomaContextProvider>
                </MemoryRouter>,
                container
            );
        })

        const linkBuscar = container.querySelector('#linkBuscar');
        expect(linkBuscar).toHaveClass("link_activo");

        const linkHistorial = container.querySelector('#linkHistorial');
        expect(linkHistorial).toHaveClass("link");
    });

    it('Los enlaces cambian de clase segun la ruta en la que se encuentren', () => {
        act(() => {
            render(
                <MemoryRouter initialEntries={['/historial']}>
                    <IdiomaContextProvider value={{ idioma: 'es' }}>
                        <Navbar />
                    </IdiomaContextProvider>
                </MemoryRouter>,
                container
            );
        })

        const linkBuscar = container.querySelector('#linkBuscar');
        expect(linkBuscar).toHaveClass("link");

        const linkHistorial = container.querySelector('#linkHistorial');
        expect(linkHistorial).toHaveClass("link_activo");

        act(() => {
            render(
                <MemoryRouter initialEntries={['/buscar']}>
                    <IdiomaContextProvider value={{ idioma: 'es' }}>
                        <Navbar />
                    </IdiomaContextProvider>
                </MemoryRouter>,
                container
            );
        })
    });

    it('La ruta cambia al hacer click sobre los links', () => {
        const history = createMemoryHistory();

        act(() => {
            render(
                <MemoryRouter initialEntries={['/buscar']}>
                    <IdiomaContextProvider value={{ idioma: 'es' }}>
                        <Navbar />
                    </IdiomaContextProvider>
                </MemoryRouter>,
                container
            );
        });


        act(() => {
            const linkHistorial = container.querySelector('#linkHistorial');
            linkHistorial.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(history.location.pathname).toBe('/historial');
    });
});