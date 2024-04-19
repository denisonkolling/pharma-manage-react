import React from 'react';
import { styled } from '@mui/system';
import { Box, IconButton } from '@mui/material';

const CustomBox = styled(Box)({
  position: 'absolute',
  top: '10px',
  left: '10px',
  backgroundColor: (props) => props.theme.palette.primary.main,
  width: '50px',
  height: '50px',
  borderRadius: '5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1,
});

const CustomIconButton = styled(IconButton)({
  color: (props) => props.theme.palette.common.white,
});

const CustomIconBox = ({ children }) => {
  return (
    <CustomBox>
      <CustomIconButton>
        {children}
      </CustomIconButton>
    </CustomBox>
  );
};

export default CustomIconBox;
