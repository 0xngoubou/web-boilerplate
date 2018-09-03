import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Index from '@/page/index';
import Todo from '@/page/todo';
import Footer from '@/layout/footer';
import './style/index.scss';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'TEST_SAGA',
    });
  }

  render() {
    return (
      <div>
        <main className="app__main">
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={Index} />
              <Route path="/todo" component={Todo} />
              <Route component={() => (<div>404 Not found</div>)} />
            </Switch>
          </BrowserRouter>
        </main>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  app: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    app: state.app,
    user: state.user,
  };
}

export default connect(mapStateToProps)(App);
