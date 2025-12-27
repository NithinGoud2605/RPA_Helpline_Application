import clsx from 'clsx';

export const Container = ({ children, className, size = 'default', ...props }) => {
  const sizes = {
    default: 'max-w-7xl',
    sm: 'max-w-4xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[1400px]',
    full: 'max-w-full',
  };
  
  return (
    <div
      className={clsx(
        'mx-auto px-4 sm:px-6 lg:px-8',
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

