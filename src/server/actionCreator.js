export function addRoom(room) {
  return {
    type: 'ADD_ROOM',
    room
  };
}

export const removeRoom = payload => ({type: 'REMOVE_ROOM', payload});