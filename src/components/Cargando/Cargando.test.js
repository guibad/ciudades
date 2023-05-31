/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Cargando } from './Cargando';

jest.mock('@uiball/loaders', () => ({
    Ring: () => <div data-testid="mocked-ring-component" />,
}));

describe('Cargando', () => {
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
            render(<Cargando />, container);
        });

        expect(container.querySelector('.container-loader')).not.toBeNull();
    });
});