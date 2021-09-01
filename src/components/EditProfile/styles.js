import styled from 'styled-components';
import { css } from '@emotion/core';

const commonDiv = styled.div`
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0;
  padding: 0;
  position: relative;
`;

const commonArticle = styled.div`
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0;
  padding: 0;
  position: relative;
`;
export const EditAccountSection = styled.section`
  margin: 45px auto 0;
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
  min-height: 100%;
  overflow: hidden;
  @media (max-width: 736px) {
    margin: 0;
  }
`;

export const EditAccountMainContainer = styled.main`
  background-color: #fafafa;
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  display: flex;
  -webkit-box-ordinal-group: 5;
  -webkit-order: 4;
  -ms-flex-order: 4;
  order: 4;
`;

export const ContentAreaDiv = styled.div`
  margin: 30px auto 0;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
  border-radius: 3px;
  margin: 60px auto 0;
  max-width: 935px;
  overflow: hidden;
  display: flex;
  width: 100%;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  -webkit-box-pack: stretch;
  -webkit-justify-content: stretch;
  -ms-flex-pack: stretch;
  justify-content: stretch;
  -webkit-box-flex: 1;
`;

export const DrawerList = styled.ul`
  border-right: 1px solid #dbdbdb;
  border-right: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
  -webkit-flex-basis: 236px;
  -ms-flex-preferred-size: 236px;
  flex-basis: 236px;
  -webkit-box-flex: 0;
  -webkit-flex-grow: 0;
  -ms-flex-positive: 0;
  flex-grow: 0;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  list-style: none;
  margin: 0;
  @media (max-width: 735px) {
    display: none;
  }
`;

export const ListItem = styled.li``;
export const ListItemTextLink = css`
  display: block;
  font-size: 16px;
  height: 100%;
  line-height: 20px;
  padding: 16px 16px 16px 30px;
  width: calc(100% - 48px);
  &:visited {
    color: #262626;
  }
`;

export const DrawerListActionArea = styled(commonArticle)`
  -webkit-flex: 1 1 400px;
  -ms-flex: 1 1 400px;
  flex: 1 1 400px;
  display: flex;
  min-width: 50px;
  -webkit-box-flex: 1;
`;

export const ProfilePhotoContainerDiv = styled(commonDiv)`
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  margin: 32px 0 0;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  display: flex;
`;

export const ProfilePhotoWrapperDiv = styled(commonDiv)`
  height: 38px;
  width: 38px;
  @media (min-width: 736px) {
    margin: 2px 32px 0 124px;
  }
  @media (max-width: 735px) {
    margin: 2px 20px 0;
  }
`;
export const ProfilePhotoContent = styled(commonDiv)`
  background-color: #fafafa;
  border-radius: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  width: 100%;
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
export const ProfilePhotoButton = styled.button`
  border: 0;
  cursor: pointer;
  height: 100%;
  padding: 0;
  width: 100%;
`;
export const ProfilePhotoImg = styled.img`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;
export const ProfilePhotoUploadContainer = styled(commonDiv)``;
export const ProfilePhotoUploadForm = styled.form``;
export const ProfilePhotoInput = styled.input`
  display: none !important;
`;

export const ProfileInfoContent = styled(commonDiv)`
  -webkit-box-flex: 0;
  -webkit-flex: 0 1 auto;
  -ms-flex: 0 1 auto;
  flex: 0 1 auto;
  margin-right: 20px;
  overflow-x: hidden;
`;
export const ProfileUsername = styled.h1`
  font-size: 20px;
  line-height: 22px;
  margin-bottom: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 400;
`;
export const ProfileUpdateButton = styled.button`
  text-align: left;
  border: 0;
  color: #0095f6;
  display: inline;
  padding: 0;
  position: relative;
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
  padding: 5px 0px;
  text-align: center;
  text-transform: inherit;
  text-overflow: ellipsis;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: auto;
`;
export const EditProfileForm = styled.form`
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  margin-bottom: 16px;
  margin-top: 16px;
`;

export const StyledFormGroup = styled(commonDiv)`
  @media (min-width: 736px) {
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
  }
  margin-bottom: 16px;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
`;
export const FormLabelContainer = styled.aside`
  @media (min-width: 736px) {
    padding-left: 32px;
    padding-right: 32px;
    text-align: right;
  }
  @media (max-width: 735px) {
    -webkit-flex-basis: 25px;
    -ms-flex-preferred-size: 25px;
    flex-basis: 25px;
    padding: 0 20px;
  }
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #262626;
  color: rgba(var(--i1d, 38, 38, 38), 1);
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 194px;
  -ms-flex: 0 0 194px;
  flex: 0 0 194px;
  font-size: 16px;
  font-weight: 600;
  line-height: 18px;
  margin-top: 6px;
`;
export const StyledLabelComponent = styled.label``;
export const FormInputContainer = styled(commonDiv)`
  @media (min-width: 736px) {
    -webkit-flex-basis: 355px;
    -ms-flex-preferred-size: 355px;
    flex-basis: 355px;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    padding-right: 60px;
  }
  @media (max-width: 735px) {
    -webkit-flex-basis: auto;
    -ms-flex-preferred-size: auto;
    flex-basis: auto;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    padding: 0 20px;
  }
  color: #262626;
  color: rgba(var(--i1d, 38, 38, 38), 1);
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  font-size: 16px;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
`;
export const StyledInputComponent = styled.input`
  background: 0 0;
  border: 1px solid #dbdbdb;
  border: 1px solid rgba(var(--ca6, 219, 219, 219), 1);
  border-radius: 3px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #262626;
  color: rgba(var(--i1d, 38, 38, 38), 1);
  -webkit-box-flex: 0;
  font-size: 16px;
  max-width: 355px;
  height: 32px;
  padding: 0 10px;
  -webkit-appearance: none;
`;
export const FormGenderContainer = styled(commonDiv)`
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  flex-direction: row;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-align-content: stretch;
  -ms-flex-line-pack: stretch;
  align-content: stretch;
`;

export const GenderContainer = styled(commonDiv)`
  max-width: 355px;
  -webkit-box-flex: 1;
  -webkit-flex: 1 1 auto;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  min-height: 0;
  min-width: 0;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  flex-direction: row;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
  -webkit-align-content: stretch;
  -ms-flex-line-pack: stretch;
  align-content: stretch;
  justify-content: flex-start;
`;
export const GenderButton = styled.button`
  color: #262626;
  border: 0;
  background-color: transparent;
  display: inline;
  padding: 0;
  width: 100%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
  font-weight: 600;
  text-align: center;
  text-transform: inherit;
  text-overflow: ellipsis;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: relative;
`;
export const GenderInput = styled(StyledInputComponent)`
  @media (max-width: 736px) {
    width: 100%;
  }
  width: 355px;
`;
export const PersonalInfoHelpText = styled(commonDiv)`
  width: 100%;
  max-width: 355px;
  margin-top: 16px;
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
export const PersonalInfoHead = styled(commonDiv)`
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
}
`;
export const PersonalInfoHeadText = styled.h1`
  color: #8e8e8e;
  font-size: 14px;
  font-weight: 600;
`;
export const PersonalInfoMessage = styled(commonDiv)`
  display: block;
  color: #8e8e8e;
  color: rgba(var(--f52, 142, 142, 142), 1);
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  margin: -2px 0 -3px;
`;

export const submitFormsExtraCss = css`
  @media (max-width: 735px) {
    display: none;
  }
`;

export const SubmitFormButtonContainer = styled(commonDiv)`
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  margin-top: 16px;
  @media (max-width: 735px) {
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    width: 100%;
  }
`;

export const SubmitFormButton = styled.button`
  border: 1px solid transparent;
  background-color: #0095f6;
  border-radius: 4px;
  color: #fff;
  position: relative;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
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
  &:disabled {
    background-color: rgba(0, 149, 246, 0.3);
    opacity: 1;
  }
`;
export const AccountDisableButton = styled.button`
  border: 0;
  color: #0095f6;
  display: inline;
  padding: 0;
  position: relative;
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
  @media (min-width: 736px) {
    margin-left: 105px;
  }
`;

export const ProfilePhotoLoaderDiv = styled.div`
  position: absolute;
  top: -6px;
  background: #00000047;
  left: -1px;
  width: 100%;
  height: 100%;
`;

export const genderRootStyle = css`
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

export const GenderChooseSubmitButton = styled(commonDiv)`
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  padding-top: 16px;
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

export const genderSubmitCss = css`
  border: 1px solid transparent;
  background-color: #0095f6;
  padding: 12px 18px;
  border-radius: 4px;
  color: #fff;
  position: relative;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  font-weight: 600;
  text-align: center;
  text-transform: inherit;
  text-overflow: ellipsis;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: auto;
`;
