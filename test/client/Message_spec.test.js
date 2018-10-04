import React from 'react';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag
} from 'react-dom/test-utils';
import Message from '../../src/client/components/Message';
import { fromJS } from 'immutable';

describe('message', () => {
  test('能够正确显示消息', () => {
    const mockMessage = fromJS({ 
      user: 'xianss', 
      time: '2018-10-3 20:37:17',
      content: 'hello jest' 
    });
    const instance = renderIntoDocument( 
      <Message message={mockMessage} isSelf={false} />
    );
    const $content = scryRenderedDOMComponentsWithTag(instance, 'p');
    expect($content.length).toEqual(2);
    expect($content[1].innerHTML).toEqual('hello jest');
  });
});