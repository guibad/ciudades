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
        // Cambiamos de ubicación para comprobar que las clases de los links cambian
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

        // Busca los enlaces

        setTimeout(() => {
            act(() => {
                const linkHistorial = container.querySelector('#linkHistorial');
                linkHistorial.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });

            expect(history.location.pathname).toBe('/historial');
        }, 1000);
    });
});

// test('renderiza los enlaces correctamente', () => {
//     const container = document.createElement('div');

//     render(
//         <MemoryRouter>
//             <IdiomaContextProvider>
//                 <Navbar />
//             </IdiomaContextProvider>
//         </MemoryRouter>,
//         container
//     );

//     // Verifica que los enlaces estén presentes y tengan los estilos correctos
//     const linkBuscar = container.querySelector('a[href="/"]');
//     expect(linkBuscar).toBeInTheDocument();
//     expect(linkBuscar).toHaveClass('link');

//     const linkHistorial = container.querySelector('a[href="/historial"]');
//     expect(linkHistorial).toBeInTheDocument();
//     expect(linkHistorial).toHaveClass('link');

//     // Simula un cambio de ubicación para activar el enlace "Buscar"
//     render(
//         <MemoryRouter initialEntries={['/buscar']}>
//             <IdiomaContextProvider>
//                 <Navbar />
//             </IdiomaContextProvider>
//         </MemoryRouter>,
//         container
//     );

//     // Verifica que el enlace "Buscar" tenga la clase "link_activo" cuando está activo
//     expect(linkBuscar).toHaveClass('link_activo');

//     // Simula un cambio de ubicación para activar el enlace "Historial"
//     render(
//         <MemoryRouter initialEntries={['/historial']}>
//             <IdiomaContextProvider>
//                 <Navbar />
//             </IdiomaContextProvider>
//         </MemoryRouter>,
//         container
//     );

//     // Verifica que el enlace "Historial" tenga la clase "link_activo" cuando está activo
//     expect(linkHistorial).toHaveClass('link_activo');
// });