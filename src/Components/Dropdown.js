import React, { useState, useRef, useEffect } from 'react';
import '../styles/KanbanBoard.css';

function Dropdown({ options }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
        Display
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {/* Grouping section */}
          <div className="dropdown-section">
            <div className="dropdown-section-header">Grouping</div>
            {options.grouping.map((option, index) => (
              <div
                key={index}
                className="dropdown-item"
                onClick={() => {
                  option.action();
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>

          {/* Ordering section */}
          <div className="dropdown-section">
            <div className="dropdown-section-header">Ordering</div>
            {options.ordering.map((option, index) => (
              <div
                key={index}
                className="dropdown-item"
                onClick={() => {
                  option.action();
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
