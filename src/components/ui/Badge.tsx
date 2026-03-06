interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'primary';
  }
  
  export default function Badge({ children, variant = 'default' }: BadgeProps) {
    const variants = {
      default: 'bg-surface border border-border text-text-muted',
      primary: 'bg-primary/10 border border-primary/20 text-primary',
    };
  
    return (
      <span className={`text-xs px-2 py-0.5 rounded-full ${variants[variant]}`}>
        {children}
      </span>
    );
  }