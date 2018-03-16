import React, { Component } from 'react';
import throttle from 'lodash/throttle';
import { Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import DocumentTitle from 'react-document-title';
import { ASSET_BASE_URL, getPageTitle } from '../constants';
import './image.css';
import Info from './info';
import galleryData from '../data.json';

class Image extends Component {
  constructor(props) {
    super(props);

    this.imageRef = null;
    this.state = {
      imageHeight: 1000,
    };
  }

  updateImageHeight = () => {
    console.log('updateImageHeight', this.imageRef);
    return this.setState({ imageHeight: this.imageRef ? this.imageRef.height : 0 });
  };

  handleResizeWindow = throttle(() => this.updateImageHeight(), 17);

  componentDidUpdate(prevProps) {
    if (prevProps.match.url !== this.props.match.url) {
      this.updateImageHeight();
    }
  }

  componentDidMount(e) {
    console.log('componentDidMount');
    this.updateImageHeight();
    window.addEventListener("resize", this.handleResizeWindow);
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResizeWindow);
  }

  render() {
    const { match } = this.props;
    const { imageHeight } = this.state;
    const { galleryId, imageId } = match.params;
    const gallery = galleryData[galleryId];
    const images = gallery.items;
    const index = images.findIndex((item) => {
      return imageId === item.id.toString();
    });
    const galleryImage = images[index];
    const infoHeight = (imageHeight / galleryImage.height) * galleryImage.width || '100%';

    const hasPrev = index-1 >= 0;
    const hasNext = index+1 < images.length-1;
    const prevImage = hasPrev ? galleryData[galleryId].items[index-1] : null;
    const nextImage = hasNext ? galleryData[galleryId].items[index+1] : null;
    const prevLink = hasPrev ? `/image/${galleryId}/${prevImage.id}` : `/gallery/${galleryId}`;
    const nextLink = hasNext ? `/image/${galleryId}/${nextImage.id}` : `/gallery/${galleryId}`;

    return (
      <DocumentTitle title={getPageTitle(`${galleryImage.name || index+1} - ${gallery.section} - ${gallery.subsection}`)}>
        <div className="image">
          <TransitionGroup className="image__transition-wrapper">
            <CSSTransition key={galleryImage.src} classNames="image__fade" timeout={750}>
              <div className="image__item-wrapper">
                <div className="image__item">
                  <div className="image__overlay">
                    <Link to={prevLink} className="image__overlay-button image__overlay-button--prev">
                      <i className="material-icons image__overlay-icon">navigate_before</i>
                    </Link>
                    <Link to={nextLink} className="image__overlay-button image__overlay-button--next">
                      <i className="material-icons image__overlay-icon">navigate_next</i>
                    </Link>
                  </div>

                  <img
                    src={`${ASSET_BASE_URL}/images/full/${galleryImage.src}`}
                    alt={galleryImage.name}
                    className="image__image"
                    ref={(r) => this.imageRef = r}
                    onLoad={this.onImageLoad}
                  />

                  { // Preload previous image
                    hasPrev &&
                    <img
                      src={`${ASSET_BASE_URL}/images/full/${prevImage.src}`}
                      alt={prevImage.name}
                      className="image__item--hidden"
                    />
                  }

                  { // Preload next image
                    hasNext &&
                    <img
                      src={`${ASSET_BASE_URL}/images/full/${nextImage.src}`}
                      className="image__item--hidden"
                      alt={nextImage.name}
                    />
                  }
                </div>

                <Info
                  name={galleryImage.name}
                  date={galleryImage.date}
                  dimension={galleryImage.dimension}
                  medium={galleryImage.medium}
                  description={galleryImage.description}
                  prevLink={prevLink}
                  nextLink={nextLink}
                  width={infoHeight}
                  compress={galleryId.indexOf('oils') !== -1}
                />
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </DocumentTitle>
    );
  }
}

export default Image;