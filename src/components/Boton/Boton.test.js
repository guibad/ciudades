import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Boton } from './Boton';

describe('Boton', () => {
    test('Renderiza el texto que se le pasa por parámetros', () => {
        const { getByText } = render(<Boton texto="Buscar" />);

        const buttonElement = getByText('Buscar');
        expect(buttonElement).toBeInTheDocument();
    });

    test('Llama a la función onClick cuando se le llama', () => {
        const onClickMock = jest.fn();
        const { getByText } = render(<Boton texto="Buscar" onClick={onClickMock} />);

        const buttonElement = getByText('Buscar');
        fireEvent.click(buttonElement);

        expect(onClickMock).toHaveBeenCalledTimes(1);
    });
});