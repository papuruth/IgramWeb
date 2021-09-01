import React from 'react';
import { StyledLabelComponent } from './styles';

export const Label = ({ label, _for }) => {
  return <StyledLabelComponent htmlFor={_for}>{label}</StyledLabelComponent>;
};
