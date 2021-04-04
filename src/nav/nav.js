import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import './nav.scss';
import { Link } from 'react-router-dom';

const NavSubSectionComponent = ({ route, routeFragment = route, text, onClick, location: { pathname } }) => (
  <li className={classNames('nav__subsection', {'nav__subsection--active': pathname.includes(routeFragment)})}>
    <Link to={route} onClick={onClick}>{text}</Link>
  </li>
);

const NavSubSection = withRouter(NavSubSectionComponent);

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state =  {
      isNavOpen: false,
    }
  }

  toggleNav = () => {
    const { isNavOpen } = this.state;
    this.setState({ isNavOpen: !isNavOpen });
    document.body.classList.toggle('nav__body--open', !isNavOpen)
  };

  closeNav = () => {
    this.setState({ isNavOpen: false });
    document.body.classList.remove('nav__body--open')
  };

  render () {
    const { location: { pathname } } = this.props;

    if (pathname === '/') {
      return null;
    }

    return (
      <nav className="nav">
        <Link to="/main" className="nav__title">
          Tom Raffin
        </Link>

        <i className="material-icons nav__icon" onClick={this.toggleNav}>menu</i>

        <div className={classNames('nav__menu-container', { 'nav__menu-container--active': this.state.isNavOpen })}>
          <i className="material-icons nav__icon material-icons nav__icon--menu" onClick={this.toggleNav}>close</i>

          <ul className="nav__menu">
            <li className={classNames('nav__section nav__section--text')}>
              Oils
            </li>
            <NavSubSection route="/about/oils" text="Artist Statement" onClick={this.toggleNav} />
            <NavSubSection route="/installation" text="Installation View" onClick={this.toggleNav} />
            <NavSubSection route="/gallery/oils-14-18" routeFragment="oils-14-18" text="2014-2018" onClick={this.toggleNav} />

          </ul>

          <ul className="nav__menu">
            <li className="nav__section nav__section--text">
              Watercolors
            </li>
            <NavSubSection route="/about/watercolors" text="Artist Statement" onClick={this.toggleNav} />
            <NavSubSection route="/gallery/watercolors-featured" routeFragment="watercolors-featured" text="Featured" onClick={this.closeNav} />
            <NavSubSection route="/gallery/watercolors-07-10" routeFragment="watercolors-07-10" text="2007-2010" onClick={this.closeNav} />
            <NavSubSection route="/gallery/watercolors-00-05" routeFragment="watercolors-00-05" text="2000-2005" onClick={this.closeNav} />
            <NavSubSection route="/gallery/watercolors-90-99" routeFragment="watercolors-90-99" text="1990-1999" onClick={this.closeNav} />
            <NavSubSection route="/gallery/watercolors-80-89" routeFragment="watercolors-80-89" text="1980-1989" onClick={this.closeNav} />
          </ul>

          <ul className="nav__menu nav__menu--minor">
            <li className={classNames('nav__section', {'nav__section--active': pathname === '/bio'})}>
              <Link to="/bio" onClick={this.toggleNav}>Bio</Link>
            </li>
            <li className={classNames('nav__section', {'nav__section--active': pathname === '/contact'})}>
              <Link to="/contact" onClick={this.toggleNav}>Contact</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

Nav.proptypes = {
  location: PropTypes.object,
};

export default withRouter(Nav);
