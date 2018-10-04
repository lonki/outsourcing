import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
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
      <footer>
        <div className="section row pure-g">
          <div className="pure-u-1-3">
            <h2 className="section-title">{i18n({ id: 'footer.title' }, 'html')}</h2>
          </div>
          <div className="pure-u-2-3 footer-email">
            <Subscription ref={ref => { this.subscription = ref; }} onClick={this.props.setEmailSubscription} />
          </div>

          <div className="pure-u-1 text-center">
            <div className="row pure-g social-list">
              <div className="pure-u-1-8">
                <Link className="icon-social icon-social-telegram" to="https://t.me/DINNGO_Official"></Link>
              </div>
              <div className="pure-u-1-8">
                <Link className="icon-social icon-social-twitter" to="https://twitter.com/dinngohq"></Link>
              </div>
              <div className="pure-u-1-8">
                <Link className="icon-social icon-social-fb" to="https://www.facebook.com/dinngohq"></Link>
              </div>
              <div className="pure-u-1-8">
                <Link className="icon-social icon-social-medium" to="https://medium.com/dinngo-exchange"></Link>
              </div>
              <div className="pure-u-1-8">
                <Link className="icon-social icon-social-youtube" to="https://www.youtube.com/channel/UCb3O5Ek9JGd2v9kWp08c1xQ"></Link>
              </div>
              <div className="pure-u-1-8">
                <Link className="icon-social icon-social-bitcoin" to=""></Link>
              </div>
              <div className="pure-u-1-8">
                <Link className="icon-social icon-social-linkedin" to="https://www.linkedin.com/company/dinngo/"></Link>
              </div>
              <div className="pure-u-1-8">
                <Link className="icon-social icon-social-reddit" to="https://www.reddit.com/r/DINNGO/"></Link>
              </div>
            </div>
          </div>

          <div className="pure-u-1">
            <div className="footer-links">
              <Link className="link" to="https://dinngo.workable.com/">{i18n('footer.link.a')}</Link>
              <Link className="link" to="https://crowdsale-files.dinngo.co/terms/privacy-policy">{i18n('footer.link.b')}</Link>
              <Link className="link" to="https://crowdsale-files.dinngo.co/terms/terms-of-use">{i18n('footer.link.c')}</Link>
              <Link className="link" to="http://support.dinngo.co/">{i18n('footer.link.d')}</Link>
            </div>
          </div>
        </div>
        <div className="footer-right-bg" />
        <div className="footer-logo logo">
          <Link title="Go to homepage" to="/">
            <div className="logo-img" />
            <span className="logo-text">{i18n('common.logo')}</span>
          </Link>
        </div>
        <p className="copyright">{i18n('footer.copyright')}</p>
      </footer>
    );
  }
}

export default Footer;
