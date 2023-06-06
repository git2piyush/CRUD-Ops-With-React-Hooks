import React, { useState } from "react";

const UserTable = (props) => {
  const [editData, setEditData] = useState({ id: null, name: "", username: "" });

  const handleEditDataChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    props.editUser(editData.id, editData);
    setEditData({ id: null, name: "", username: "" });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.users.length > 0 ? (
          props.users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>
                {editData.id === user.id ? (
                  <form onSubmit={handleEditSubmit}>
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleEditDataChange}
                    />
                    <input
                      type="text"
                      name="username"
                      value={editData.username}
                      onChange={handleEditDataChange}
                    />
                    <button type="submit">Save</button>
                  </form>
                ) : (
                  <>
                    <button
                      className="button muted-button"
                      onClick={() => setEditData({ id: user.id, name: user.name, username: user.username })}
                    >
                      Edit
                    </button>
                    <button
                      className="button muted-button"
                      onClick={() => props.deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>No users</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserTable;
