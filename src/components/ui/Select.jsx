import clsx from 'clsx';

export const Select = ({
  label,
  error,
  className,
  id,
  children,
  ...props
}) => {
  const inputId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          {label}
        </label>
      )}
      <select
        id={inputId}
        className={clsx(
          'w-full px-4 py-2 bg-dark-surface border rounded-md',
          'text-gray-100',
          'focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error
            ? 'border-primary-red focus:ring-primary-red'
            : 'border-dark-border',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="mt-1 text-sm text-primary-red">{error}</p>
      )}
    </div>
  );
};

