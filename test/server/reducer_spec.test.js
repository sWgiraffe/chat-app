import { v1 } from 'uuid';
import coreReducer from '../../src/server/reducer';
import {
  addRoom,
  removeRoom
} from '../../src/server/actionCreator';

describe('server端核心reducer', () => {
  test('可以当做一个reducer', () => {
    var id = v1();
    var actions = [
      {type: 'ADD_ROOM', room: {id, name: '1', owner: 'eisneim'}},
      {type: 'ADD_ROOM', room: {name: '2', owner: 'terry'}},
      {type: 'ADD_ROOM', room: {name: '3', owner: 'eisneim'}},
      {type: 'REMOVE_ROOM', payload: {id, user: 'eisneim'}}
    ];
    const finalState = actions.reduce(coreReducer, undefined);

    expect(finalState.get('rooms').size).toEqual(2);
    expect(finalState.getIn(['rooms', 0, 'owner'])).toEqual('terry');
  });

  test('使用actionCreator', () => {
    var id = v1();
    var actions = [
      addRoom({id, name: '1', owner: 'eisneim'}),
      addRoom({name: '2', owner: 'terry'}),
      addRoom({name: '3', owner: 'eisneim'}),
      removeRoom({id, user: 'eisneim'})
    ];
    const finalState = actions.reduce(coreReducer, undefined);

    expect(finalState.get('rooms').size).toEqual(2);
    expect(finalState.getIn(['rooms', 0, 'owner'])).toEqual('terry');
  });

});