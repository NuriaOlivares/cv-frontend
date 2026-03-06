import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ContactSection from '../components/cv/ContactSection';

vi.mock('../api/cvApi', () => ({
    cvApi: {
        contactForm: vi.fn(),
    }
}));

import { cvApi } from '../api/cvApi';

describe('ContactSection', () => {
  it('renders contact form', () => {
    render(<ContactSection />);
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/i'd like to discuss/i)).toBeInTheDocument();
  });

  it('shows success message after sending', async () => {
    (cvApi.contactForm as any).mockResolvedValueOnce({});
    render(<ContactSection />);

    fireEvent.change(screen.getByPlaceholderText('Your name'), {
      target: { value: 'John Recruiter' }
    });
    fireEvent.change(screen.getByPlaceholderText('your@email.com'), {
      target: { value: 'john@company.com' }
    });
    fireEvent.change(screen.getByPlaceholderText(/i'd like to discuss/i), {
      target: { value: 'I would like to discuss an opportunity' }
    });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument();
    });
  });

  it('shows error message on failure', async () => {
    (cvApi.contactForm as any).mockRejectedValueOnce(new Error('Network error'));
    render(<ContactSection />);

    fireEvent.change(screen.getByPlaceholderText('Your name'), {
      target: { value: 'John' }
    });
    fireEvent.change(screen.getByPlaceholderText('your@email.com'), {
      target: { value: 'john@company.com' }
    });
    fireEvent.change(screen.getByPlaceholderText(/i'd like to discuss/i), {
      target: { value: 'Hello' }
    });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/failed to send/i)).toBeInTheDocument();
    });
  });
});