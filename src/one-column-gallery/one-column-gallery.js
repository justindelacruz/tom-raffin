import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { ASSET_BASE_URL, getPageTitle } from '../constants';
import ScrollDownArrow from "../scroll-down-arrow";
import galleryData from '../data.json';
import './one-column-gallery.css';

const GalleryImage = ({ galleryId, item, onLoad }) => (
  <div className="one-column-gallery__item">
    <Link to={`/image/${galleryId}/${item.id}`}>
      <img
        alt={item.name}
        className="gallery__image one-column-gallery__image"
        onLoad={onLoad}
        src={`${ASSET_BASE_URL}/images/full/${item.src}`}
      />
    </Link>
  </div>
);

GalleryImage.propTypes = {
  galleryId: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  onLoad: PropTypes.func.isRequired,
};

class OneColumnGalleryImage extends Component {
  constructor() {
    super();

    this.state = {
      hasAnyImageLoaded: false,
    }
  }

  handleImageLoad = () => {
    this.setState({
      hasAnyImageLoaded: true,
    });
  };

  render() {
    const { match } = this.props;
    const { hasAnyImageLoaded } = this.state;
    const galleryId = match.params.galleryId;
    const gallery = galleryData[galleryId];
    const galleryImages = gallery.items.map(item =>
      <GalleryImage
        galleryId={galleryId}
        item={item}
        key={item.src}
        onLoad={this.handleImageLoad}
      />
    );

    return (
      <DocumentTitle title={getPageTitle(`${gallery.section} - ${gallery.subsection}`)}>
        <div className="one-column-gallery">
          <ScrollDownArrow enabled={hasAnyImageLoaded} />
          { galleryImages.map((galleryImage, i) => galleryImage) }
        </div>
      </DocumentTitle>
    );
  }
}

OneColumnGalleryImage.propTypes = {
  match: PropTypes.object,
};

export default OneColumnGalleryImage;