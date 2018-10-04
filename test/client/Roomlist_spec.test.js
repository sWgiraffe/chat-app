import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  scryRenderedDOMComponentsWithClass,
  Simulate,
  isElement,
  isElementOfType,
  isDOMComponent,
  isCompositeComponent,
  isCompositeComponentWithType,
} from 'react-dom/test-utils';
import { fromJS } from 'immutable';
import RoomList from '../../src/client/components/RoomList';

describe('RoomList组件', () => {
  test('render roomlist', () => {
    const rooms = fromJS([
      {id: '0', name: 'room', owner: 'eisneim'},
      {id: '1', name: 'room2', owner: 'terry'}
    ]);

    const component = renderIntoDocument(
      <RoomList rooms={rooms} currentRoom='1' />
    );
    const $rooms = scryRenderedDOMComponentsWithTag(component, 'a');
    expect($rooms.length).toEqual(2);
    const $active = scryRenderedDOMComponentsWithClass(component, 'active');
    expect($active.length).toEqual(1);
  });

  test('能够切换房间', () => {
    const rooms = fromJS([
      {id: '0', name: 'room', owner: 'eisneim'},
      {id: '1', name: 'room2', owner: 'terry'}
    ]);
    var currentRoom = '0';
    function switchRoom(id) {
      console.log('change id: ', id);
      currentRoom = id;
    }

    const RoomListElm = (
      <RoomList rooms={rooms}
        currentRoom={currentRoom}
        switchRoom={switchRoom}
      />
    );
    const component = renderIntoDocument(RoomListElm);
    const $rooms = scryRenderedDOMComponentsWithTag(component, 'a');
    Simulate.click(ReactDOM.findDOMNode($rooms[1]));
    expect(currentRoom).toEqual('1');
    expect(isElement(RoomListElm)).toBe(true);
    expect(isElementOfType(RoomListElm, RoomList)).toBe(true);
    expect(isDOMComponent(component)).toBe(false);
    expect(isCompositeComponent(component)).toBe(true);
    expect(isCompositeComponentWithType(component, RoomList)).toBe(true);
  });
})