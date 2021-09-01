import styled from 'styled-components';
import { css } from '@emotion/core';

export const StyledContainer = styled.div`
  align-items: center;
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;

export const loaderCss = css`
  display: block;
  margin: 0 auto;
`;

export const imageUploadCssLoader = css`
  display: block;
  margin: 0 auto;
`;

export const renderUserListLoader = css`
  position: absolute;
  left: 38%;
  top: 40%;
`;

export const pendingRequestWrapper = css`
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
`;

export const pendingRequestTxt = css`
  color: #8e8e8e;
  padding: 20px 16px;
`;

export const pendingChatBox = css`
  text-align: center;
  flex-direction: column;
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

export const pendingChatBoxWelcomeHeading = css`
  font-size: 22px;
`;
export const pendingChatBoxWelcomeContent = css`
  color: #8e8e8e;
  font-style: italic;
  font-weight: 400;
`;

export const pendingMessageWrapper = css`
  border-top: 1px solid rgba(0, 0, 0, 0.0975);
`;
export const pendingMessageContent = css`
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const pendingMessageContentTitle = css`
  display: inline;
  margin: 0;
  display: block;
  color: #000;
  font-size: 14px;
  line-height: 14px;
  margin: 2px 0 -3px;
`;

export const pendingMessageContentInfo = css`
  color: #8e8e8e;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  margin: 5px 0 -4px;
`;
export const pendingMessageContentNote = css`
  text-align: center;
  display: block;
  color: #8e8e8e;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  margin: 12px 0 -3px;
`;
export const pendingRequestActions = css`
  border-top: 1px solid rgba(0, 0, 0, 0.0975);
  display: flex;
  padding: 10px;
`;
export const pendingRequestListHeader = css`
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 10px;
`;
export const pendingRequestIconBack = css``;
export const pendingRequestTitle = css`
  flex: 1 1 auto;
  font-weight: 600;
  text-align: center;
`;

export const pendingListActionContent = css`
  padding: 10px;
  position: absolute;
  bottom: 0;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.0975);
  left: 0;
  width: 100%;
`;
