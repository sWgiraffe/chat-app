import { fromJS } from 'immutable';
import {
  newMessage, setState, switchRoom, setUsername
} from '../../src/client/actionCreator';
import rootReducer from '../../src/client/reducer';

const fakeState = fromJS({
  rooms: [
    {id: '0', name: 'room', owner: 'eisneim'},
    {id: '1', name: 'room2', owner: 'terry'}
  ],
  currentRoom: '1',
  username: 'eisneim',
  messages: {
    '1': [
      {user: 'eisneim', content: 'some message', time: '23:33'},
      {user: 'terry', content: 'ss message', time: '12:33'},
    ]
  }
});

describe('client Root reducer', () => {
  test('set state', () => {
    const nextState = rootReducer(fakeState, setState(fromJS({
      username: 'Joan',
      currentRoom: '0'
    })));
    expect(nextState.get('username')).toEqual('Joan');
    expect(nextState.get('rooms').size).toEqual(2);
  });

  test('set username', () => {
    const nextState = rootReducer(fakeState, setUsername('terry'));
    expect(nextState.get('username')).toEqual('terry');
  });
  
  test('switch chat room', () => {
    const nextState = rootReducer(fakeState, switchRoom('0'));
    expect(nextState.get('currentRoom')).toEqual('0');
  });

  test('send new message', () => {
    const action = newMessage({
      roomId: '0',
      user: 'eisneim',
      content: 'some message'
    });
    expect(action.message.time).toBeDefined();
    const nextState = rootReducer(fakeState, action);
    expect(nextState.getIn(['messages', '0']).size).toEqual(1);

    const nextNextState = rootReducer(fakeState, newMessage({
      roomId: '1',
      user: 'terry',
      content: 'some message'
    }));
    expect(nextNextState.getIn(['messages', '1']).size).toEqual(3);

  });
});