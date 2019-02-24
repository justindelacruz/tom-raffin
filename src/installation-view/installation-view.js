import React, { Component } from 'react'
import throttle from 'lodash/throttle';
import { ASSET_BASE_URL } from '../constants';
import './installation-view.css';
import ScrollDownArrow from '../scroll-down-arrow';

class InstallationView extends Component {
  constructor(props) {
    super(props);

    this.imageRef = null;
    this.state = {
      isPageLoaded: false,
      imageHeight: 1000,
    };
  }

  updateImageHeight = () => this.setState({ imageHeight: this.imageRef ? this.imageRef.height : 0 });

  handleResizeWindow = throttle(() => this.updateImageHeight(), 17);

  handleImageLoad = () => {
    this.setState({
      isPageLoaded: true,
    })
  };

  componentDidMount(e) {
    setTimeout(this.updateImageHeight, 0);
    window.addEventListener("resize", this.handleResizeWindow);
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResizeWindow);
  }

  render() {
    const { isPageLoaded } = this.state;

    return (
      <div className="installationView">
        <ScrollDownArrow enabled={isPageLoaded} />
        <div className="installationView__wrapper">
          <picture>
            <source
              srcSet={`${ASSET_BASE_URL}/images/installation-1600.jpg`}
              media="(min-width: 1200px)"
            />
            <source
              srcSet={`${ASSET_BASE_URL}/images/installation-1200.jpg`}
              media="(min-width: 640px)"
            />
            <img
              alt="Gallery"
              className="installationView__image"
              onLoad={this.handleImageLoad}
              src={`${ASSET_BASE_URL}/images/installation/installation-640.jpg`}
            />
          </picture>

        </div>
      </div>
    );
  }
}

export default InstallationView;