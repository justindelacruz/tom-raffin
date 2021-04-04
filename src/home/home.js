import React, { Component } from 'react'
import throttle from 'lodash/throttle';
import { Link } from 'react-router-dom';
import { ASSET_BASE_URL } from '../constants';
import './home.scss';

class Home extends Component {
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
      <div className="home">
        <div className="home__wrapper">
          <Link to="/installation" className="home__link">
            <picture>
              <source
                srcSet={`${ASSET_BASE_URL}/images/home-1600.jpg`}
                media="(min-width: 1200px)"
              />
              <source
                srcSet={`${ASSET_BASE_URL}/images/home-1200.jpg`}
                media="(min-width: 640px)"
              />
              <img
                alt="Gallery"
                className="installationView__image"
                src={`${ASSET_BASE_URL}/images/home-640.jpg`}
                ref={(r) => this.imageRef = r}
              />
            </picture>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
