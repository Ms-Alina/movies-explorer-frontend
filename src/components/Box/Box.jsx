import React, { useState, useEffect, useCallback } from 'react';
import './Box.css';
import Nav from '../Nav/Nav';

const Box = ({ isLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBox = () => {
    setIsOpen(!isOpen);
  };

  const closeBox = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeBox();
      }
    };

    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);
  }, [isOpen, closeBox]);

  return (
    <div className="box">
      <button className="box__burger-btn" onClick={toggleBox}></button>
      {isOpen && <div className="box__overlay" onClick={closeBox}></div>}
      <div
        onClick={(e) => (e.target.href ? closeBox() : '')}
        className={`box__container ${isOpen ? 'box__container_open' : ''}`}
      >
        <button className="box__close-btn" onClick={closeBox}></button>

        <Nav isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
};

export default Box;
