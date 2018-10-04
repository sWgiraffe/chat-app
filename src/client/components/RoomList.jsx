import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from 'react-mixin';

class RoomList extends Component {
  isActive(room, currentRoom) {
    return room.get('id') === currentRoom;
  }

  render() {
    const { rooms, currentRoom } = this.props;
    return (
      <div className="chat-room-list">
        {
          rooms.map((room, index) => {
            return (
              <a className={this.isActive(room, currentRoom) ? "active" : ""}
                key={index}
                href="#"
                onClick={e => this.props.switchRoom(room.get('id'))}
              >
                {room.get('name')}
              </a>
            )
          })
        }
      </div>
    );
  }
}

reactMixin.onClass(RoomList, PureRenderMixin);

export default RoomList;