// src/Card.jsx
import React from 'react';

function Card({ data }) {
  const { name, title, avatar, bio, skills, email } = data;

  const cardStyle = {
    width: '350px',
    backgroundColor: '#fff',
    borderRadius: '20px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    textAlign: 'center',
    padding: '30px 20px'
  };

  const imgContainerStyle = {
    position: 'relative',
    marginBottom: '20px'
  };

  const imageStyle = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    border: '5px solid #fff',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    objectFit: 'cover'
  };

  const skillBadgeStyle = {
    display: 'inline-block',
    padding: '4px 12px',
    margin: '4px',
    backgroundColor: '#f4e1ec',
    color: '#7f2477',
    borderRadius: '15px',
    fontSize: '0.8rem',
    fontWeight: '500'
  };

  const buttonStyle = {
    marginTop: '25px',
    padding: '10px 30px',
    backgroundColor: '#bc42a2',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background 0.3s'
  };

  return (
    <div style={cardStyle}>
      <div style={imgContainerStyle}>
        <img src={avatar} alt={name} style={imageStyle} />
      </div>
      
      <h2 style={{ margin: '10px 0', color: '#333' }}>{name}</h2>
      <h4 style={{ color: '#bc42a2', fontWeight: '500', marginBottom: '15px' }}>{title}</h4>
      
      <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.5' }}>
        {bio}
      </p>

      <div style={{ margin: '20px 0' }}>
        {skills.map((skill, index) => (
          <span key={index} style={skillBadgeStyle}>{skill}</span>
        ))}
      </div>

    </div>
  );
}

export default Card;