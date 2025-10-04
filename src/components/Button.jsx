import { Link } from 'react-router-dom';

export const Button = ({ 
  children, 
  variant = 'primary', 
  type = 'button',
  to,
  onClick,
  className = '',
  ...props 
}) => {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
  };

  const buttonStyles = `${baseStyles} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={buttonStyles} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button 
      type={type} 
      className={buttonStyles}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};