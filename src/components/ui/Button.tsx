interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit';
    variant?: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
    className?: string;
  }
  
  export default function Button({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    disabled,
    className = ''
  }: ButtonProps) {
    const variants = {
      primary: 'bg-primary hover:bg-primary/90 text-text',
      secondary: 'border border-border text-text-muted hover:text-text hover:border-white',
      danger: 'border border-red-400/30 text-red-400 hover:border-red-300 hover:text-red-300',
    };
  
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  }