import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import UserManagement from '../components/admin/UserManagement';
import DisputeManagement from '../components/admin/DisputeManagement';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'disputes'>('users');
  const { logout, user } = useShop();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="title" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Admin Control Panel</h1>
          <p className="text-light">Logged in as: <strong>{user?.name || user?.email}</strong></p>
        </div>
        <button 
          onClick={handleLogout}
          className="btn" 
          style={{ 
            padding: '10px 20px', 
            border: '1px solid var(--danger)', 
            color: 'var(--danger)',
            borderRadius: 'var(--radius)',
            transition: 'all 0.2s',
            background: 'none'
          }}
          onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => { 
            const target = e.currentTarget;
            target.style.background = 'var(--danger)'; 
            target.style.color = 'white'; 
          }}
          onMouseOut={(e: React.MouseEvent<HTMLButtonElement>) => { 
            const target = e.currentTarget;
            target.style.background = 'none'; 
            target.style.color = 'var(--danger)'; 
          }}
        >
          Logout Admin
        </button>
      </header>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', borderBottom: '1px solid var(--border)' }}>
        <button 
          onClick={() => setActiveTab('users')}
          style={{ 
            padding: '12px 24px', 
            background: 'none', 
            border: 'none', 
            borderBottom: activeTab === 'users' ? '3px solid var(--primary)' : '3px solid transparent',
            color: activeTab === 'users' ? 'var(--text)' : 'var(--text-light)',
            fontWeight: activeTab === 'users' ? '600' : '400',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          User Verification
        </button>
        <button 
          onClick={() => setActiveTab('disputes')}
          style={{ 
            padding: '12px 24px', 
            background: 'none', 
            border: 'none', 
            borderBottom: activeTab === 'disputes' ? '3px solid var(--primary)' : '3px solid transparent',
            color: activeTab === 'disputes' ? 'var(--text)' : 'var(--text-light)',
            fontWeight: activeTab === 'disputes' ? '600' : '400',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          Resolve Disputes
        </button>
      </div>

      <div className="dashboard-content" style={{ minHeight: '400px' }}>
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'disputes' && <DisputeManagement />}
      </div>
    </div>
  );
};

export default AdminDashboard;
