import React from 'react';
import { fromJS } from 'immutable';
import MessageList from '../../src/client/components/MessageList';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  scryRenderedDOMComponentsWithClass
} from 'react-dom/test-utils';

describe('MessageList', () => {
  it('render messages and my messages', () => {
    const messages = fromJS([
      {user: 'eisneim', time: '23:33', content: 'some message'},
      {user: 'terry', time: '23:33', content: 'some message'}
    ]);

    const component = renderIntoDocument(
      <MessageList username="eisneim"
        messages={messages}
      />
    );

    const $messages = scryRenderedDOMComponentsWithTag(component, 'li');
    const $myMessages = scryRenderedDOMComponentsWithClass(component, 'message-self');
    expect($messages.length).toEqual(2);
    expect($myMessages.length).toEqual(1);

  });

  it('render no messages', () => {
    const messages = fromJS([]);

    const component = renderIntoDocument(
      <MessageList username="eisneim"
        messages={messages}
      />
    );

    const $noMessages = scryRenderedDOMComponentsWithTag(component, 'p');
    expect($noMessages.length).toEqual(1);
    expect($noMessages[0].innerHTML).toEqual('暂时没有消息');

  });
});