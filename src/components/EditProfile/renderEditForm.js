/** @jsx jsx */
import { loaderAction } from '@/redux/Loader/loaderAction';
import { removeUserProfilePictureAction, saveProfileAction, updateUserProfilePictureAction } from '@/redux/user/userAction';
import { jsx } from '@emotion/core';
import { Button, Dialog, DialogTitle, Divider, List, ListItem, ListItemText } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { withStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import _ from 'lodash';
import React from 'react';
import { FadeLoader } from 'react-spinners';
import validator from 'validator';
import { Input } from './renderInput';
import { Label } from './renderLabel';
import { EditProfileForm, FormInputContainer, FormLabelContainer, GenderButton, GenderChooseSubmitButton, GenderInput, genderRootStyle, genderSubmitCss, PersonalInfoHead, PersonalInfoHeadText, PersonalInfoHelpText, PersonalInfoMessage, ProfileInfoContent, ProfilePhotoButton, ProfilePhotoContainerDiv, ProfilePhotoContent, ProfilePhotoImg, ProfilePhotoInput, ProfilePhotoLoaderDiv, ProfilePhotoUploadContainer, ProfilePhotoUploadForm, ProfilePhotoWrapperDiv, ProfileUpdateButton, ProfileUsername, StyledFormGroup, SubmitFormButton, SubmitFormButtonContainer, submitFormsExtraCss } from './styles';

const useStyles = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  listTxtUpload: {
    color: '#0095f6',
    fontSize: '14px',
    fontWeight: '700!important',
    textAlign: 'center',
  },
  listTxtRemove: {
    color: '#ed4956',
    fontSize: '14px',
    fontWeight: '700!important',
    textAlign: 'center',
  },
  listTxtBorder: {
    borderTop: '1px solid #dbdbdb',
  },
  listTxtCancel: {
    fontSize: '14px',
    textAlign: 'center',
  },
  txtPosition: {
    textAlign: 'center',
    borderRadius: '12px',
  },
  genderRoot: {
    backgroundColor: '#fff',
    '-webkit-animation': '.1s ease-out',
    animation: '.1s ease-out',
    borderRadius: '12px',
    '-webkit-flex-shrink': 1,
    '-ms-flex-negative': 1,
    flexShrink: 1,
    margin: '20px',
    maxHeight: 'calc(100% - 40px)',
    overflow: 'hidden',
    width: '548px!important',
  },
  genderTitle: {
    '-webkit-box-align': 'center',
    '-webkit-align-items': 'center',
    '-ms-flex-align': 'center',
    alignItems: 'center',
    display: 'flex',
    '-webkit-box-flex': 1,
    '-webkit-flex-grow': 1,
    '-ms-flex-positive': 1,
    flexGrow: 1,
    fontSize: '16px',
    fontWeight: 600,
    '-webkit-box-pack': 'center',
    '-webkit-justify-content': 'center',
    '-ms-flex-pack': 'center',
    justifyContent: 'center',
    lineHeight: '24px',
    textAlign: 'center',
  },
  genderForm: {
    padding: '16px',
  },

  genderRadio: {
    padding: '3px',
    marginLeft: '9px',
  },
  genderCustomInput: {
    left: '32px',
    padding: '6px 6px 7px',
    maxWidth: '176px',
    border: '1px solid #bababa',
    borderRadius: '5px',
    outline: '0!important',
  },
  genderLabel: {
    margin: '0!important',
  },
});

class RenderEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      full_name: '',
      biography: '',
      external_url: '',
      phone_number: '',
      email: '',
      gender: '',
      custom_gender: '',
      profile_pic_url: '',
      GENDER_TYPE: {
        1: 'Male',
        2: 'Female',
        3: '',
      },
      genderType: '',
      formErrors: { URL: '', PHNO: '', EMAIL: '' },
      urlValid: true,
      phoneNumberValid: true,
      emailValid: true,
      formValid: true,
      formEdited: false,
      showProfileChanger: false,
      showGenderDialog: false,
    };
  }

  componentDidMount() {
    const { currentUser, user } = this.props;
    const { GENDER_TYPE } = this.state;
    const {
      username,
      full_name,
      biography,
      external_url,
      phone_number,
      email,
      gender,
      custom_gender,
    } = currentUser;
    const { profile_pic_url } = user;
    this.setState({
      username,
      full_name,
      biography,
      external_url,
      phone_number,
      email,
      custom_gender,
      genderType: gender,
      gender: gender === 4 ? custom_gender : GENDER_TYPE[gender],
      profile_pic_url,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentUser, user } = this.props;
    const { GENDER_TYPE } = prevState;
    if (
      !_.isEqual(currentUser, prevProps.currentUser) ||
      !_.isEqual(user, prevProps.user)
    ) {
      this.updateState(currentUser, GENDER_TYPE, user);
    }
  }

  updateState = (currentUser, GENDER_TYPE, user) => {
    const {
      username,
      full_name,
      biography,
      external_url,
      phone_number,
      email,
      custom_gender,
      gender,
    } = currentUser;
    const { profile_pic_url } = user;
    this.setState({
      username,
      full_name,
      biography,
      external_url,
      phone_number,
      email,
      custom_gender,
      genderType: gender,
      gender: gender === 4 ? custom_gender : GENDER_TYPE[gender],
      profile_pic_url,
    });
  };

  submitEditProfileForm = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const { formValid } = this.state;
    if (formValid) {
      const {
        username,
        full_name,
        biography,
        external_url,
        phone_number,
        email,
        genderType,
      } = this.state;
      const data = {
        username,
        first_name: full_name,
        biography,
        external_url,
        phone_number,
        email,
        gender: genderType,
      };
      dispatch(saveProfileAction(data));
    }
  };

  handleUserInput = (event) => {
    const { name, value } = event.target;
    this.setState(
      {
        [name]: value,
        formEdited: true,
      },
      () => this.validateFormFields(name, value),
    );
  };

  updateGender = (event) => {
    const { value } = event.target;
    this.setState((state) => {
      return {
        gender: state.GENDER_TYPE[parseInt(value, 10)],
        genderType: parseInt(value, 10),
        formEdited: true,
      };
    });
  };

  validateFormFields = (name, value) => {
    const { formErrors, emailValid, urlValid, phoneNumberValid } = this.state;
    const fieldValidationErrors = formErrors;
    let emailCheck = emailValid;
    let urlCheck = urlValid;
    let phoneNumberCheck = phoneNumberValid;
    switch (name) {
      case 'email':
        emailCheck = validator.isEmail(value);
        fieldValidationErrors.EMAIL = emailCheck
          ? ''
          : 'Email id is not formatted properly';
        break;
      case 'phone_number':
        phoneNumberCheck = validator.isMobilePhone(value, 'any', {
          strictMode: true,
        });
        fieldValidationErrors.PHNO = phoneNumberCheck
          ? ''
          : 'Looks like your phone number may be incorrect. Please try entering your full number, including the country code.';
        break;
      case 'external_url':
        urlCheck = validator.isURL(value);
        fieldValidationErrors.URL = urlCheck
          ? ''
          : 'Url is not formatted properly';
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailCheck,
        phoneNumberValid: phoneNumberCheck,
        urlValid: urlCheck,
      },
      this.validateForm,
    );
  };

  validateForm = () => {
    this.setState((state) => {
      return {
        formValid: state.emailValid && state.phoneNumberValid && state.urlValid,
      };
    });
  };

  changeProfileToggle = () => {
    this.setState({
      showProfileChanger: true,
    });
  };

  closeProfileChanger = () => {
    this.setState({
      showProfileChanger: false,
    });
  };

  handlePhotoSelect = () => {
    this.photoUploadRef.click();
  };

  handleUploadPhoto = (event) => {
    const { dispatch, user } = this.props;
    const file = event.currentTarget.files[0];
    if (file) {
      const data = new FormData();
      data.append('file', file);
      data.append('userId', user.pk);
      dispatch(updateUserProfilePictureAction(data));
      this.closeProfileChanger();
      dispatch(loaderAction(true, 'profilePhotoLoader'));
    }
  };

  handleRemovePhoto = () => {
    const { dispatch } = this.props;
    dispatch(removeUserProfilePictureAction());
    this.closeProfileChanger();
    dispatch(loaderAction(true, 'profilePhotoLoader'));
  };

  resetImageUpload = () => {
    this.photoUploadRef.value = '';
  };

  showGenderChooser = () => {
    this.setState({
      showGenderDialog: true,
    });
  };

  hideGenderChooser = () => {
    this.setState({
      showGenderDialog: false,
    });
  };

  render() {
    const { classes } = this.props;
    const {
      username,
      full_name,
      biography,
      external_url,
      phone_number,
      email,
      gender,
      profile_pic_url,
      formValid,
      formEdited,
      emailValid,
      phoneNumberValid,
      urlValid,
      formErrors,
      showProfileChanger,
      showGenderDialog,
      genderType,
    } = this.state;
    const { profilePhotoLoader } = this.props;
    return (
      <React.Fragment>
        <ProfilePhotoContainerDiv>
          <ProfilePhotoWrapperDiv>
            <ProfilePhotoContent>
              <ProfilePhotoButton title="Change Profile Photo">
                <ProfilePhotoImg
                  alt="Change Profile Photo"
                  src={profile_pic_url}
                  onClick={this.changeProfileToggle}
                />
              </ProfilePhotoButton>
              {profilePhotoLoader && (
                <ProfilePhotoLoaderDiv>
                  <FadeLoader
                    color="#123abc"
                    loading
                    height={15}
                    radius={2}
                    margin={0}
                  />
                </ProfilePhotoLoaderDiv>
              )}
              <Dialog
                onClose={this.closeProfileChanger}
                aria-labelledby="simple-dialog-title"
                classes={{
                  paper: classes.txtPosition,
                }}
                open={showProfileChanger}>
                <DialogTitle id="simple-dialog-title">
                  Change Profile Photo
                </DialogTitle>
                <List>
                  <ListItem
                    button
                    onClick={this.handlePhotoSelect}
                    key="Upload Photo"
                    className={classes.listTxtBorder}>
                    <ListItemText
                      primary="Upload Photo"
                      classes={{
                        primary: classes.listTxtUpload,
                      }}
                    />
                  </ListItem>
                  <ListItem
                    button
                    onClick={this.handleRemovePhoto}
                    key="Remove Current Photo"
                    className={classes.listTxtBorder}>
                    <ListItemText
                      primary="Remove Current Photo"
                      classes={{
                        primary: classes.listTxtRemove,
                      }}
                    />
                  </ListItem>
                  <ListItem
                    autoFocus
                    button
                    onClick={this.closeProfileChanger}
                    className={classes.listTxtBorder}>
                    <ListItemText
                      primary="Cancel"
                      classes={{
                        primary: classes.listTxtCancel,
                      }}
                    />
                  </ListItem>
                </List>
              </Dialog>
              <ProfilePhotoUploadContainer>
                <ProfilePhotoUploadForm
                  enctype="multipart/form-data"
                  method="POST"
                  role="presentation">
                  <ProfilePhotoInput
                    ref={(photoInput) => {
                      this.photoUploadRef = photoInput;
                    }}
                    accept="image/jpeg,image/png"
                    type="file"
                    onChange={this.handleUploadPhoto}
                  />
                </ProfilePhotoUploadForm>
              </ProfilePhotoUploadContainer>
            </ProfilePhotoContent>
          </ProfilePhotoWrapperDiv>
          <ProfileInfoContent>
            <ProfileUsername title={username}>{username}</ProfileUsername>
            <ProfileUpdateButton
              type="button"
              onClick={this.changeProfileToggle}>
              Change Profile Photo
            </ProfileUpdateButton>
          </ProfileInfoContent>
        </ProfilePhotoContainerDiv>
        <EditProfileForm onSubmit={this.submitEditProfileForm} method="POST">
          <StyledFormGroup>
            <FormLabelContainer>
              <Label _for="full_name" label="Name" />
            </FormLabelContainer>
            <FormInputContainer>
              <Input
                input_aria-required={false}
                input_id="full_name"
                input_type="text"
                input_value={full_name}
                input_name="full_name"
                on_change={this.handleUserInput}
              />
            </FormInputContainer>
          </StyledFormGroup>
          <StyledFormGroup>
            <FormLabelContainer>
              <Label _for="username" label="Username" />
            </FormLabelContainer>
            <FormInputContainer>
              <Input
                input_aria-required={false}
                input_id="username"
                input_type="text"
                input_value={username}
                input_name="username"
                on_change={this.handleUserInput}
              />
            </FormInputContainer>
          </StyledFormGroup>
          <StyledFormGroup>
            <FormLabelContainer>
              <Label _for="biography" label="Bio" />
            </FormLabelContainer>
            <FormInputContainer>
              <Input
                input_aria-required={false}
                input_id="biography"
                input_type="text"
                input_value={biography}
                input_name="biography"
                on_change={this.handleUserInput}
              />
            </FormInputContainer>
          </StyledFormGroup>
          <StyledFormGroup>
            <FormLabelContainer>
              <Label _for="external_url" label="Website" />
            </FormLabelContainer>
            <FormInputContainer>
              <Input
                input_aria-required={false}
                input_id="external_url"
                input_type="text"
                input_value={external_url}
                input_name="external_url"
                on_change={this.handleUserInput}
              />
              {!urlValid && (
                <Alert className={classes.root} severity="error">
                  {formErrors.URL}
                </Alert>
              )}
            </FormInputContainer>
          </StyledFormGroup>
          <StyledFormGroup>
            <FormLabelContainer>
              <Label />
            </FormLabelContainer>
            <FormInputContainer>
              <PersonalInfoHelpText>
                <PersonalInfoHead>
                  <PersonalInfoHeadText>
                    Personal Information
                  </PersonalInfoHeadText>
                </PersonalInfoHead>
                <PersonalInfoMessage>
                  Provide your personal information, even if the account is used
                  for a business, a pet or something else. This won&apos;t be a
                  part of your public profile.
                </PersonalInfoMessage>
              </PersonalInfoHelpText>
            </FormInputContainer>
          </StyledFormGroup>
          <StyledFormGroup>
            <FormLabelContainer>
              <Label _for="email" label="Email" />
            </FormLabelContainer>
            <FormInputContainer>
              <Input
                input_aria-required={false}
                input_id="email"
                input_type="text"
                input_value={email}
                input_name="email"
                on_change={this.handleUserInput}
              />
              {!emailValid && (
                <Alert className={classes.root} severity="error">
                  {formErrors.EMAIL}
                </Alert>
              )}
            </FormInputContainer>
          </StyledFormGroup>
          <StyledFormGroup>
            <FormLabelContainer>
              <Label _for="phone_number" label="Phone Number" />
            </FormLabelContainer>
            <FormInputContainer>
              <Input
                input_aria-required={false}
                input_id="phone_number"
                input_type="text"
                input_value={phone_number}
                input_name="phone_number"
                on_change={this.handleUserInput}
              />
              {!phoneNumberValid && (
                <Alert className={classes.root} severity="error">
                  {formErrors.PHNO}
                </Alert>
              )}
            </FormInputContainer>
          </StyledFormGroup>
          <StyledFormGroup>
            <FormLabelContainer>
              <Label _for="gender" label="Gender" />
            </FormLabelContainer>
            <FormInputContainer style={{ maxWidth: '355px' }}>
              <GenderButton type="button" onClick={this.showGenderChooser}>
                <GenderInput
                  readOnly
                  aria-required={false}
                  id="gender"
                  type="text"
                  value={gender}
                  name="gender"
                />
              </GenderButton>
            </FormInputContainer>
            <Dialog
              css={genderRootStyle}
              onClose={this.hideGenderChooser}
              aria-labelledby="simple-dialog-title"
              classes={{
                paper: classes.genderRoot,
              }}
              open={showGenderDialog}>
              <DialogTitle
                id="simple-dialog-title"
                className={classes.genderTitle}>
                Gender
              </DialogTitle>
              <Divider />
              <FormControl component="fieldset" className={classes.genderForm}>
                <RadioGroup
                  aria-label="gender"
                  name="gender"
                  value={genderType}
                  onChange={this.updateGender}>
                  <FormControlLabel
                    className={classes.genderLabel}
                    value={1}
                    control={<Radio className={classes.genderRadio} />}
                    label="Male"
                  />
                  <FormControlLabel
                    className={classes.genderLabel}
                    value={2}
                    control={<Radio className={classes.genderRadio} />}
                    label="Female"
                  />
                  <FormControlLabel
                    className={classes.genderLabel}
                    value={3}
                    control={<Radio className={classes.genderRadio} />}
                    label="Prefer Not To Say"
                  />
                </RadioGroup>
                <GenderChooseSubmitButton>
                  <Button
                    onClick={this.hideGenderChooser}
                    variant="contained"
                    color="primary"
                    css={genderSubmitCss}>
                    Done
                  </Button>
                </GenderChooseSubmitButton>
              </FormControl>
            </Dialog>
          </StyledFormGroup>
          <StyledFormGroup>
            <FormLabelContainer css={submitFormsExtraCss}>
              <Label />
            </FormLabelContainer>
            <FormInputContainer>
              <SubmitFormButtonContainer>
                <SubmitFormButton
                  type="submit"
                  disabled={!formEdited && formValid}>
                  Submit
                </SubmitFormButton>
              </SubmitFormButtonContainer>
            </FormInputContainer>
          </StyledFormGroup>
        </EditProfileForm>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(RenderEditForm);
