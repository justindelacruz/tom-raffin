import React from 'react';
import DocumentTitle from 'react-document-title';
import { ASSET_BASE_URL, getPageTitle } from '../constants';
import './artist-statement.css';

const OilStatement = () => (
  <DocumentTitle title={getPageTitle('Oils - Artist Statement')}>
    <div className="artist-statement">
      <h1>Artist Statement</h1>

      <section className="content-block content-block--reverse">
        <div className="content-block__body">
          <h2>Oils</h2>

          <p>
            For a number of years, I have been experimenting with oil painting. It has been an exciting opportunity to
            further explore elements of my long-standing watercolor practice, while learning new techniques and expanding
            the themes of my work. Initially concentrating on still life and landscapes, in the same vein as my
            watercolor work, my focus has slowly shifted towards the human figure. Bold outlines, vibrant colors and
            patterned backgrounds echo the graphic, stylized quality of my watercolor work, and counterpoint the softer,
            more subtle realism of the figure. Each figure mirrors its accompanying pattern, creating an interplay
            between seemingly disparate approaches to form.
          </p>

          <p>
            In my current series of oil paintings, the central figure is the rump, the bottom, the rear end, the
            derrière-- more simply put: The Butt. These paintings are spirited and playful. The butts are not heavily
            eroticized, but they are also not denied their identity as a locus of pleasure and desire. Focusing on a
            zone of the body that is often unregarded and sometimes found offensive, these tender, detailed renderings
            offer the butt center stage. In many ways, these pieces are portraits. They subvert the standard bust view
            of the figure and portray identity through perhaps the most unassuming part of the body.
          </p>
        </div>
        <div className="content-block__image about__image">
          <picture>
            <source
              srcSet={`${ASSET_BASE_URL}/images/tom-oils-1600.jpg`}
              media="(min-width: 1200px)"
            />
            <source
              srcSet={`${ASSET_BASE_URL}/images/tom-oils-1200.jpg`}
              media="(min-width: 640px)"
            />
            <img src={`${ASSET_BASE_URL}/images/tom-oils-640.jpg`} alt="Tom Raffin painting oil" />
          </picture>
        </div>
      </section>
    </div>
  </DocumentTitle>
);

export default OilStatement;