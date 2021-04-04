import _ from 'lodash';
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames';
import './scroll-down-arrow.scss';

const SCROLL_THRESHOLD = 150;

class ScrollDownArrow extends Component {
  constructor() {
    super();

    this.state = {
      hasDismissed: false,
      yOffset: window.pageYOffset,
    };

    this.removeScrollListener();
  }

  handleScroll = () => {
    const { hasDismissed } = this.state;
    const yOffset = window.pageYOffset;

    this.setState({
      hasDismissed: hasDismissed || yOffset > SCROLL_THRESHOLD,
      yOffset,
    });

    if (yOffset > SCROLL_THRESHOLD) {
      this.removeScrollListener();
    }
  };

  handleScrollThrottle = _.throttle(this.handleScroll, 30);

  componentDidMount() {
    window.addEventListener('scroll', this.handleScrollThrottle);
  }

  componentWillUnmount() {
    this.removeScrollListener();
  }

  removeScrollListener() {
    window.removeEventListener('scroll', this.handleScrollThrottle);
  }

  render() {
    const { enabled } = this.props;
    const { hasDismissed, yOffset } = this.state;
    const containerClasses =
      classnames("scroll-down-arrow", {
        'scroll-down-arrow__visible': enabled && !hasDismissed && yOffset < SCROLL_THRESHOLD,
      });

    return (
      <div className={containerClasses}>
        <i className="material-icons scroll-down-arrow__icon" onClick={this.toggleNav}>keyboard_arrow_down</i>
      </div>
    )
  }
}

ScrollDownArrow.propTypes = {
  enabled: PropTypes.bool.isRequired,
};

export default ScrollDownArrow;
