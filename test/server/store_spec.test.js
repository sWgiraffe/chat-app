import { makeStore } from '../../src/server/store';
import { fromJS } from 'immutable';
import { addRoom } from '../../src/server/actionCreator';

describe('server store', () => {
  test('dispatch actions', done => {
    const mockState = fromJS({
      rooms: []
    });

    const store = makeStore(mockState);
    store.subscribe(() => {
      const state = store.getState();
      expect(state.get('rooms').size).toEqual(1);
      done();
    });
    store.dispatch(addRoom({
      name: '聊天室',
      owner: 'terry'
    }));
  });
});