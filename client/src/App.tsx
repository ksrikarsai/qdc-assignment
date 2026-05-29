import React, { useEffect, useState } from 'react';
import { OrdersList } from './OrdersList';

export interface Garment {
  id: string;
  description: string;
  status: 'received' | 'in_cleaning' | 'ready' | 'delivered';
}

export interface Order {
  id: string;
  customerName: string;
  createdAt: string;
  garments: Garment[];
}

export type SelectedStatusType = 'all' | 'received' | 'in_cleaning' | 'ready' | 'delivered';

const statusDisplayLabels: Record<string, string> = {
  all: 'All Garments',
  received: 'Received',
  in_cleaning: 'In Cleaning',
  ready: 'Ready for Pickup',
  delivered: 'Delivered',
};

export const App: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<SelectedStatusType>('all');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('http://localhost:3001/api/orders');
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = (await res.json()) as Order[];
        setOrders(data);
      } catch (e: any) {
        setError(e.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        fontFamily: "'Outfit', sans-serif",
        padding: '2rem 1rem',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header Section */}
        <header style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              margin: '0 0 0.5rem 0',
              background: 'linear-gradient(to right, #818cf8, #c084fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.025em',
            }}
          >
            QDC Mini Dashboard
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', margin: 0 }}>
            Real-time status overview of garment orders
          </p>
        </header>

        {loading && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
            <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Loading dashboard data...</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Please wait a moment</div>
          </div>
        )}

        {error && (
          <div
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '12px',
              padding: '1.5rem',
              color: '#fca5a5',
              marginBottom: '2rem',
              textAlign: 'center',
            }}
          >
            <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '0.25rem' }}>
              Connection Error
            </strong>
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Filter and Control Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                backgroundColor: 'rgba(30, 41, 59, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '16px',
                padding: '1rem 1.5rem',
                marginBottom: '2rem',
              }}
            >
              <div style={{ fontWeight: 500, color: '#f8fafc', fontSize: '1.05rem' }}>
                Active Orders List
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <label
                  htmlFor="status-filter"
                  style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 500 }}
                >
                  Filter Garments:
                </label>
                <select
                  id="status-filter"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as SelectedStatusType)}
                  style={{
                    backgroundColor: '#1e293b',
                    color: '#f8fafc',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '0.5rem 2rem 0.5rem 1rem',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '1rem',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    appearance: 'none',
                  }}
                >
                  {Object.entries(statusDisplayLabels).map(([value, label]) => (
                    <option key={value} value={value} style={{ backgroundColor: '#1e293b', color: '#f8fafc' }}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <OrdersList orders={orders} selectedStatus={selectedStatus} />
          </>
        )}
      </div>
    </div>
  );
};
