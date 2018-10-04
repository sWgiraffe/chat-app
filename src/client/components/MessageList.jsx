import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactMixin from 'react-mixin';
import Message from './Message';

class MessageList extends Component {
  
  isSelf(message) {
    return message.get('user') === this.props.username;
  }

  $getMessages(messages) {
    if (!messages || messages.size === 0) {
      return <p>暂时没有消息</p>;
    }
    return messages.map((message, index) => 
      <Message key={index}
        message={message}
        itSelf={this.isSelf(message)}
      />
    );
  }

  render() {
    return (
      <ul className="chat-messages">
        {this.$getMessages(this.props.messages)}
      </ul>
    );
  }
}

ReactMixin.onClass(MessageList, PureRenderMixin);

export default MessageList;