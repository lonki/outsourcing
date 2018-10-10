import React from 'react';
import PropTypes from 'prop-types';
import VisibilitySensor from 'react-visibility-sensor';
import classNames from 'classnames';
import isMobile from 'ismobilejs';

export default class ViewPortAnimation extends React.PureComponent {

  static propTypes = {
    children: PropTypes.object.isRequired,
    onlyFirstTime: PropTypes.bool,
    addClassName: PropTypes.string,
    isVisibleCallback: PropTypes.func,
  };

  static defaultProps = {
    onlyFirstTime: true,
    addClassName: '',
    isVisibleCallback: () => {},
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      isVisible: false,
    };
  }

  onVisibility = (isVisible) => {
    const { onlyFirstTime, isVisibleCallback } = this.props;

    if (isVisible) {
      this.setState({
        isVisible: true,
      });
      isVisibleCallback();
    } else if (!onlyFirstTime) {
      this.setState({
        isVisible: false,
      });
    }
  }

  getPassClassChildren = () => {
    const { children, addClassName } = this.props;
    const { isVisible } = this.state;
    const newClass = isVisible ? addClassName : 'hidden';

    if (!children) {
      return false;
    }

    return React.cloneElement(children, {
      className: classNames(children.props.className, newClass),
    });
  }

  render() {
    const offsetTop = isMobile.any ? 75 : 175;
    return (
      <VisibilitySensor offset={{ top: offsetTop }} onChange={this.onVisibility} partialVisibility resizeDelay={100}>
        {this.getPassClassChildren()}
      </VisibilitySensor>
    );
  }
}
