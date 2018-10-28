import React from 'react';
import PropTypes from 'prop-types';

import withI18N from 'shared/intl/withI18N';

import { CountDownToDate } from 'components';

@withI18N
class AdCountDown extends React.PureComponent {

  static propTypes = {
    i18n: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      isOpen: true,
    };
  }

  onClose = () => {
    this.setState({
      isOpen: false,
    });
  }

  render() {
    const { i18n } = this.props;
    const className = this.state.isOpen ? '' : 'hide';

    return (
      <div className={`fixed-countdown ${className}`}>
        <div className="fixed-countdown-container">
          <span className="close-btn" onClick={this.onClose} />
          <span className="title">{i18n('section.countdown.coming')}</span>
          <CountDownToDate date={__COUNTDOWN_TIME__} isSmall />
          <a className="interested-btn" href={i18n('section.countdown.interested.link')} target="_blank" rel="noopener noreferrer">{`${i18n('section.countdown.interested')}`}</a>
        </div>
        <div className="fixed-mobile-countdown-container">
          <span className="close-btn" onClick={this.onClose} />
          <CountDownToDate date={__COUNTDOWN_TIME__} isXsSmall />
          <span className="title">{i18n('section.countdown.mobile.coming')}</span>
          <a className="interested-btn" href={i18n('section.countdown.interested.link')} target="_blank" rel="noopener noreferrer">{i18n('section.countdown.mobile.more')}</a>
        </div>
      </div>
    );
  }
}

export default AdCountDown;
