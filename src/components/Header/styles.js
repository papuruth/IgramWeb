import styled from 'styled-components';
import { css } from '@emotion/core';
import colors from '@/styles/colors';

export const StyledContainer = styled.div`
  align-items: center;
  background-color: ${colors.secundary};
  border-radius: 3px;
  color: ${colors.light};
  display: flex;
  flex-direction: column;
  max-width: 500px;
  padding: 50px 0;
  width: 100%;
`;

export const loaderCss = css`
  display: block;
  margin: 0 auto;
  position: absolute;
  top: 8px;
  right: 8px;
`;
