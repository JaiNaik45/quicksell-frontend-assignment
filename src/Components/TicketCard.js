import React from 'react';

const priorityIcons = {
  4: '🔴', // Urgent
  3: '🟠', // High
  2: '🟡', // Medium
  1: '🔵', // Low
  0: '⚪', // No priority
};

function TicketCard({ ticket, user }) {
  return (
    <div className="ticket-card">
      <div className="ticket-id">{ticket.id}</div>
      <div className="ticket-title">{ticket.title}</div>
      <div className="ticket-priority">
        {priorityIcons[ticket.priority]} {ticket.priority}
      </div>
      <div className="ticket-tag">{ticket.tag}</div>
      <div className="ticket-user">{user ? user.name : 'Unassigned'}</div>
    </div>
  );
}

export default TicketCard;