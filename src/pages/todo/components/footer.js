import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants';
import { activeCountSelector, activeTodoListSelector, selectedFilterSelector } from '../selectors';
import { clearCompleted, changeFilter } from '../actions';
import type { Todos } from '../types';

const FILTER_TITLES = {
  SHOW_ALL,
  SHOW_ACTIVE,
  SHOW_COMPLETED,
};

export type Props = {
  activeTodoList: Todos,
  activeCount: number,
  selectedFilter: string,
  changeFilter: Function,
  clearCompleted: Function,
}
type State = {};

class Footer extends Component<void, Props, State> {
  state: State;

  props: Props;

  renderTodoCount = (props) => {
    const itemWord = props.activeCount === 1 ? 'item' : 'items';
    const activeCount = props.activeCount || 'No';
    return (
      <span className="todo-count">
        {`${activeCount} ${itemWord} left`}
      </span>
    );
  }

  renderFilterLink = (filter, props) => {
    const selectedFilter = props.selectedFilter || Object.values(FILTER_TITLES)[0];
    const linkCls = classNames({ selected: filter === selectedFilter });
    return (
      <button
        type="button"
        className={linkCls}
        onClick={() => props.changeFilter(filter)}
      >
        {filter}
      </button>
    );
  }

  renderFilter = props => (
    <ul className="filters">
      {
          Object.keys(FILTER_TITLES).map(key => (
            <li key={key}>
              {this.renderFilterLink(FILTER_TITLES[key], props)}
            </li>
          ))
        }
    </ul>
  )

  renderClearButton = (props) => {
    if (!props.activeCount) return null;
    return (
      <button
        type="button"
        className="clear-completed"
        onClick={() => props.clearCompleted(props.activeTodoList)}
      >
        Clear completed
      </button>
    );
  }

  renderComponent(props) {
    return (
      <div className="footer">
        {this.renderTodoCount(props)}
        {this.renderFilter(props)}
        {this.renderClearButton(props)}
      </div>
    );
  }

  render() {
    return this.renderComponent(this.props);
  }
}

export default connect(
  state => ({
    selectedFilter: selectedFilterSelector(state),
    activeCount: activeCountSelector(state),
    activeTodoList: activeTodoListSelector(state),
  }),
  dispatch => bindActionCreators({ clearCompleted, changeFilter }, dispatch),
)(Footer);
