/* eslint-disable react/prop-types */
import Message from '@/containers/Message';
import { getOlderMessageAction } from '@/redux/chats/chatsAction';
import React from 'react';
import SyncLoader from 'react-spinners/SyncLoader';
import { loaderCss } from './styles';

class MessageBox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      const { chat_ } = this.props;
      const doc = document.querySelector('.messages');
      doc.scrollBy(0, doc.scrollHeight);
      doc.addEventListener('scroll', (event) => {
        if (
          event.target.scrollTop <= 0
          && chat_.items
          && chat_.items.length >= 10
        ) {
          this.setState((state) => ({
            loading: !state.loading,
          }));
          this.getOlderMessages();
        }
      });
    }, 0);
  }

  getOlderMessages = () => {
    const { chat_, dispatch } = this.props;
    dispatch(getOlderMessageAction(chat_.thread_id));
  };

  render() {
    const { loading } = this.state;
    const { chat_, user } = this.props;
    const messages = chat_.items ? chat_.items.slice().reverse() : [];
    return (
      <div className="messages row p-3 pt-5">
        <SyncLoader
          css={loaderCss}
          size={10}
          color="#123abc"
          loading={loading}
        />
        {messages.length ? (
          messages.map((message) => (
            <Message
              message={message}
              user={user}
              chat_={chat_}
              key={message.item_id}
            />
          ))
        ) : (
          <Message user={user} chat_={chat_} />
        )}
      </div>
    );
  }
}

export default MessageBox;
