import { v1 } from 'uuid';
import { fromJS } from 'immutable';
import {
  addRoom,
  removeRoom
} from '../../src/server/core.js';

describe('rooms', () => {
  it('能够添加房间: addRoom', () => {
    var firstRoom = {name: 'first room', id: v1(), owner: 'eisneim'};
    const nextState = addRoom(undefined, firstRoom);
    const rooms = nextState.get('rooms');
    expect(rooms).not.toBeNull();
    expect(rooms.get(0)).toEqual(fromJS(firstRoom));
    
    const nextNextState = addRoom(nextState, {
      name: 'second room',
      owner: 'terry'
    });
    expect(nextNextState.getIn(['rooms', 1, 'name'])).toEqual('second room');
  });

  const mockState = fromJS({
    rooms: [{
      name: 'first room',
      id: v1(),
      owner: 'eisneim'
    }]
  });

  it('能被创建者删除', () => {
    const state = removeRoom(mockState, {
      id: mockState.getIn(['rooms', 0, 'id']),
      user: 'eisneim'
    });
    expect(state.get('rooms').size).toEqual(0);
  });

  it('不能被其他人删除', () => {
    const state = removeRoom(mockState, {
      id: mockState.getIn(['rooms', 0, 'id']),
      user: 'tom'
    });
    expect(state.get('rooms').size).toEqual(1);
  });
});
