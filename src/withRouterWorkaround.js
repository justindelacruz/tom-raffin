import { withRouter } from 'react-router';

// TODO: Fix it such that we don't need workaround for this error:
// Warning: withRouter(RegisterModal): Function components do not support contextType.
// https://github.com/facebook/react/issues/14061
const withRouterWorkaround = (Inner) => {
  const Wrapped = (props) => <Inner {...props}/>;
  Wrapped.displayName = `WithRouterWorkaround(${Inner.displayName || Inner.name || '?'})`;
  return withRouter(Wrapped);
}

export default withRouterWorkaround;
