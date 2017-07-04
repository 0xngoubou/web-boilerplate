import { connect } from 'react-redux';
import invariant from 'utils/invariant';

import authWrapper from './authWrapper';
import FailureComponent from './failureComponent';
import locationHelperBuilder from './locationHelper';

export default function connectedRouterRedirect(args) {
    const allArgs = {
        FailureComponent,
        allowRedirectBack: true,
        redirectQueryParamName: 'redirect',
        authenticatingSelector: () => false,
        ...args,
    };

    const {
        redirectPath,
        authenticatedSelector,
        authenticatingSelector,
        allowRedirectBack,
        redirectQueryParamName,
    } = allArgs;

    const { createRedirectLoc } = locationHelperBuilder({
        redirectQueryParamName,
    });

    let redirectPathSelector;
    if (typeof redirectPath === 'string') {
        redirectPathSelector = () => redirectPath;
    } else if (typeof redirectPath === 'function') {
        redirectPathSelector = redirectPath;
    } else {
        invariant(false, 'redirectPath must be either a string or a function');
    }

    let allowRedirectBackFn;
    if (typeof allowRedirectBack === 'boolean') {
        allowRedirectBackFn = () => allowRedirectBack;
    } else if (typeof allowRedirectBack === 'function') {
        allowRedirectBackFn = allowRedirectBack;
    } else {
        invariant(false, 'allowRedirectBack must be either a boolean or a function');
    }
    const redirect = (replace) => (props, path) =>
        replace(createRedirectLoc(allowRedirectBackFn(props, path))(props, path));

    const getRouterRedirect = ({ history }) => history.replace;

    return (DecoratedComponent) =>
        connect((state, ownProps) => ({
            redirectPath: redirectPathSelector(state, ownProps),
            isAuthenticated: authenticatedSelector(state, ownProps),
            isAuthenticating: authenticatingSelector(state, ownProps),
            redirect: redirect(getRouterRedirect(ownProps)),
        }))(authWrapper(allArgs)(DecoratedComponent));
};
