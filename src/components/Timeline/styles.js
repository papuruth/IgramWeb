import styled from 'styled-components';
import { css } from '@emotion/core';
import { Link } from 'react-router-dom';
import verified from '@/assets/images/verified.svg';

const commonDIV = styled.div`
  align-items: stretch;
  border: 0 solid #000;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  position: relative;
`;

const commonSection = styled.section`
  border: 0 solid #000;
  display: flex;
  flex-direction: row;
  position: relative;
`;

export const StyledContainer = styled(commonSection)`
  flex-flow: row nowrap;
  flex-grow: 1;
  margin: 0 auto;
  position: relative;
  width: 100%;
  flex-flow: row nowrap;
  max-width: 935px;
  padding: 50px 0;
  @media (max-width: 920px) {
    align-items: center;
    justify-content: center;
  }
`;

export const TimelineSection = styled.section`
  display: flex;
  flex-direction: column;
  margin: 2px;
`;

export const UserSuggestionSection = styled.section`
  position: fixed;
  top: 80px;
  left: 800px;
  width: 100%;
  max-width: 293px;
  height: 100vh;
`;

export const StoriesReelWrapperContainerDiv = styled.div`
  height: 120px;
  margin-bottom: 22px;
`;

export const StoriesReelContentContainerDiv = styled.div`
  height: 100%;
  width: 100%;
  max-width: 616px;
  justify-content: center;
  background: rgba(var(--d87, 255, 255, 255), 1);
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  padding: 16px 0;
  @media (max-width: 768px) {
    max-width: ${window.innerWidth}px;
  }
`;

export const StoriesReelCarouselItemWrapperDiv = styled.div`
  padding: 0 4px;
  width: 80px;
  -webkit-tap-highlight-color: transparent;
  -webkit-tap-highlight-color: transparent;
  height: 90px;
`;

export const StoriesReelCarouselButton = styled.button`
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-align-self: center;
  -ms-flex-item-align: center;
  align-self: center;
  background: 0 0;
  border: 0;
  cursor: pointer;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  padding-bottom: 0;
  padding-top: 0;
  text-align: center;
  width: 64px;
`;

export const StoriesReelCarouselItemContentDiv = styled.div`
  margin-bottom: 8px;
  margin-top: 5px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-align-self: center;
  -ms-flex-item-align: center;
  align-self: center;
  display: block;
  -webkit-box-flex: 0;
  -webkit-flex: none;
  -ms-flex: none;
  position: relative;
  flex: none;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
`;

export const StoriesReelCarouselItemCanvas = styled.canvas`
  position: absolute;
  top: -5px;
  left: -5px;
  width: 66px;
  border: ${(props) =>
    props.borderColor ? '3px solid #ff6685' : '1px solid #c7c4c4'};
  border-radius: 50%;
  height: 66px;
`;

export const StoriesReelCarouselItemImageWrapperSpan = styled.span`
  width: 56px;
  height: 56px;
  background-color: #fafafa;
  border-radius: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: block;
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  overflow: hidden;
  position: relative;
  &:after {
    border: 1px solid rgba(0, 0, 0, 0.0975);
    border-radius: 50%;
    bottom: 0;
    content: '';
    left: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
  }
`;

export const StoriesReelCarouselItemImg = styled.img`
  height: 100%;
  width: 100%;
`;
export const StoriesReelCarouselItemCaptionDiv = styled.div`
  letter-spacing: 0.01em;
  max-width: 74px;
  color: #262626;
  display: block;
  font-size: 12px;
  line-height: 14px;
  max-width: 64px;
  overflow: hidden;
  position: absolute;
  text-align: center;
  text-overflow: ellipsis;
  top: 68px;
  white-space: nowrap;
`;
export const StoriesReelCarouselItemCaptionSpan = styled.span``;

export const loaderCss = css`
  margin-top: 10px;
  position: absolute;
  left: 50%;
`;

export const BlankDIV = styled(commonDIV)`
  height: 0;
  max-width: 293px;
  position: absolute;
  right: 0;
  width: 100%;
`;

export const UserSuggestionProfileWrapper = styled.div`
  height: auto;
  margin-bottom: 10px;
  margin-top: 18px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  height: 62px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
`;

export const UserSuggestionProfileContent = styled.div`
  margin-bottom: 0;
  max-height: 141px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  height: 100%;
  margin-bottom: 12px;
  max-height: 50px;
  padding-left: 5px;
  width: 100%;
`;
export const UserSuggestionProfileImage = styled.div`
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-align-self: center;
  -ms-flex-item-align: center;
  align-self: center;
  display: block;
  -webkit-box-flex: 0;
  -webkit-flex: none;
  -ms-flex: none;
  position: relative;
  flex: none;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  width: 50px;
`;

export const UserSuggestionProfileImageCanvas = styled.canvas`
  position: absolute;
  top: -5px;
  left: -5px;
  width: 66px;
  height: 66px;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
export const UserSuggestionProfileImageSpan = styled.span`
  width: 56px;
  height: 56px;
  cursor: pointer;
  background-color: #fafafa;
  border-radius: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: block;
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  overflow: hidden;
  position: relative;
  &:after {
    border: 1px solid rgba(0, 0, 0, 0.0975);
    border-radius: 50%;
    bottom: 0;
    content: '';
    left: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
  }
`;
export const UserSuggestionProfileImageIMG = styled.img`
  height: 100%;
  width: 100%;
  -webkit-touch-callout: none;
`;
export const UserSuggestionUsernameWrapper = styled.div`
  margin-left: 20px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-flex-shrink: 1;
  -ms-flex-negative: 1;
  flex-shrink: 1;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  overflow: hidden;
`;
export const UserSuggestionUsernameContent = styled.div`
  cursor: pointer;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const UserSuggestionUsernameAnchor = styled.a`
  &,
  &:visited {
    color: #262626 !important;
    font-weight: 600;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
`;
export const UserSuggestionFullname = styled.div`
  display: inline-block;
  font-size: 12px;
  line-height: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #8e8e8e !important;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

export const UserSuggestionSuggestedUserWrapper = styled(commonDIV)`
  background-color: #fafafa;
  background-color: rgba(var(--b3f, 250, 250, 250), 1);
  margin: 0 0 12px -16px;
  width: calc(100% + 32px);
`;
export const UserSuggestionSuggestedUserHeadingWrapper = styled(commonDIV)`
  padding-bottom: 4px;
  padding-top: 4px;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 12px;
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-align-content: stretch;
  -ms-flex-line-pack: stretch;
  align-content: stretch;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
`;

export const UserSuggestionSuggestedUserHeading = styled(commonDIV)`
  -webkit-box-flex: 1;
  -webkit-flex: 1 1 auto;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  min-height: 0;
  min-width: 0;
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
export const UserSuggestionSuggestedUserHeadingContent = styled(commonDIV)`
  display: block;
  color: #8e8e8e;
  color: rgba(var(--f52,142,142,142),1);
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  margin: -3px 0 -4px;
}
`;
export const UserSuggestionSuggestedUserHeadingAnchor = styled.a`
  &,
  &:visited {
    background-color: transparent;
    color: #262626 !important;
  }
  -webkit-user-select: auto;
  -moz-user-select: auto;
  -ms-user-select: auto;
  user-select: auto;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: 0 0;
  border: 0;
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
export const UserSuggestionSuggestedUserHeadingAnchorContent = styled(
  commonDIV,
)`
  display: block;
  color: #262626;
  color: rgba(var(--i1d, 38, 38, 38), 1);
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  margin: -2px 0 -3px;
`;
export const UserSuggestionSuggestedUserContentWrapper = styled(commonDIV)`
  margin-left: 4px;
  margin-bottom: 4px;
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
export const UserSuggestionSuggestedUserContent = styled(commonDIV)`
  padding-bottom: 8px;
  padding-top: 8px;
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
  background-color: #fafafa;
`;
export const UserSuggestionSuggestedUserContent1 = styled(commonDIV)`
  height: auto;
  overflow: hidden auto;
`;
export const UserSuggestionSuggestedUserContent2 = styled(commonDIV)`
  flex-direction: column;
  padding-bottom: 0px;
  padding-top: 0px;
`;
export const UserSuggestionSuggestedUserMainDIV = styled(commonDIV)`
  padding-bottom: 8px;
  padding-top: 8px;
  padding-left: 16px;
  padding-right: 16px;
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-align-content: stretch;
  -ms-flex-line-pack: stretch;
  align-content: stretch;
`;
export const UserSuggestionSuggestedUserMainDIV1 = styled(commonDIV)`
  margin-right: 12px;
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
export const UserSuggestionSuggestedUserMainDIV1Content = styled(commonDIV)`
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-align-self: center;
  -ms-flex-item-align: center;
  align-self: center;
  display: block;
  -webkit-box-flex: 0;
  -webkit-flex: none;
  -ms-flex: none;
  flex: none;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
`;
export const UserSuggestionSuggestedUserMainDIV1Canvas = styled.canvas`
  position: absolute;
  top: -5px;
  left: -5px;
  width: 42px;
  height: 42px;
  border: 1px solid #c7c4c4;
  border-radius: 50%;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
export const UserSuggestionSuggestedUserMainDIV1Anchor = styled.a`
  width: 32px;
  height: 32px;
  cursor: pointer;
  background-color: #fafafa;
  border-radius: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: block;
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  overflow: hidden;
  position: relative;
`;
export const userSuggestedLink = css`
  width: 32px;
  height: 32px;
  cursor: pointer;
  background-color: #fafafa;
  border-radius: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: block;
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  overflow: hidden;
  position: relative;
`;
export const UserSuggestionSuggestedUserMainDIV1IMG = styled.img`
  height: 100%;
  width: 100%;
  -webkit-touch-callout: none;
`;
export const UserSuggestionSuggestedUserMainDIV2 = styled(commonDIV)`
  -webkit-box-flex: 1;
  -webkit-flex: 1 1 auto;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  min-height: 0;
  min-width: 0;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  -webkit-align-content: stretch;
  -ms-flex-line-pack: stretch;
  align-content: stretch;
`;
export const UserSuggestionSuggestedUserMainDIV2UnameWrapper = styled(
  commonDIV,
)`
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
export const UserSuggestionSuggestedUserMainDIV2UnameContent = styled(
  commonDIV,
)`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #262626;
  color: rgba(var(--i1d, 38, 38, 38), 1);
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  margin: -3px 0 -4px;
`;
export const UserSuggestionSuggestedUserMainDIV2UnameAnchor = styled(Link)``;
export const UserSuggestionSuggestedUserMainDIV2UnameAnchorDIV1 = styled(
  commonDIV,
)`
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  -webkit-align-content: stretch;
  -ms-flex-line-pack: stretch;
  align-content: stretch;
`;
export const UserSuggestionSuggestedUserMainDIV2UnameAnchorDIV2 = styled(
  commonDIV,
)`
  display: inline !important;
  margin: 0 !important;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #262626;
  color: rgba(var(--i1d, 38, 38, 38), 1);
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  margin: -3px 0 -4px;
  width: 100%;
  width: 100%;
  width: 100%;
`;
export const UserSuggestionSuggestedUserMainDIV2UnameAnchorDIV3 = styled(
  commonDIV,
)`
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-align-content: stretch;
  -ms-flex-line-pack: stretch;
  align-content: stretch;
`;
export const UserSuggestionSuggestedUserMainDIV2Verified = styled(commonDIV)`
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-align-content: stretch;
  -ms-flex-line-pack: stretch;
  align-content: stretch;
`;

export const Verified = styled.span`
  margin-left: 5px;
  background-repeat: no-repeat;
  height: 12px;
  width: 12px;
  background-image: url(${verified});
`;
export const UserSuggestionSuggestedUserMainDIV2Utype = styled(commonDIV)`
  margin-top: 8px;
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
export const UserSuggestionSuggestedUserMainDIV2UtypeDIV1 = styled(commonDIV)`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #8e8e8e;
  color: rgba(var(--f52, 142, 142, 142), 1);
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  margin: -2px 0 -3px;
`;
export const UserSuggestionSuggestedUserMainDIV3 = styled(commonDIV)`
  margin-left: 8px;
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-align-content: stretch;
  -ms-flex-line-pack: stretch;
  align-content: stretch;
`;
export const UserSuggestionSuggestedUserMainDIV3Btn = styled.button`
  color: #262626;
  border: 0;
  color: #0095f6;
  color: rgba(var(--d69, 0, 149, 246), 1);
  display: inline;
  padding: 0;
  position: relative;
  background-color: transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: 0 0;
  border: 0;
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
  font-size: 12px;
  font-size: 12px;
  font-size: 12px;
`;

export const IGDMFooterWrapper = styled.div`
  padding-top: 0;
  @media (min-width: 876px) {
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 0;
  }
`;

export const IGDMFooterNAV = styled.nav`
  margin-bottom: 16px;
  @media (min-width: 876px) {
    max-width: 100%;
  }
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
export const IGDMFooterUL = styled.ul`
  @media (min-width: 876px) {
    ${IGDMFooterWrapper} & {
      margin-right: 16px;
    }
  }
  @media (min-width: 876px) {
    ${IGDMFooterWrapper} & {
      margin-right: 0px;
    }
  }
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  margin-bottom: 3px;
  list-style: none;
`;
export const IGDMFooterLI = styled.li`
  ${IGDMFooterWrapper}, & {
    color: #c7c7c7;
    font-size: 11px;
    font-weight: 400;
    line-height: 11px;
    text-transform: none;
    margin: 0;
    display: inline-block;
    margin-bottom: 7px;
  }
  &:not(:last-of-type)::after {
    content: '\\00B7';
    margin: 0 0.25em 0 0.25em;
    font-weight: bolder;
    font-size: 11px;
  }
`;
export const IGDMFooterAnchor = styled.a`
  color: #c7c7c7 !important;
  font-size: 11px;
  font-weight: 400;
  line-height: 13px;
  text-transform: none;
  &:visited {
    color: #c7c7c7 !important;
    font-size: 11px;
    font-weight: 400;
    line-height: 13px;
    text-transform: none;
  }
`;
export const IGDMFooterSpan = styled.span`
  color: #c7c7c7;
  font-size: 11px;
  font-weight: 400;
  line-height: 13px;
  text-transform: none;
  cursor: pointer;
  display: inline-block;
  position: relative;
  vertical-align: top;
`;
export const IGDMFooterCopyright = styled.span`
  text-transform: uppercase;
  color: #c7c7c7;
  font-size: 11px;
  font-weight: 400;
  line-height: 13px;
  text-transform: none;
  color: #8e8e8e;
`;

export const StoriesContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  height: 100%;
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  align-items: center;
  animation-name: fadeIn;
  animation-duration: 0.4s;
  animation-timing-function: ease-out;
  bottom: 0;
  background: #262626;
  z-index: 1300;
  @media (max-width: 570px) {
    display: flex;
  }
`;

export const StoriesContainerCloseButton = styled.button`
  ${StoriesContainer}, & {
    background: transparent;
    color: #fff;
    top: 30px;
    right: 30px;
    @media (max-width: 570px) {
      position: initial;
    }
  }
`;

export const StoriesContainerContent = styled.div`
  ${StoriesContainer}, & {
    display: flex;
    margin: 0 auto;
    position: inherit;
    align-items: center;
    justify-content: center;
    width: 60%;
    @media (max-width: 570px) {
      position: initial;
    }
  }
`;
