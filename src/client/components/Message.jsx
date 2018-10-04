import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactMixin from 'react-mixin';

class Message extends Component {
  render() {
    const { message, itSelf } = this.props;
    const className = itSelf ? "message-self" : "";

    return (
      <li className={className + ' clearfix'}>
        <div className="message-inner">
          <p className="chat-username">
            {message.get('user')}
            <small>{message.get('time')}</small>
          </p>
          <p>{message.get('content')}</p>
        </div>
      </li>
    );
  }
}

ReactMixin.onClass(Message, PureRenderMixin);

export default Message;