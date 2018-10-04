import React, { Component } from 'react';
import PropTypes from 'prop-types';

const backdropStyle = {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 1040,
  backgroundColor: 'rgba(0, 0, 0, 0.65)',
};

const modalStyle = {
  position: 'fixed',
  transform: 'translate3d(-50%, -50%, 0)',
  top: '50%',
  left: '50%',
  zIndex: 1050,
};

const contentStyle = {
  margin: 0,
  backgroundColor: 'white',
};

export default class Modal extends Component {

  static propTypes = {
    children: PropTypes.any,
    backdrop: PropTypes.bool,
    onKeyDown: PropTypes.func,
    onEnter: PropTypes.func,
    onEsc: PropTypes.func,
    onHide: PropTypes.func,
    backdropStyle: PropTypes.object,
    modalStyle: PropTypes.object,
    contentStyle: PropTypes.object,
  };

  static defaultProps = {
    backdrop: true,
    backdropStyle: {},
    modalStyle: {},
    contentStyle: {},
  };

  constructor() {
    super();

    this.body = document.body;

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.onListenKeydown = this.onListenKeydown.bind(this);

    this.suppressTouchMoveEvent = (e) => {
      e.preventDefault();
    };

    this.state = {
      hidden: true,
    };
  }

  componentDidUpdate() {
    /*
    if (!this.state.hidden) {
      window.addEventListener('keydown', this.onListenKeydown, true);
    } else {
      window.removeEventListener('keydown', this.onListenKeydown, true);
    }
    */
  }

  componentWillUnmount() {
    //window.removeEventListener('keydown', this.onListenKeydown, true);
  }

  show() {
    const { body } = this;
    const { hidden } = this.state;

    if (hidden) {
      body.className += body.className.length ? ' no-scroll' : 'no-scroll';
      document.addEventListener('touchmove', this.suppressTouchMoveEvent);
    }

    this.setState({
      hidden: false,
    });
  }

  hide() {
    const { body } = this;
    const { onHide } = this.props;
    const { hidden } = this.state;

    if (onHide && typeof onHide === 'function') {
      onHide();
    }

    if (!hidden) {
      body.className = body.className.replace(/ ?no-scroll/, '');
      document.removeEventListener('touchmove', this.suppressTouchMoveEvent);
    }

    this.setState({
      hidden: true,
    });
  }

  onListenKeydown(e) {

    if (this.props.onKeyDown) {
      return this.props.onKeyDown(e);
    }

    if (e.keyCode === 13 || e.keyCode === 27) {
      if (e.keyCode === 13 && this.props.onEnter) this.props.onEnter();
      if (e.keyCode === 27 && this.props.onEsc) this.props.onEsc();
      this.onHide();
    }
  }

  render() {
    const { backdrop } = this.props;
    const { hidden } = this.state;

    const onHideClick = backdrop ? this.hide : () => {};

    if (hidden) {
      return false;
    }

    return (
      <div>
        <div
          style={Object.assign(modalStyle, this.props.modalStyle)}
        >
          <div
            tabIndex="-1"
            style={Object.assign({}, contentStyle, this.props.contentStyle)}
          >
            {this.props.children}
          </div>
        </div>
        <div
          style={Object.assign({}, backdropStyle, this.props.backdropStyle)}
          onClick={onHideClick}
        >
        </div>
      </div>
    );
  }
}
