import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import { Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import DocumentTitle from 'react-document-title';
import { ASSET_BASE_URL, getPageTitle } from '../constants';
import './image.scss';
import Info from './info';
import galleryData from '../data.json';
import RouteContext from "../route-context";
import withRouterWorkaround from '../withRouterWorkaround';

class Image extends PureComponent {
  constructor(props) {
    super(props);

    this.imageRef = null;
    this.state = {
      imageHeight: 1000,
    };
  }

  updateImageHeight = () => {
    return this.setState({ imageHeight: this.imageRef ? this.imageRef.height : 0 });
  };

  handleResizeWindow = throttle(() => this.updateImageHeight(), 17);

  componentDidUpdate(prevProps) {
    if (prevProps.match.url !== this.props.match.url) {
      this.updateImageHeight();
    }
  }

  componentDidMount(e) {
    this.updateImageHeight();
    window.addEventListener("resize", this.handleResizeWindow);
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResizeWindow);
  }

  render() {
    const { history, match } = this.props;
    const { imageHeight } = this.state;
    const { previousRoute } = this.context;
    const { galleryId, imageId } = match.params;
    const gallery = galleryData[galleryId];
    const images = gallery.items;
    const index = images.findIndex((item) => {
      return imageId === item.id.toString();
    });
    const galleryImage = images[index];
    const infoHeight = (imageHeight / galleryImage.height) * galleryImage.width || '100%';

    // If previous route is single-column gallery, use history.goBback() to preserve scroll location
    const isPrevRouteSingleColumnGallery = previousRoute === '/gallery/oils-14-18';

    const hasPrev = index-1 >= 0;
    const hasNext = index+1 < images.length-1;
    const prevImage = hasPrev ? galleryData[galleryId].items[index-1] : null;
    const nextImage = hasNext ? galleryData[galleryId].items[index+1] : null;
    const homeLink = `/gallery/${galleryId}`;
    // const prevLink = hasPrev ? `/image/${galleryId}/${prevImage.id}` : homeLink;
    // const nextLink = hasNext ? `/image/${galleryId}/${nextImage.id}` : homeLink;

    return (
      <DocumentTitle title={getPageTitle(`${galleryImage.name || index+1} - ${gallery.section} - ${gallery.subsection}`)}>
        <div className="image">
          <TransitionGroup className="image__transition-wrapper">
            <CSSTransition key={galleryImage.src} classNames="image__fade" timeout={750}>
              <div className="image__item-wrapper">
                <div className="image__item">
                  <div className="image__overlay">
                    { isPrevRouteSingleColumnGallery ?
                      <a
                        href={homeLink}
                        onClick={(e) => { e.preventDefault(); history.goBack(); }}
                        className="image__overlay-button image__overlay-button--home"
                      >
                        <i className="material-icons image__overlay-icon">navigate_before</i>
                      </a>
                    :
                      <Link to={homeLink} className="image__overlay-button image__overlay-button--home">
                        <i className="material-icons image__overlay-icon">navigate_before</i>
                      </Link>
                    }
                    {/*
                    <Link to={prevLink} className="image__overlay-button image__overlay-button--prev">
                      <i className="material-icons image__overlay-icon">navigate_before</i>
                    </Link>

                    <Link to={nextLink} className="image__overlay-button image__overlay-button--next">
                      <i className="material-icons image__overlay-icon">navigate_next</i>
                    </Link>
                    */}
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

Image.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

Image.contextType = RouteContext;

export default withRouterWorkaround(Image);
