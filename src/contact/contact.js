import React from 'react';
import DocumentTitle from 'react-document-title';
import { getPageTitle } from '../constants';
import './contact.scss';

const Contact = () => (
  <DocumentTitle title={getPageTitle('Contact')}>
    <div className="contact">
      <h1>Contact Tom</h1>

      <div className="content-block">
        <div className="content-block__body contact__body">
          <form action="https://formspree.io/f/mrgrgelw" method="POST">
            <input type="email" required name="email" placeholder="Your email" />
            <input type="hidden" name="_subject" value="A message from tomraffin.com" />
            <input type="text" name="_gotcha" style={{ display: 'none' }} />
            <textarea required name="message" placeholder="Your message" rows={5} />
            <input type="submit" value="Send Message to Tom" />
          </form>
        </div>
      </div>
    </div>
  </DocumentTitle>
);

export default Contact;
