import React, { useState, useEffect } from 'react';
import { API_URLS } from '../../api';
import { useShop } from '../../context/ShopContext';

import { Dispute } from '../../types';

const DisputeManagement: React.FC = () => {
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [resolvingId, setResolvingId] = useState<number | string | null>(null);
  const [resolutionText, setResolutionText] = useState<string>('');
  const { resolveDispute } = useShop();

  const fetchDisputes = async () => {
    try {
      const response = await fetch(API_URLS.disputes);
      const data = await response.json();
      setDisputes(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching disputes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisputes();
  }, []);

  const handleResolve = async (disputeId: number | string) => {
    if (!resolutionText.trim()) return alert("Please enter a resolution.");
    
    const success = await resolveDispute(disputeId, resolutionText);
    if (success) {
      alert("Dispute resolved!");
      setResolvingId(null);
      setResolutionText('');
      fetchDisputes();
    } else {
      alert("Failed to resolve dispute.");
    }
  };

  if (loading) return <div>Loading disputes...</div>;

  return (
    <div className="dispute-management">
      <h2 style={{ marginBottom: '20px' }}>Dispute Resolution</h2>
      {disputes.length === 0 ? (
        <p className="text-light">No active disputes.</p>
      ) : (
        <div className="dispute-list">
          {disputes.map(dispute => (
            <div key={dispute.id} style={{ 
              background: 'var(--surface)', 
              padding: '25px', 
              borderRadius: 'var(--radius-lg)', 
              border: '1px solid var(--border)', 
              marginBottom: '20px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{dispute.subject}</h3>
                  <p className="text-light" style={{ fontSize: '0.9rem' }}>Order ID: #{dispute.orderId} | Status: <span style={{ color: dispute.status === 'open' ? '#ef4444' : '#10b981', fontWeight: 'bold' }}>{dispute.status.toUpperCase()}</span></p>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.85rem' }}>
                  <p>Customer ID: {dispute.customerId}</p>
                  <p>Seller ID: {dispute.sellerId}</p>
                </div>
              </div>
              
              <div style={{ marginBottom: '20px', padding: '15px', background: 'var(--bg-color)', borderRadius: 'var(--radius-md)', fontSize: '0.95rem' }}>
                <p><strong>Issue:</strong> {dispute.description}</p>
              </div>

              {dispute.status === 'open' && (
                resolvingId === dispute.id ? (
                  <div style={{ marginTop: '15px' }}>
                    <textarea 
                      className="form-control"
                      placeholder="Enter resolution details..."
                      value={resolutionText}
                      onChange={(e) => setResolutionText(e.target.value)}
                      style={{ width: '100%', minHeight: '100px', marginBottom: '10px', padding: '12px' }}
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={() => handleResolve(dispute.id)} className="btn btn-primary">Submit Resolution</button>
                      <button onClick={() => setResolvingId(null)} className="btn btn-secondary">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setResolvingId(dispute.id)} className="btn btn-primary">Resolve Dispute</button>
                )
              )}

              {dispute.status === 'resolved' && (
                <div style={{ marginTop: '15px', padding: '15px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid #10b981' }}>
                  <p style={{ color: '#10b981' }}><strong>Resolution:</strong> {dispute.resolution}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisputeManagement;
