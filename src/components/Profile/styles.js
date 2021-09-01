import styled from 'styled-components';
import { css } from '@emotion/core';

export const StyledContainer = styled.section`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  padding: 50px 0;
  width: 100%;
`;

export const MainContainer = styled.main`
  background-color: rgba(var(--b3f, 250, 250, 250), 1);
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  -webkit-box-ordinal-group: 5;
  -webkit-order: 4;
  -ms-flex-order: 4;
  order: 4;
`;

export const MainContainerWrapper = styled.div`
  padding: 30px 20px 0;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  padding: 60px 20px 0;
  width: calc(100% - 40px);
  margin-bottom: 0;
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  margin: 0 auto 30px;
  max-width: 935px;
  width: 100%;
`;
export const accountProfileHeader = css`
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  display: flex;
  flex-direction: row;
`;
export const accountProfilePicWrapper = css`
  -webkit-flex-basis: 0;
  -ms-flex-preferred-size: 0;
  flex-basis: 0;
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  margin-right: 30px;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
`;

export const accountProfileContent = css`
  height: 150px;
  width: 150px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

export const accountProfileContent1 = css`
  background-color: #fafafa;
  border-radius: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;
`;

export const accountProfileContentBtn = css`
  border: 0;
  cursor: pointer;
  padding: 0;
  height: 100%;
  width: 100%;
`;

export const accountProfileImage = css`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

export const profilePicInput = css`
  display: none !important;
`;

export const accountDetailsWrapper = css`
  -webkit-flex-basis: 30px;
  -ms-flex-preferred-size: 30px;
  flex-basis: 30px;
  -webkit-box-flex: 2;
  -webkit-flex-grow: 2;
  -ms-flex-positive: 2;
  flex-grow: 2;
  color: #262626;
  color: rgba(var(--i1d, 38, 38, 38), 1);
  -webkit-flex-shrink: 1;
  -ms-flex-negative: 1;
  flex-shrink: 1;
  min-width: 0;
`;
export const accountDetailsConfigWrapper = css`
  margin-bottom: 20px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  display: flex;
  align-items: center;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-flex-shrink: 1;
  -ms-flex-negative: 1;
  flex-shrink: 1;
  min-width: 0;
`;
export const accountDetailsUsername = css`
  color: rgba(var(--i1d, 38, 38, 38), 1);
  font-weight: 300;
  font-size: 28px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 32px;
  margin: -5px 0 -6px;
`;

export const accountDetailsVerified = css`
  display: inline-block;
  margin-left: 5px;
  margin-top: 4px;
  background-repeat: no-repeat;
  height: 25px;
  width: 25px;
  background-image: url('${require('@/assets/images/verified.svg')}');
`;

export const accountDetailsEditProfile = css`
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  margin-left: 20px;
  display: block;
`;
export const accountDetailsEditProfileBtn = css`
  border: 1px solid #dbdbdb;
  color: #262626;
  width: 100%;
  border-radius: 4px;
  position: relative;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: 0 0;
  background-color: transparent;
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
export const accountDetailsFollowWrapper = css`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  margin-left: 20px;
`;
export const accountDetailsFollowBtnWrapper = css`
  -webkit-box-flex: 1;
  -webkit-flex: 1 0 auto;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
  display: block;
  position: relative;
  margin-right: 8px;
`;
export const accountDetailsFollowBtnContent = css`
  padding: 0 24px;
  cursor: pointer;
  background: #0095f6;
  border-color: #0095f6;
  color: #fff;
  -webkit-appearance: none;
  border-radius: 3px;
  border-style: solid;
  border-width: 1px;
  font-size: 14px;
  font-weight: 600;
  line-height: 26px;
  outline: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  white-space: nowrap;
  width: 100%;
`;
export const accountDetaildFollowDownBtnWrapper = css`
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  position: relative;
  width: 34px;
  display: block;
`;
export const accountDetailsFollowDownBtnContent = css`
  cursor: pointer;
  background: #0095f6;
  border-color: #0095f6;
  color: #fff;
  -webkit-appearance: none;
  border-radius: 3px;
  border-style: solid;
  border-width: 1px;
  font-size: 14px;
  font-weight: 600;
  line-height: 26px;
  outline: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  white-space: nowrap;
  width: 100%;
`;
export const accountDetailsSettingIconWrapper = css`
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  margin-left: 5px;
`;
export const accountDetailsSettingIconContent = css`
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background: 0 0;
  border: 0;
  cursor: pointer;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  padding: 8px;
`;
export const accountDetailsFollowingListWrapper = css`
  margin-bottom: 20px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  list-style: none;
  -ms-flex-direction: row;
  flex-direction: row;
`;
export const accountDetailsListContent = css`
  font-size: 16px;
  margin-right: 40px;
`;
export const accountDetailsListContentChild = css`
  color: inherit;
`;
export const accountDetailsListContentChildSpan = css`
  color: rgba(var(--i1d, 38, 38, 38), 1);
  font-weight: 600;
`;
export const accountDetailsInfoWrapper = css`
  font-size: 16px;
  line-height: 24px;
  word-wrap: break-word;
  display: block;
`;
export const accountDetailsInfoName = css`
  display: inline;
  font-weight: 600;
  font-size: 1.2rem !important;
`;

export const accountDetailsFollowedByWrapper = css`
  color: #262626;
  font-weight: 500;
`;
export const accountDetailsFollowedByContent = css`
  color: #8e8e8e;
  display: block;
  font-size: 12px;
  line-height: 14px;
  margin-top: 14px;
`;
export const accountDetailsFollowedUser = css`
  color: #262626;
  font-weight: 500;
`;

/**
 * @description Private Account Styling
 */
export const PrivateAccountWrapper = styled.div`
  border-top: 1px solid #dbdbdb;
`;

export const PrivateAccountContainer = styled.article`
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
`;

export const PrivateAccountBoxWrapper = styled.div`
  border: 1px solid #efefef;
  border-radius: 3px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #fff;
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
`;

export const PrivateAccountBoxContent = styled.div`
  max-width: 230px;
`;
export const PrivateAccountBoxContentH2 = styled.h2`
  color: #262626;
  font-size: 14px;
  line-height: 24px;
  font-weight: 600;
`;

export const PrivateAccountBoxContentDiv = styled.div`
  margin-top: 13px;
  color: #262626;
  font-size: 14px;
  line-height: 24px;
`;

export const PrivateAccountSuggestedUserWrapper = styled.div`
  padding-bottom: 20px;
  padding-top: 20px;
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
  background-color: #fafafa;
`;

export const PrivateAccountSuggestedUserContent = styled.div`
  padding: 20px 0;
`;

export const SuggestionForYouDiv = styled.div`
  margin: 0 24px 12px 24px;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
`;

export const SuggestionForYouSpan = styled.div`
  color: #8e8e8e;
  color: rgba(var(--f52, 142, 142, 142), 1);
  -webkit-box-flex: 1;
  -webkit-flex: 1 0 auto;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
  margin-right: 12px;
  display: block;
`;

export const CarouselContentWrapperDiv = styled.div`
  width: 200px;
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-align-content: stretch;
  -ms-flex-line-pack: stretch;
  align-content: stretch;
`;
export const CarouselContentDiv = styled.div`
  width: 176px;
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
export const CarouselMainDivBtn = styled.div`
  width: 176px;
  border-radius: 3px;
  background: #fff;
  border: 1px solid #dbdbdb;
`;
export const CarouselContentInnerDiv = styled.div`
  width: 100%;
  padding: 20px;
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-align-content: stretch;
  -ms-flex-line-pack: stretch;
  align-content: stretch;
`;
export const CarouselContentPictureWrapperDiv = styled.div`
  margin-bottom: 15px;
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
export const CarouselContentPictureContentAnchor = css`
  width: 54px;
  height: 54px;
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
export const CarouselContentImg = styled.img`
  height: 100%;
  width: 100%;
`;
export const CarouselContentUsernameDiv = styled.div`
  width: 100%;
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
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  -webkit-align-content: stretch;
  -ms-flex-line-pack: stretch;
  align-content: stretch;
`;
export const CarouselContentUsernameAnchor = css`
  color: #262626;
  font-weight: 600;
  white-space: nowrap;
  padding-left: 5px;
  margin-left: -5px;
  margin-bottom: -10px;
  margin-top: -10px;
  overflow: hidden;
  padding-bottom: 10px;
  padding-top: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const CarouselContentFullnameDiv = styled.div`
  width: 100%;
  margin-bottom: 8px;
  min-height: 24px;
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
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
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
export const CarouselContentFullnameSpan = styled.span`
  color: #8e8e8e;
  text-align: center;
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  margin-bottom: -10px;
  margin-top: -10px;
  overflow: hidden;
  padding-bottom: 10px;
  padding-top: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const CarouselContentFollowButton = styled.button`
  border: 1px solid transparent;
  background-color: #0095f6;
  width: 100%;
  border-radius: 4px;
  color: #fff;
  position: relative;
  -webkit-appearance: none;
  -moz-appearance: none;
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
`;

export const HighlightWrapperContainerDiv = styled.div`
  height: 130px;
  margin-bottom: 44px;
`;
export const HighlightContentContainerDiv = styled.div`
  height: 100%;
  width: 100%;
`;

export const HighlightCarouselItemWrapperDiv = styled.div`
  width: 125px;
`;
export const HighlightCarouselItemContentDiv = styled.div`
  padding: 10px 15px;
  width: 115px;
`;
export const HighlightCarouselItemImageWrapperDiv = styled.div`
  -webkit-align-self: center;
  -ms-flex-item-align: center;
  align-self: center;
  display: block;
  -webkit-box-flex: 0;
  -webkit-flex: none;
  -ms-flex: none;
  flex: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
`;
export const HighlightCarouselItemCanvas = styled.canvas`
  position: absolute;
  top: -5px;
  left: -5px;
  width: 87px;
  height: 87px;
`;
export const HighlightCarouselItemImageContentDiv = styled.div`
  width: 77px;
  height: 77px;
  background-color: #fafafa;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
`;
export const HighlightCarouselItemImg = styled.img`
  height: 100%;
  width: 100%;
`;
export const HighlightCarouselItemCaptionDiv = styled.div`
  font-weight: 600;
  padding-top: 15px;
  cursor: pointer;
  display: block;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;
export const HighlightCarouselItemCaptionSpan = styled.span``;

export const loaderCss = css`
  margin-top: 10px;
  position: absolute;
  left: 50%;
`;

export const ProfilePhotoLoaderDiv = styled.div`
  position: absolute;
  top: 0;
  background: #00000047;
  left: 0;
  width: 100%;
  height: 100%;
`;
