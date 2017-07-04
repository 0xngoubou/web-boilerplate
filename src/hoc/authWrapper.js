import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatic from 'hoist-non-react-statics';

export default (args) => {
    const cfg = {
        LoadingComponent: () => null,
        FailureComponent: () => null,
        wrapperDisplayName: 'AuthWrapper',
        ...args,
    };

    const { LoadingComponent, FailureComponent, wrapperDisplayName } = cfg;

    function enhance(WrappedComponent) {
        const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

        class AuthWrapper extends Component {
            static displayName = `${wrapperDisplayName}(${displayName})`;

            static propTypes = {
                isAuthenticated: PropTypes.bool,
                isAuthenticating: PropTypes.bool,
            };

            static defaultProps = {
                isAuthenticating: false,
                isAuthenticated: false,
            };

            renderComponent = (props) => {
                if (props.isAuthenticated) {
                    return <WrappedComponent {...props} />;
                } else if (props.isAuthenticating) {
                    return <LoadingComponent {...props} />;
                }
                return <FailureComponent {...props} />;
            };

            render() {
                return this.renderComponent(this.props, this.state);
            }
        }

        return hoistNonReactStatic(AuthWrapper, WrappedComponent);
    }

    return enhance;
};
