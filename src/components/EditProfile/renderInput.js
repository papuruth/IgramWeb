import React from 'react';
import { StyledInputComponent } from './styles';

export const Input = ({
  input_type,
  input_value,
  input_name,
  input_aria_required,
  on_change,
  input_id,
  input_read_only,
  input_checked,
}) => (
  <StyledInputComponent
    autoComplete="off"
    readOnly={!!input_read_only}
    type={input_type}
    value={input_value}
    name={input_name}
    aria_required={input_aria_required}
    onChange={on_change}
    id={input_id}
    checked={!!input_checked}
  />
);
