import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import withI18N from 'shared/intl/withI18N';
import { Subscription } from 'components';
import { setEmailSubscription } from 'redux/modules/member';

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
class Footer extends React.PureComponent {

  static propTypes = {
    i18n: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
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
    const { i18n, className } = this.props;

    return (
      <footer className={className}>
        <div className="section row pure-g">
          <div className="pure-u-1-1 pure-u-md-1-3">
            <h2 className="section-title">{i18n({ id: 'footer.title' }, 'html')}</h2>
          </div>
          <div className="pure-u-1-1 pure-u-md-2-3 footer-email">
            <Subscription ref={ref => { this.subscription = ref; }} onClick={this.props.setEmailSubscription} />
          </div>

          <div className="pure-u-1 text-center">
            <div className="row pure-g social-list">
              <div className="pure-u-1-8">
                <a className="icon-social icon-social-telegram" target="_blank" rel="noopener noreferrer" href="https://t.me/DINNGO" />
              </div>
              <div className="pure-u-1-8">
                <a className="icon-social icon-social-twitter" target="_blank" rel="noopener noreferrer" href="https://twitter.com/dinngohq" />
              </div>
              <div className="pure-u-1-8">
                <a className="icon-social icon-social-fb" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/dinngohq" />
              </div>
              <div className="pure-u-1-8">
                <a className="icon-social icon-social-medium" target="_blank" rel="noopener noreferrer" href="https://medium.com/dinngo-exchange" />
              </div>
              <div className="pure-u-1-8">
                <a className="icon-social icon-social-youtube" target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UCb3O5Ek9JGd2v9kWp08c1xQ" />
              </div>
              <div className="pure-u-1-8">
                <a className="icon-social icon-social-bitcoin" target="_blank" rel="noopener noreferrer" href="https://bitcointalk.org/index.php?topic=4948105.0" />
              </div>
              <div className="pure-u-1-8">
                <a className="icon-social icon-social-linkedin" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/company/dinngo/" />
              </div>
              <div className="pure-u-1-8">
                <a className="icon-social icon-social-reddit" target="_blank" rel="noopener noreferrer" href="https://www.reddit.com/r/DINNGO/" />
              </div>
            </div>
          </div>

          <div className="pure-u-1">
            <div className="footer-links">
              <a className="link" target="_blank" rel="noopener noreferrer" href="https://dinngo.workable.com/">{i18n('footer.link.a')}</a>
              <a className="link" target="_blank" rel="noopener noreferrer" href="https://about.dinngo.co/statement">{i18n('footer.link.b')}</a>
              <a className="link" target="_blank" rel="noopener noreferrer" href="https://about.dinngo.co/agreement">{i18n('footer.link.c')}</a>
            </div>
          </div>
        </div>
        <div className="footer-right-bg" />
        <div className="footer-logo logo">
          <a className="link" rel="noopener noreferrer" href="/">
            <div className="logo-img" />
          </a>
        </div>
        <p className="copyright">{i18n('footer.copyright')}</p>
      </footer>
    );
  }
}

export default Footer;
