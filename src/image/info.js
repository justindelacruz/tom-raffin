import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './info.css';

class Info extends Component {
  render() {
    const { compress, name, date, dimension, medium, width } = this.props;

    return (
      <div className={classNames('info', { 'info--inline': compress })} style={{ width }}>
        <p className={classNames('info__text', { 'info__text--inline': compress })}>
          {name && <strong>{ name }&nbsp;&middot;&nbsp;</strong> }
          { date && <span>{ date }&nbsp;&middot;&nbsp;</span> }
          { medium && <span>{medium}&nbsp;&middot;&nbsp;</span>}
          { dimension && <span className="info__dimension">{ dimension }</span>}
        </p>
      </div>
    );
  }
}

Info.propTypes = {
  compress: PropTypes.bool,
  name: PropTypes.string,
  date: PropTypes.string,
  dimension: PropTypes.string,
  medium: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Info;