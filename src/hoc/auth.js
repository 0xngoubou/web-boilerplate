import locationHelperBuilder from './locationHelper';
import connectedRouterRedirect from './redirect';

import Loading from './components/Loading';

const locationHelper = locationHelperBuilder({});

export const userIsAuthenticated = connectedRouterRedirect({
    redirectPath: '/login',
    authenticatedSelector: state => state.user.data !== null,
    authenticatingSelector: state => state.user.isLoading,
    AuthenticatingComponent: Loading,
    wrapperDisplayName: 'UserIsAuthenticated',
});

export const userIsAdmin = connectedRouterRedirect({
    redirectPath: '/',
    allowRedirectBack: false,
    authenticatedSelector: state => state.user.data !== null && state.user.data.isAdmin,
    predicate: user => user.isAdmin,
    wrapperDisplayName: 'UserIsAdmin',
});

export const userIsNotAuthenticated = connectedRouterRedirect({
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/foo',
    allowRedirectBack: false,
  // Want to redirect the user when they are done loading and authenticated
    authenticatedSelector: state => state.user.data === null && state.user.isLoading === false,
    wrapperDisplayName: 'UserIsNotAuthenticated',
});
