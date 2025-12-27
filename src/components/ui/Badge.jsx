import clsx from 'clsx';

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className,
  ...props
}) => {
  const variants = {
    default: 'bg-dark-surface text-white border border-dark-border',
    success: 'bg-status-green/20 text-status-green border border-status-green/30',
    warning: 'bg-accent-yellow/20 text-accent-yellow border border-accent-yellow/30',
    danger: 'bg-primary-red/20 text-primary-red border border-primary-red/30',
    info: 'bg-primary-blue/20 text-primary-blue border border-primary-blue/30',
    primary: 'bg-primary-blue/20 text-primary-blue border border-primary-blue/30',
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };
  
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-md font-medium',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

