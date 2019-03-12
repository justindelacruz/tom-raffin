import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import LazyLoad from 'react-lazyload';
import { ASSET_BASE_URL, getPageTitle } from '../constants';
import ScrollDownArrow from "../scroll-down-arrow";
import galleryData from '../data.json';
import Info from '../image/info';
import './one-column-gallery.css';

const GalleryImage = ({ galleryId, height, item, onLoad }) => (
  <div className="one-column-gallery__item">
    <LazyLoad height={height} once>
      <img
        alt={item.name}
        className="gallery__image one-column-gallery__image"
        onLoad={onLoad}
        src={`${ASSET_BASE_URL}/images/full/${item.src}`}
      />
    </LazyLoad>
    <Info
      date={item.date}
      dimension={item.dimension}
      medium={item.medium}
      name={item.name}
    />
  </div>
);

GalleryImage.propTypes = {
  galleryId: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
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
        height={item.height}
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