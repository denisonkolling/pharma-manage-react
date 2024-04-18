import React from 'react';
import Button from '@mui/material/Button';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  && {
    background-color: ${({ bgColor }) => bgColor || 'transparent'};
    color: ${({ textColor }) => textColor || '#ffffff'};
    border-color: ${({ borderColor }) => borderColor || '#cab6fa'};
    padding: 10px 20px;
    transition: border-color 0.3s, background-color 0.3s;

    &:hover {
      border-color: ${({ hoverBorderColor }) => hoverBorderColor || '#ab9be3'};
      background-color: ${({ hoverBgColor }) => hoverBgColor || 'transparent'};
      color: ${({ hoverTextColor }) => hoverTextColor || '#ffffff'};
    }

    &:focus {
      border-color: ${({ borderColor }) => borderColor || '#cab6fa'};
    }
  }
`;

const CustomButton = ({ text, variant, sx, onClick, ...props }) => {
  const bgColor = variant === 'contained' ? '#cab6fa' : 'transparent'; //background para contained
  const textColor = variant === 'contained' ? '#ffffff' : '#cab6fa'; //texto para contained e outlined
  const borderColor = variant === 'outlined' ? '#cab6fa' : 'transparent'; // border para outlined
  const hoverBgColor = variant === 'contained' ? '#ab9be3' : '#e4dbfa'; // background hover para outlined
  const hoverBorderColor = variant === 'outlined' ? '#ab9be3' : 'transparent';  //borda hover para outlined
  const hoverTextColor = variant === 'outlined' ? '#7d66ce' : '#ffffff'; // cor do texto para outlined em hover

  return (
    <StyledButton
      variant={variant}
      onClick={onClick}
      sx={sx}
      bgColor={bgColor}
      textColor={textColor}
      borderColor={borderColor}
      hoverBgColor={hoverBgColor}
      hoverBorderColor={hoverBorderColor}
      hoverTextColor={hoverTextColor}
      {...props} 
    >
      {text}
    </StyledButton>
  );
};

export default CustomButton;