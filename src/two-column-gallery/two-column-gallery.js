import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import './two-column-gallery.scss';
import { ASSET_BASE_URL, getPageTitle } from '../constants';
import galleryData from '../data.json';
import { Link } from 'react-router-dom';

const GalleryImage = ({ galleryId, item }) => (
  <div className="two-column-gallery__item">
    <Link to={`/image/${galleryId}/${item.id}`}>
      <img className="gallery__image" src={`${ASSET_BASE_URL}/images/thumbs/${item.src}`} alt={item.name} />
    </Link>
  </div>
);

const chunks = function(array, size) {
  const clone = [...array];
  const results = [];
  while (clone.length) {
    results.push(clone.splice(0, size));
  }
  return results;
};

class TwoColumnGalleryImage extends Component {
  render() {
    const { match } = this.props;
    const galleryId = match.params.galleryId;
    const gallery = galleryData[galleryId];
    const galleryImages = gallery.items.map(item =>
      <GalleryImage galleryId={galleryId} item={item} key={item.src} />
    );

    const chunkedGalleryImages = chunks(galleryImages, 2);

    return (
      <DocumentTitle title={getPageTitle(`${gallery.section} - ${gallery.subsection}`)}>
        <div className="two-column-gallery">
          { chunkedGalleryImages.map((chunk, i) => {
            return (
              <div className="two-column-gallery__row" key={i}>
                { chunk.map(image => { return image }) }
              </div>
            );
          })}
        </div>
      </DocumentTitle>
    );
  }
}

TwoColumnGalleryImage.propTypes = {
  match: PropTypes.object,
};

export default TwoColumnGalleryImage;
