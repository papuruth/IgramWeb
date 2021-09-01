import styled from 'styled-components';

const commonDIV = styled.div`
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  border: 0 solid #000;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  margin: 0;
  padding: 0;
  position: relative;
`;

export const StyledContainer = styled.div`
  top: 25%;
  position: absolute;
  min-width: 100%;
`;

export const ORWrapper = styled(commonDIV)`
  margin: 10px 40px 18px;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
`;
export const ORLoginDivider = styled(commonDIV)`
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  -webkit-flex-shrink: 1;
  -ms-flex-negative: 1;
  flex-shrink: 1;
  background-color: #dbdbdb;
  background-color: rgba(var(--b38, 219, 219, 219), 1);
  height: 1px;
  position: relative;
  top: 0.45em;
`;
export const ORLoginText = styled(commonDIV)`
  color: #8e8e8e;
  color: rgba(var(--f52, 142, 142, 142), 1);
  -webkit-box-flex: 0;
  -webkit-flex-grow: 0;
  -ms-flex-positive: 0;
  flex-grow: 0;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  font-size: 13px;
  font-weight: 600;
  line-height: 15px;
  margin: 0 18px;
  text-transform: uppercase;
`;

export const LoginFBWrapper = styled(commonDIV)`
  margin-right: 40px;
  margin-left: 40px;
  margin-bottom: 8px;
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  -webkit-align-content: stretch;
  -ms-flex-line-pack: stretch;
  align-content: stretch;
`;
export const LoginFBBtn = styled.button`
  border: 0;
  color: #0095f6;
  display: inline;
  padding: 0;
  position: relative;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  font-weight: 600;
  padding: 5px 9px;
  text-align: center;
  text-transform: inherit;
  text-overflow: ellipsis;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: auto;
`;

export const LoginFBText = styled.span`
  color: #385185;
  margin-left: 5px;
  vertical-align: middle;
`;
