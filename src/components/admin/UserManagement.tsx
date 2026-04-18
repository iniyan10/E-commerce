import React, { useState, useEffect } from 'react';
import { API_URLS } from '../../api';
import { useShop } from '../../context/ShopContext';
import { User } from '../../types';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { verifyUser } = useShop();

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URLS.users);
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleVerify = async (userId: string | number) => {
    const success = await verifyUser(userId);
    if (success) {
      alert("User verified successfully!");
      fetchUsers(); // Refresh list
    } else {
      alert("Failed to verify user.");
    }
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="user-management">
      <h2 style={{ marginBottom: '20px' }}>User Management</h2>
      <div className="table-responsive" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--primary)', color: '#000', textAlign: 'left' }}>
              <th style={{ padding: '15px' }}>Name</th>
              <th style={{ padding: '15px' }}>Email</th>
              <th style={{ padding: '15px' }}>Role</th>
              <th style={{ padding: '15px' }}>Status</th>
              <th style={{ padding: '15px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '15px' }}>{user.name}</td>
                <td style={{ padding: '15px' }}>{user.email}</td>
                <td style={{ padding: '15px' }}><span className="badge" style={{ backgroundColor: user.role === 'admin' ? '#ef4444' : '#3b82f6', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>{user.role}</span></td>
                <td style={{ padding: '15px' }}>
                  <span style={{ color: user.status === 'verified' ? '#10b981' : '#f59e0b', fontWeight: '500' }}>
                    {user.status}
                  </span>
                </td>
                <td style={{ padding: '15px' }}>
                  {user.status === 'pending' && (
                    <button 
                      onClick={() => handleVerify(user.id)}
                      className="btn btn-primary"
                      style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                    >
                      Verify User
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
