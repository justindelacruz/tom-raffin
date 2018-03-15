import React from 'react';
import './bio.css';
import DocumentTitle from 'react-document-title';
import { ASSET_BASE_URL, getPageTitle } from '../constants';

const Bio = () => (
  <DocumentTitle title={getPageTitle('Bio')}>
    <div className="bio">
      <h1>About Tom Raffin</h1>

      <section className="content-block content-block--reverse">
        <div className="content-block__body">
          <p>
            Tom Raffin is an artist, physician, teacher, scientist, and businessman living and working in San Francisco.
          </p>

          <p>
            Tom received a B.A. from Stanford University and an M.D. from Stanford University School of Medicine, and
            completed his medical residency at the Peter Bent Brigham Hospital in Boston. Tom spent 25 years on the
            faculty at Stanford University School of Medicine where he is the Colleen and Robert Haas Professor Emeritus
            of Medicine and Biomedical Ethics, former Chief of Pulmonary and Critical Care Medicine, and Co-Founder
            and Director Emeritus of the Stanford University Center for Biomedical Ethics. He has written over 200
            articles, chapters and books. He co-founded Rigel Pharmaceuticals, Inc., a South San Francisco drug discovery
            company in 1996. In 2001, Tom co-founded Telegraph Hill Partners, a life sciences growth equity investment
            firm where he was a senior partner. He is currently the vice chairman of the board of directors of the
            National AIDS Memorial Grove in Golden Gate Park, San Francisco.
          </p>

          <p>
            Tom has enjoyed art and painting since boyhood. For the past 35 years, he has built a rich and rewarding
            studio practice based upon independent exploration and invaluable support and mentorship from such artists
            as Dan Mendelowitz, Mark Adams, and Beth Van Hoesen. His work has been shown at Thomas Reynolds Gallery in
            San Francisco, and Richard Sumner Gallery in Palo Alto, CA.
          </p>
        </div>
        <div className="content-block__image about__image">
          <img src={`${ASSET_BASE_URL}/images/tom.jpg`} alt="Tom Raffin" />
        </div>
      </section>
    </div>
  </DocumentTitle>
);

export default Bio;