import React from 'react';
import PropTypes from 'prop-types';
import withI18N from 'shared/intl/withI18N';
import { CountDownToDate } from 'components';

@withI18N
export default class CountDown extends React.PureComponent {

  static propTypes = {
    i18n: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { i18n } = this.props;

    return (
      <section className="section-countdown">
        <div className="section row pure-g">
          <div className="pure-u-1-1 section-content">
            <div className="left-section">
              <h2 className="section-title">{i18n('section.countdown.title')}</h2>
              <p className="section-msg">{i18n('section.countdown.desc')}</p>
              <a className="section-btn" href="#" target="_blank" rel="noopener noreferrer">{i18n('section.countdown.interested')}</a>
            </div>

            <div className="right-section">
              <CountDownToDate date={__COUNTDOWN_TIME__} />
            </div>

            <div className="pure-hidden-xs rate-link">
              <a href="https://www.trackico.io/ico/dinngo/" className="left-link" target="_blank" rel="noopener noreferrer">
                <div className="link-img ico-track" />
                <span className="rate">{i18n('home.trackico.rate.left')}</span>
                <span className="rate small">{i18n('home.trackico.rate.right')}</span>
              </a>
              <a href="https://icobench.com/ico/dinngo" target="_blank" rel="noopener noreferrer">
                <div className="link-img ico-bench" />
                <span className="rate">{i18n('home.icobench.rate.left')}</span>
                <span className="rate small">{i18n('home.icobench.rate.right')}</span>
              </a>
            </div>
          </div>
        </div>
        <div className="rate-link desktop-rate-link">
          <a href="https://www.trackico.io/ico/dinngo/" target="_blank" className="left-link" rel="noopener noreferrer">
            <div className="link-img ico-track" />
            <span className="rate">{i18n('home.trackico.rate.left')}</span>
            <span className="rate small">{i18n('home.trackico.rate.right')}</span>
          </a>
          <a href="https://icobench.com/ico/dinngo" target="_blank" rel="noopener noreferrer">
            <div className="link-img ico-bench" />
            <span className="rate">{i18n('home.icobench.rate.left')}</span>
            <span className="rate small">{i18n('home.icobench.rate.right')}</span>
          </a>
        </div>

        <div className="section-mobile row pure-g">
          <div className="pure-u-1-1">
            <h2 className="section-title">{i18n({ id: 'section.countdown.mobile.title' }, 'html')}</h2>
          </div>
          <div className="pure-u-1-1">
            <CountDownToDate date={__COUNTDOWN_TIME__} />
          </div>
          <div className="pure-u-1-1 mobile-center">
            <p className="section-msg">{i18n('section.countdown.desc')}</p>
          </div>
          <div className="pure-u-1-1 mobile-center">
            <a className="section-btn" href="#" target="_blank" rel="noopener noreferrer">{i18n('section.countdown.interested')}</a>
          </div>
        </div>
      </section>
    );
  }
}

