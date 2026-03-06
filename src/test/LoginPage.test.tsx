import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import LoginPage from '../pages/LoginPage';
import { AuthContext } from '../context/AuthContext';

const mockLogin = vi.fn();

const renderLoginPage = () => render(
  <BrowserRouter>
    <AuthContext.Provider value={{
      user: null,
      isLoading: false,
      isAdmin: false,
      login: mockLogin,
      logout: vi.fn(),
    }}>
      <LoginPage />
    </AuthContext.Provider>
  </BrowserRouter>
);

describe('LoginPage', () => {
  it('renders login form', () => {
    renderLoginPage();
    expect(screen.getByPlaceholderText('Enter your username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('calls login with correct credentials on submit', async () => {
    mockLogin.mockResolvedValueOnce(undefined);
    renderLoginPage();

    fireEvent.change(screen.getByPlaceholderText('Enter your username'), {
      target: { value: 'viewer_recruiter' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'viewer123' }
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        userId: 'viewer_recruiter',
        password: 'viewer123'
      });
    });
  });

  it('shows error message on failed login', async () => {
    mockLogin.mockRejectedValueOnce(new Error('Invalid credentials'));
    renderLoginPage();

    fireEvent.change(screen.getByPlaceholderText('Enter your username'), {
      target: { value: 'wrong' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'wrong' }
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });
});