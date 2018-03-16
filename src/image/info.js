import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './info.css';

class Info extends Component {
  render() {
    const { compress, name, date, dimension, medium, description, prevLink, nextLink, width } = this.props;

    return (
      <div className={classNames('info', { 'info--inline': compress })} style={{ width }}>
        <p className={classNames('info__text', { 'info__text--inline': compress })}>
          {name && <strong>{ name }&nbsp;&middot;&nbsp;</strong> }
          { date && <span>{ date }&nbsp;&middot;&nbsp;</span> }
          { medium && <span>{medium}&nbsp;&middot;&nbsp;</span>}
          { dimension && <span className="info__dimension">{ dimension }</span>}
        </p>

        <div className={classNames('info__navigation', { 'info__navigation--inline': compress })}>
          { prevLink && <span><Link to={prevLink}>Prev</Link> / </span> }
          { nextLink && <Link to={nextLink}>Next</Link> }
        </div>
      </div>
    );
  }
}

Info.propTypes = {
  compress: PropTypes.boolean,
  name: PropTypes.string,
  date: PropTypes.string,
  dimension: PropTypes.string,
  medium: PropTypes.string,
  description: PropTypes.string,
  prevLink: PropTypes.string,
  nextLink: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Info;