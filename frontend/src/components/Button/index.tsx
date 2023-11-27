import React from 'react';
import './Button.css';

const STYLES: string[] = [];
const SIZES: string[] = [];

type ButtonComponent = {
  children?: JSX.Element,
  type?: string,
  buttonStyle?: string,
  buttonSize?: string,
  disableButton?: boolean,
  buttonId?: string,
  value?: any,
  onClick: () => void
};

const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  disableButton,
  buttonId,
  value
}: ButtonComponent) => {
  // const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[ 0 ];
  // const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[ 0 ];

  return (
    <div id={buttonId} className=''>
      <button
        // className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        // type={type}
        disabled={disableButton || false}
        value={value}
      >
        {children}
      </button>
    </div>
  )
};

export default Button;
