import React from 'react';
import type { Order, SelectedStatusType } from './App';

interface Props {
  orders: Order[];
  selectedStatus: SelectedStatusType;
}

const statusLabel: Record<string, string> = {
  received: 'Received',
  in_cleaning: 'In Cleaning',
  ready: 'Ready for Pickup',
  delivered: 'Delivered',
};

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  received: { bg: 'rgba(59, 130, 246, 0.1)', text: '#60a5fa', border: 'rgba(59, 130, 246, 0.2)' },
  in_cleaning: { bg: 'rgba(245, 158, 11, 0.1)', text: '#fbbf24', border: 'rgba(245, 158, 11, 0.2)' },
  ready: { bg: 'rgba(16, 185, 129, 0.1)', text: '#34d399', border: 'rgba(16, 185, 129, 0.2)' },
  delivered: { bg: 'rgba(107, 114, 128, 0.1)', text: '#9ca3af', border: 'rgba(107, 114, 128, 0.2)' },
};

export const OrdersList: React.FC<Props> = ({ orders, selectedStatus }) => {
  if (orders.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '3rem',
          backgroundColor: 'rgba(30, 41, 59, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '16px',
          color: '#94a3b8',
        }}
      >
        No active orders found.
      </div>
    );
  }

  // Calculate total matching garments across all orders
  const totalMatchingGarments = orders.reduce((sum, order) => {
    const matching = selectedStatus === 'all'
      ? order.garments
      : order.garments.filter((g) => g.status === selectedStatus);
    return sum + matching.length;
  }, 0);

  if (totalMatchingGarments === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '3rem',
          backgroundColor: 'rgba(30, 41, 59, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '16px',
          color: '#94a3b8',
        }}
      >
        No garments match the status "{statusLabel[selectedStatus] || selectedStatus}".
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {orders.map((order) => {
        const filteredGarments = selectedStatus === 'all'
          ? order.garments
          : order.garments.filter((g) => g.status === selectedStatus);

        // If an order doesn't have any garments matching the status filter, hide the entire order card.
        if (filteredGarments.length === 0) {
          return null;
        }

        return (
          <div
            key={order.id}
            style={{
              backgroundColor: 'rgba(30, 41, 59, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              transition: 'transform 0.2s ease, border-color 0.2s ease',
            }}
          >
            {/* Header info */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '0.5rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                paddingBottom: '0.75rem',
              }}
            >
              <span
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: '#a5b4fc',
                }}
              >
                {order.id}
              </span>
              <span style={{ fontSize: '1.05rem', fontWeight: 600, color: '#f1f5f9' }}>
                {order.customerName}
              </span>
            </div>
            
            <div
              style={{
                fontSize: '0.85rem',
                color: '#64748b',
                marginBottom: '1.25rem',
              }}
            >
              Created: {new Date(order.createdAt).toLocaleString()}
            </div>

            {/* Garments List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {filteredGarments.map((g) => {
                const color = statusColors[g.status] || {
                  bg: 'rgba(255, 255, 255, 0.05)',
                  text: '#ffffff',
                  border: 'rgba(255, 255, 255, 0.1)',
                };
                return (
                  <div
                    key={g.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: 'rgba(15, 23, 42, 0.3)',
                      border: '1px solid rgba(255, 255, 255, 0.04)',
                      borderRadius: '10px',
                      padding: '0.75rem 1rem',
                    }}
                  >
                    <span style={{ fontSize: '0.95rem', color: '#cbd5e1', fontWeight: 500 }}>
                      {g.description}
                    </span>
                    <span
                      style={{
                        backgroundColor: color.bg,
                        color: color.text,
                        border: `1px solid ${color.border}`,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {statusLabel[g.status] ?? g.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
