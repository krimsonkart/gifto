import React from 'react';
import { Link } from 'react-router';
import { UserList } from 'components';

const UserLists = ({ lists: lists }) => (
  <div>
    <div className="row">
      <div className="col-md-12">
        <h4><Link to="/addList">New List</Link></h4>
      </div>
    </div>
    <div className="row">
      {
        lists
          .map((list, i) => <UserList key={i} {...list} />)
      }
    </div>
    <hr />
  </div>
);

export default UserLists;
