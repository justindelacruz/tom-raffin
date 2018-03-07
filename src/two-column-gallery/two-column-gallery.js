import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './two-column-gallery.css';
import { ASSET_BASE_URL } from '../constants';
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
    const galleryImages = galleryData[galleryId].items.map(item =>
      <GalleryImage galleryId={galleryId} item={item} key={item.src} />
    );

    const chunkedGalleryImages = chunks(galleryImages, 2);

    return (
      <div className="two-column-gallery">
        { chunkedGalleryImages.map((chunk, i) => {
          return (
            <div className="two-column-gallery__row" key={i}>
              { chunk.map(image => { return image }) }
            </div>
          );
        })}
      </div>
    );
  }
}

TwoColumnGalleryImage.propTypes = {
  match: PropTypes.object,
};

export default TwoColumnGalleryImage;