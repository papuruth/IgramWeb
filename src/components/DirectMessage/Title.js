/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
import { Avatar, Button, ButtonBase, Divider, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { withStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { WORKER_URL } from '@/utils/constants';
import { blockUnblockUserAction, deleteChatAction, muteUserActon, resetChatWindowAction } from '@/redux/chats/chatsAction';
import { formatTime, getChatThumbnail, getChatTitle, getUsernames } from './helperFunctions';

const useStyles = (theme) => ({
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  memberWrapper: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  avatarWrapper: {
    display: 'flex',
    flexDirection: 'row',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  infoButton: {
    position: 'absolute',
    right: '1rem',
  },
});

class Title extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      showInfo: false,
      isUserBlocked: false,
      chat_: {},
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { chat_, isMuted, newChatData, isUserBlocked } = props;
    if (chat_ !== state.chat_ && !Object.keys(newChatData).length) {
      return {
        chat_,
      };
    }
    if (Object.keys(newChatData).length && newChatData !== state.chat_) {
      return {
        chat_: newChatData,
        checked: isMuted,
      };
    }
    if (isUserBlocked && isUserBlocked.blocked !== state.isUserBlocked) {
      return {
        isUserBlocked: isUserBlocked.blocked,
      };
    }
    return null;
  }

  componentDidMount() {
    const { chat_ } = this.props;
    const { muted } = chat_;
    const isUserBlocked = chat_.users ? chat_.users[0].friendship_status.blocking : false;
    this.setState({
      checked: muted,
      isUserBlocked,
    });
  }

  componentDidUpdate(prevProps) {
    const { isUserBlocked, dispatch, isChatDeleted } = this.props;
    if (isUserBlocked !== prevProps.isUserBlocked || isChatDeleted !== prevProps.isChatDeleted) {
      dispatch(resetChatWindowAction(true));
    }
  }

  handleClickOpen = () => {
    this.setState({
      showInfo: true,
    });
  };

  handleClose = () => {
    this.setState({
      showInfo: false,
    });
  };

  handleChange = (event) => {
    const { name, checked } = event.target;
    this.setState(
      {
        [name]: checked,
      },
      () => this.muteMessages(),
    );
  };

  muteMessages = () => {
    const { dispatch } = this.props;
    const { chat_ } = this.state;
    dispatch(muteUserActon(chat_));
  };

  deleteChat = () => {
    const { dispatch, chat_ } = this.props;
    const chatId = chat_.thread_id;
    dispatch(deleteChatAction(chatId));
  };

  blockUser = () => {
    const { dispatch, chat_ } = this.props;
    const { isUserBlocked } = this.state;
    const userId = chat_.pk || chat_.users[0].pk;
    const action = isUserBlocked ? 'unblock' : 'block';
    dispatch(blockUnblockUserAction(userId, action));
  };

  render() {
    const { classes } = this.props;
    const { showInfo, isUserBlocked, checked, chat_ } = this.state;
    const chatTitle = chat_?.thread_id ? getChatTitle(chat_) : getUsernames(chat_); // if chat_.thread_id is not defined, it is a new contact
    let timeFormat = '';
    if (chat_.presence) {
      timeFormat = chat_.presence.is_active
        ? 'Active now'
        : chat_.presence.last_activity_at_ms && `Last seen ${formatTime(chat_.presence.last_activity_at_ms)}`;
    }
    const thumbnail = (chat_.profile_pic_url && `${WORKER_URL}${chat_.profile_pic_url}`) || `${WORKER_URL}${getChatThumbnail(chat_)}`;
    return (
      <div className="chat-title row p-3">
        <div>
          <img className="thumb" src={thumbnail} alt="" />
        </div>
        {Object.prototype.hasOwnProperty.call(chat_, 'presence') ? (
          <div>
            <b className="ml-2">
              <Link to={`/${chatTitle}`}>{chatTitle}</Link>
            </b>
            <b className="ml-2">{timeFormat}</b>
          </div>
        ) : (
          <div>
            <b className="ml-2 mt-2">
              <Link to={`/${chatTitle}`}>{chatTitle}</Link>
            </b>
          </div>
        )}
        <ButtonBase onClick={this.handleClickOpen} className={classes.infoButton}>
          <InfoIcon style={{ fontSize: '30px' }} />
        </ButtonBase>
        {showInfo && (
          <div>
            <Dialog
              className={classes.root}
              open={showInfo}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="details">Details</DialogTitle>
              <DialogContent>
                <FormGroup row>
                  <FormControlLabel control={<Checkbox checked={checked} onChange={this.handleChange} name="checked" />} label="Mute Messages" />
                </FormGroup>
                <Divider />
                <Typography component="div" className={classes.memberWrapper}>
                  <Typography variant="h6" gutterBottom>
                    Members
                  </Typography>
                  <Typography component="div" className={classes.avatarWrapper}>
                    <Avatar alt={chatTitle} src={thumbnail} />
                    <Typography component="div">
                      <Typography variant="h5" gutterBottom>
                        {chatTitle}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {chat_.full_name || chat_.users[0].full_name}
                      </Typography>
                    </Typography>
                  </Typography>
                </Typography>
                <Divider />
                <Typography component="div" className={classes.buttonWrapper}>
                  <Button color="secondary" onClick={this.deleteChat}>
                    Delete Chat
                  </Button>
                  <Button color="secondary" onClick={this.blockUser}>
                    {isUserBlocked ? 'Unblock' : 'Block'}
                  </Button>
                  <Button color="secondary" onClick={this.reportUser}>
                    Report
                  </Button>
                </Typography>
                <Divider />
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(Title);
