import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';

import App from '../App';

const emailAlguem = 'alguem@alguem.com';
const password = '123456';
describe('Testando a aplicação TrybeWallet:', () => {
  it('Verifica a página Login:', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const email = screen.getByLabelText(/email/i);
    expect(email).toBeInTheDocument();

    const senha = screen.getByLabelText(/senha/i);
    expect(senha).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeInTheDocument();

    userEvent.type(email, emailAlguem);
    userEvent.type(senha, password);
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
  it('Verifica a página Wallet:', async () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByLabelText(/email/i);
    const senha = screen.getByLabelText(/senha/i);
    const buttonEntrar = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, emailAlguem);
    userEvent.type(senha, password);
    userEvent.click(buttonEntrar);

    const input = screen.getAllByRole('textbox');
    expect(input.length).toBe(2);

    const select = screen.getAllByRole('combobox');
    expect(select.length).toBe(3);

    const buttonAdicionar = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(buttonAdicionar).toBeInTheDocument();

    const despesas = await screen.findByTestId('total-field');
    expect(despesas).toHaveTextContent(0.00);
  });
  it('Verifica se é possível adicionar despesas:', async () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByLabelText(/email/i);
    const senha = screen.getByLabelText(/senha/i);
    const buttonEntrar = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, emailAlguem);
    userEvent.type(senha, password);
    userEvent.click(buttonEntrar);

    const buttonAdicionar = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(buttonAdicionar).toBeInTheDocument();

    const valor = screen.getByTestId('value-input');
    const descricao = screen.getByTestId('description-input');
    const moeda = screen.getByTestId('currency-input');
    const pagamento = screen.getByTestId('method-input');
    const categoria = screen.getByTestId('tag-input');

    userEvent.type(valor, '100');
    userEvent.type(descricao, 'cem dólares');
    userEvent.selectOptions(moeda, [
      await screen.findByText('CAD'),
    ]);
    userEvent.selectOptions(pagamento, ['Cartão de crédito']);
    userEvent.selectOptions(categoria, ['Lazer']);
    userEvent.click(buttonAdicionar);

    const buttonExcluir = await screen.findByTestId('delete-btn');
    const buttonEditar = await screen.findByTestId('edit-btn');

    expect(buttonExcluir).toBeInTheDocument();
    expect(buttonEditar).toBeInTheDocument();
  });
  it('Verifica se é possível remover despesas:', async () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByLabelText(/email/i);
    const senha = screen.getByLabelText(/senha/i);
    const buttonEntrar = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, emailAlguem);
    userEvent.type(senha, password);
    userEvent.click(buttonEntrar);

    const buttonAdicionar = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(buttonAdicionar).toBeInTheDocument();

    const valor = screen.getByTestId('value-input');
    const descricao = screen.getByTestId('description-input');

    userEvent.type(valor, '100');
    userEvent.type(descricao, 'cem dólares');
    userEvent.click(buttonAdicionar);

    const buttonExcluir = await screen.findByTestId('delete-btn');
    expect(buttonExcluir).toBeInTheDocument();

    userEvent.click(buttonExcluir);
    expect(buttonExcluir).not.toBeInTheDocument();
  });
});
