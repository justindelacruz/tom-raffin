import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './info.css';

class Info extends Component {
  render() {
    const { name, date, dimension, medium, description, prevLink, nextLink, width } = this.props;

    return (
      <div className="info" style={{ width }}>
        <p className="info__text">
          {name && <strong>{ name } &middot;{' '}</strong> }
          { date && <span>{ date } &middot;{' '}</span> }
          { medium && <span>{medium} &middot;{' '}</span>}
          { dimension && <span className="info__dimension">{ dimension }</span>}
          { description && <span><br />{ description }</span>}
        </p>

        <div className="info__navigation">
          { prevLink && <span><Link to={prevLink}>Prev</Link> / </span> }
          { nextLink && <Link to={nextLink}>Next</Link> }
        </div>
      </div>
    );
  }
}

Info.propTypes = {
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