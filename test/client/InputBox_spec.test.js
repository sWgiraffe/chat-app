import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
  Simulate
} from 'react-dom/test-utils';
import InputBox from '../../src/client/components/InputBox';

describe('InputBox', () => {
  test('send message', () => {
    var message;
    function sendMessage(msg) {
      message = msg;
    }
    const instance = renderIntoDocument(
      <InputBox sendMessage={sendMessage} />
    );
    const $textarea = findRenderedDOMComponentWithTag(instance, 'textarea');
    expect($textarea).toBeDefined();
    $textarea.value = 'some message';
    const $form = findRenderedDOMComponentWithTag(instance, 'form');
    Simulate.submit($form);

    expect(message).toEqual('some message');
  });
});