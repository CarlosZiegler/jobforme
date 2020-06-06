import React from 'react';
import { FiMapPin, FiMail } from 'react-icons/fi';
import { FaLinkedin } from 'react-icons/fa';

function Card(props) {
  const { name, cargo, linkedin, email, cidade } = props;

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-name">{name}</h3>

        <p className="card-position">{cargo}</p>

      </div>
      <div className="card-body">
        <p className="contact-info lowercase linkedin">
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
            {' '}

          </a>
          <FiMapPin />
          {' '}
          {' '}
          {cidade}
        </p>
        <p className="contact-info lowercase">
          <FiMail />
          {' '}
          {' '}
          <a href={`mailto:${email}`}>{email}</a>
        </p>
        <p className="contact-info" />
      </div>
    </div>
  );
}

export default Card;
