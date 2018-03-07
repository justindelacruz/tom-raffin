import React from 'react';
import { Link } from 'react-router-dom';
import './contact.css';

const Thanks = () => (
  <div className="contact">
    <h1>Thank you!</h1>

    <div className="content-block">
      <div className="content-block__body contact__body">
        <p>
          Your message was sent successfully. If needed, Tom will get back to you soon.
        </p>

        <p>
          <Link to="/">Back to Home Page</Link>
        </p>
      </div>
    </div>
  </div>
);

export default Thanks;