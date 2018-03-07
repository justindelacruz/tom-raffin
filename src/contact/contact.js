import React from 'react';
import './contact.css';

const Contact = () => (
  <div className="contact">
    <h1>Contact Tom</h1>

    <div className="content-block">
      <div className="content-block__body contact__body">
        <form method="POST" action="http://formspree.io/justin.delacruz+formspree@gmail.com">
          <input type="email" name="_replyto" placeholder="Your email" />
          <input type="hidden" name="_next" value="//www.tomraffin.com" />
          <input type="text" name="_gotcha" style={{ display: 'none' }} />
          <textarea name="message" placeholder="Your message" rows={5} />
          <input type="submit" value="Send Message to Tom" />
        </form>
      </div>
    </div>
  </div>
);

export default Contact;