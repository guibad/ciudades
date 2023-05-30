/* eslint-disable testing-library/no-unnecessary-act */
import { useContext } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { IdiomaContext, IdiomaContextProvider } from '../../context/IdiomaContext';
import SelectorIdioma from './SelectorIdioma';


describe('SelectorIdioma', () => {
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
                <IdiomaContextProvider value={{ idioma: "es" }}>
                    <SelectorIdioma />
                </IdiomaContextProvider>,
                container
            );
        });

        const select = container.querySelector('select');
        expect(select).not.toBe(null);

    });

    it('El select cambia correctamente de valor', () => {

        act(() => {
            render(
                <IdiomaContextProvider>
                    <SelectorIdioma />
                </IdiomaContextProvider>,
                container
            );
        });

        const select = container.querySelector('select');

        act(() => {
            select.value = 'cat';
            select.dispatchEvent(new Event('change', { bubbles: true }));
        });

        expect(select.value).toBe('cat');
    });
});