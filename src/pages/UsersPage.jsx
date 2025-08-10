import React, { useState, useEffect } from 'react';
import { useApi } from '../api.js';

export default function UsersPage() {
  const api = useApi();
  const [users, setUsers] = useState([]);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [changePassword, setChangePassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchUsers = () => {
    api
      .get('/users')
      .then((res) => setUsers(res.data))
      .catch(() => setError('Failed to load users'));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = (e) => {
    e.preventDefault();
    setError('');
    api
      .post('/users', { username: newUsername, password: newPassword })
      .then((res) => {
        setMessage(res.data.message);
        setNewUsername('');
        setNewPassword('');
        fetchUsers();
      })
      .catch((err) => setError(err.response?.data?.detail || 'Failed to add user'));
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setError('');
    api
      .post('/change-password', { old_password: oldPassword, new_password: changePassword })
      .then((res) => {
        setMessage(res.data.message);
        setOldPassword('');
        setChangePassword('');
      })
      .catch((err) => setError(err.response?.data?.detail || 'Failed to change password'));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">User Management</h1>
      {error && <p className="text-red-400">{error}</p>}
      {message && <p className="text-green-400">{message}</p>}
      <div className="bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Existing Users</h3>
        <ul className="list-disc pl-5 text-gray-300">
          {users.map((u) => (
            <li key={u}>{u}</li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Add User */}
        <form onSubmit={handleAddUser} className="bg-gray-800 p-4 rounded-lg shadow space-y-3">
          <h3 className="font-semibold mb-2">Add User</h3>
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold"
          >
            Add User
          </button>
        </form>
        {/* Change Password */}
        <form onSubmit={handleChangePassword} className="bg-gray-800 p-4 rounded-lg shadow space-y-3">
          <h3 className="font-semibold mb-2">Change Password</h3>
          <div>
            <label className="block text-sm mb-1">Current Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">New Password</label>
            <input
              type="password"
              value={changePassword}
              onChange={(e) => setChangePassword(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}