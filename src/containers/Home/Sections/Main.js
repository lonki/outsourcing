import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Subscription, ViewPortAnimation } from 'components';

import { setEmailSubscription } from 'redux/modules/member';

import withI18N from 'shared/intl/withI18N';

@connect(
  state => ({
    setEmailSubscriptionPending: state.member.get('setEmailSubscriptionPending'),
    setEmailSubscriptionSuc: state.member.get('setEmailSubscriptionSuc'),
    setEmailSubscriptionErr: state.member.get('setEmailSubscriptionErr'),
  }), {
    setEmailSubscription,
  },
)
@withI18N
export default class Main extends React.PureComponent {

  static propTypes = {
    i18n: PropTypes.func.isRequired,
    setEmailSubscriptionPending: PropTypes.bool.isRequired,
    setEmailSubscriptionSuc: PropTypes.bool.isRequired,
    setEmailSubscriptionErr: PropTypes.bool.isRequired,
    setEmailSubscription: PropTypes.func.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    const { setEmailSubscriptionPending, setEmailSubscriptionSuc, setEmailSubscriptionErr } = this.props;
    const {
      setEmailSubscriptionPending: nextSetEmailSubscriptionPending,
      setEmailSubscriptionSuc: nextSetEmailSubscriptionSuc,
      setEmailSubscriptionErr: nextSetEmailSubscriptionErr,
    } = nextProps;

    if (!setEmailSubscriptionPending && nextSetEmailSubscriptionPending) {
      this.subscription.reset();
    }

    if (!setEmailSubscriptionSuc && nextSetEmailSubscriptionSuc) {
      this.subscription.openSucText();
    }

    if (!setEmailSubscriptionErr && nextSetEmailSubscriptionErr) {
      this.subscription.openFailText();
    }
  }

  render() {
    const { i18n } = this.props;

    return (
      <section className="section-mainly">
        <div className="section row pure-g">
          <div className="pure-u-1-2 section-content">
            <h2 className="section-title">{i18n('home.section.main.title')}</h2>
            <p className="section-msg">{i18n('home.section.main.desc')}</p>
            <Subscription ref={ref => { this.subscription = ref; }} onClick={this.props.setEmailSubscription} />
          </div>
        </div>
        <div className="rate-link">
          <a href="https://www.trackico.io/ico/dinngo/" target="_blank" className="left-link" rel="noopener noreferrer">
            <div className="link-img ico-track" />
            <span className="rate">4</span>
            <span className="rate small">.6</span>
          </a>
          <a href="https://icobench.com/ico/dinngo" target="_blank" rel="noopener noreferrer">
            <div className="link-img ico-bench" />
            <span className="rate">5</span>
            <span className="rate small">.0</span>
          </a>
        </div>
        <div className="section-mainly-bg-container">
          <ViewPortAnimation addClassName="section-mainly-bg-animation">
            <div className="section-mainly-bg" />
          </ViewPortAnimation>
        </div>
      </section>
    );
  }
}

