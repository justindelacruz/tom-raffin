import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import RouteContext from './route-context';
import withRouterWorkaround from './withRouterWorkaround';

class ScrollToTop extends PureComponent {
  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const { previousRoute } = this.context;

    if (location.pathname !== prevProps.location.pathname && prevProps.location.pathname !== previousRoute) {
      this.context.updateRouteContext(prevProps.location.pathname);
    }

    if (location !== prevProps.location && previousRoute !== '/gallery/oils-14-18') {
      window.scrollTo(0, 0)
    }
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

ScrollToTop.propTypes = {
  location: PropTypes.object.isRequired,
};

ScrollToTop.contextType = RouteContext;

export default withRouterWorkaround(ScrollToTop)
