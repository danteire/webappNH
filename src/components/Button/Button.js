import React from 'react';
import { ButtonContainer } from './Button.styles';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  onClick, 
  type = 'button',
  className = '',
  ...props 
}) => {
  return (
    <ButtonContainer
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={className}
      {...props}
    >
      {children}
    </ButtonContainer>
  );
};

export default Button;
