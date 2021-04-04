import React, { Component } from 'react'
import throttle from 'lodash/throttle';
import { Link } from 'react-router-dom';
import { ASSET_BASE_URL } from '../constants';
import './landing.scss';

class Landing extends Component {
  constructor(props) {
    super(props);

    this.imageRef = null;
    this.state = {
      imageHeight: 1000,
    };
  }

  updateImageHeight = () => this.setState({ imageHeight: this.imageRef ? this.imageRef.height : 0 });

  handleResizeWindow = throttle(() => this.updateImageHeight(), 17);

  componentDidMount(e) {
    setTimeout(this.updateImageHeight, 0);
    window.addEventListener("resize", this.handleResizeWindow);
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResizeWindow);
  }

  render() {
    return (
      <div className="landing">
        <div className="landing__wrapper">
          <Link to="/main" className="landing__link">
            <img
              src={`${ASSET_BASE_URL}/images/gallery.jpg`}
              className="landing__image"
              alt="Gallery"
            />
          </Link>
          <div className="landing__enter">
            <Link to="/main" className="landing__link">
              enter
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
