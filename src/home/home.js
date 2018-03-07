import React, { Component } from 'react'
import throttle from 'lodash/throttle';
import { Link } from 'react-router-dom';
import { ASSET_BASE_URL } from '../constants';
import './home.css';
import Info from '../image/info';

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
    const { imageHeight } = this.state;
    const infoHeight = (imageHeight / 1024) * 821 || '100%';
    return (
      <div className="home">
        <div className="home__wrapper">
          <Link to="/gallery/oils-14-18" className="home__link">
            <img
              src={`${ASSET_BASE_URL}/images/full/oils/2014-2018/9.jpg`}
              className="home__image" alt="Oil"
              ref={(r) => this.imageRef = r}
              onLoad={this.updateImageHeight}
            />
          </Link>
        </div>
        <div className="home__caption">
          <Info
            name=""
            date="2017"
            dimension="30x26"
            medium="Oil on canvas"
            width={infoHeight}
          />
        </div>
      </div>
    );
  }
}

export default Home;