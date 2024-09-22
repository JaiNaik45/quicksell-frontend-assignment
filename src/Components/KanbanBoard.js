import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import TicketCard from './TicketCard';
import { fetchData } from '../utils/api';
import '../styles/KanbanBoard.css';

const priorityMap = {
  4: 'Urgent',
  3: 'High',
  2: 'Medium',
  1: 'Low',
  0: 'No priority'
};

function KanbanBoard() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState('status');
  const [sortBy, setSortBy] = useState('priority');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData()
      .then(data => {
        setTickets(data.tickets);
        setUsers(data.users);
        setIsLoading(false);
      })
      .catch(err => {
        setError('Failed to load data. Please try again later.');
        setIsLoading(false);
      });
  }, []);

  const groupTickets = () => {
    return tickets.reduce((acc, ticket) => {
      let key;
      if (groupBy === 'status') {
        key = ticket.status;
      } else if (groupBy === 'priority') {
        key = priorityMap[ticket.priority];
      } else {
        key = ticket.userId;
      }
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(ticket);
      return acc;
    }, {});
  };

  const sortTickets = (tickets) => {
    return [...tickets].sort((a, b) => {
      if (sortBy === 'priority') {
        return b.priority - a.priority;
      } else {
        return a.title.localeCompare(b.title);
      }
    });
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const groupedTickets = groupTickets();
  const options = {
    grouping: [
      { label: "Group by Status", action: () => setGroupBy('status') },
      { label: "Group by User", action: () => setGroupBy('user') },
      { label: "Group by Priority", action: () => setGroupBy('priority') },
    ],
    ordering: [
      { label: "Sort by Priority", action: () => setSortBy('priority') },
      { label: "Sort by Title", action: () => setSortBy('title') },
    ]
  };
  

  return (
    <div className="kanban-board">
      <div className="board-header">

        <Dropdown
            options={options}
        />
      </div>
      <div className="columns">
        {Object.entries(groupedTickets).map(([group, groupTickets]) => (
          <div key={group} className="column">
            <h2>{group}</h2>
            {sortTickets(groupTickets).map(ticket => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                user={users.find(user => user.id === ticket.userId)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;