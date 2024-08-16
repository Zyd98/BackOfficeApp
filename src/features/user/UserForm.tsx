import React, { useState, useEffect } from 'react';
import { User } from './UserSlice';

interface UserFormProps {
  user?: User;
  onSave: (user: Omit<User, 'id'>) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSave, onCancel }) => {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [role, setRole] = useState(user?.role || '');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, email, role });
    setName('');
    setEmail('');
    setRole('');
  };

  return (
 <form onSubmit={handleSubmit} style={{ maxWidth: '400px', marginBottom: "10px"}}>
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
    <label style={{ width: '80px' }}>Name:</label>
    <input
      style={{ flex: 1, padding: '5px' }}
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
    />
  </div>
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
    <label style={{ width: '80px' }}>Email:</label>
    <input
      style={{ flex: 1, padding: '5px' }}
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
  </div>
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
    <label style={{ width: '80px' }}>Role:</label>
    <input
      style={{ flex: 1, padding: '5px' }}
      value={role}
      onChange={(e) => setRole(e.target.value)}
      required
    />
  </div>
  <div style={{ display: 'flex', gap: '10px' }}>
    <button type="submit" style={{ padding: '5px 10px' }}>
      Save
    </button>
    <button type="button" onClick={onCancel} style={{ padding: '5px 10px' }}>
      Cancel
    </button>
  </div>
</form>
  );
};

export default UserForm;
