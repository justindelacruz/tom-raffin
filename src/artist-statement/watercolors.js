import React from 'react';
import DocumentTitle from 'react-document-title';
import { ASSET_BASE_URL, getPageTitle } from '../constants';
import './artist-statement.scss';

const WatercolorStatement = () => (
  <DocumentTitle title={getPageTitle('Watercolors - Artist Statement')}>
    <div className="artist-statement">
      <h1>Artist Statement</h1>

      <section className="content-block content-block--reverse">
        <div className="content-block__body">
          <h2>Watercolors</h2>

          <p>
            My watercolor practice spans over 35 years, during which I have steadily developed a distinct, personal
            style of painting. The watercolors are small and intimate impressions made with one of the most subtle of
            painting mediums, but they are at the same time bold and expressive. These works consist of dynamic shapes
            and vibrant colors, and represent my visual exploration of the people, places, and experiences that have
            filled my life. Through my stylized translation of the world around me into vivid planes of color, texture,
            and pattern, I strive to create a unique pictorial space that plays between qualities of both abstraction
            and representation.
          </p>
        </div>
        <div className="content-block__image about__image">
          <img src={`${ASSET_BASE_URL}/images/tom-watercolor.jpg`} alt="Tom Raffin painting watercolor" />
        </div>
      </section>
    </div>
  </DocumentTitle>
);

export default WatercolorStatement;
