import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { addUser, updateUser, deleteUser, User } from './UserSlice';
import UserForm from './UserForm';
import UserTable from './UserTable';

const UserManagement: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleSave = (user: Omit<User, 'id'>) => {
    if (editingUser) {
      dispatch(updateUser({ ...user, id: editingUser.id }));
    } else {
      dispatch(addUser(user));
    }
    setEditingUser(null);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleDelete = (userId: number) => {
    dispatch(deleteUser(userId));
  };

  const handleCancel = () => {
    setEditingUser(null);
  };

  return (
    <div>
      <UserForm user={editingUser || undefined} onSave={handleSave} onCancel={handleCancel} />
      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default UserManagement;
