import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import './gallery.css';
import { ASSET_BASE_URL, getPageTitle } from '../constants';
import galleryData from '../data.json';
import Masonry from 'masonry-layout';
import ImagesLoaded from 'imagesloaded';
import { Link } from 'react-router-dom';

const GalleryImage = ({ galleryId, item }) => (
  <div className="gallery__grid-item">
    <Link to={`/image/${galleryId}/${item.id}`}>
      <img className="gallery__image" src={`${ASSET_BASE_URL}/images/thumbs/${item.src}`} alt={item.name} />
    </Link>
  </div>
);

class Gallery extends Component {
  componentDidMount() {
    this.renderMasonry();
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: {
          galleryId
        }
      }
    } = this.props;

    if (galleryId !== prevProps.match.params.galleryId) {
      this.renderMasonry();
    }
  }

  renderMasonry() {
    ImagesLoaded(this.gridEl, () => {
      new Masonry(this.gridEl, {
        itemSelector: '.gallery__grid-item',
        percentPosition: true,
        gutter: 20,
      })
    });
  }

  render() {
    const { match } = this.props;
    const galleryId = match.params.galleryId;
    const gallery = galleryData[galleryId];
    const galleryImages = gallery.items.map((item, i) => {
      return <GalleryImage galleryId={galleryId} item={item} key={item.src} />;
    });

    return (
      <DocumentTitle title={getPageTitle(`${gallery.section} - ${gallery.subsection}`)}>
        <div className="gallery">
          <div className="gallery__grid" ref={el => this.gridEl = el}>
            { galleryImages }
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

Gallery.propTypes = {
  match: PropTypes.object,
};

export default Gallery;