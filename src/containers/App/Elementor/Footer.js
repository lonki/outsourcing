import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import withI18N from 'shared/intl/withI18N';
import { Subscription } from 'components';
import { setEmailSubscription } from 'redux/modules/member';

@connect(
  state => ({
    member: state.member,
  }), {
    setEmailSubscription,
  },
)
@withI18N
class Footer extends React.PureComponent {

  static propTypes = {
    i18n: PropTypes.func.isRequired,
    setEmailSubscription: PropTypes.func.isRequired,
  };

  render() {
    const { i18n } = this.props;

    return (
      <footer>
        <div className="section row pure-g">
          <div className="pure-u-1-3">
            <h2 className="section-title">{i18n({ id: 'footer.title' }, 'html')}</h2>
          </div>
          <div className="pure-u-2-3">
            <Subscription onClick={this.props.setEmailSubscription} />
          </div>

          <div className="pure-u-1">
            <div className="row pure-g">
              <div className="pure-u-1-8">
                <Link className="share-item" to="/Hiring">item</Link>
              </div>
              <div className="pure-u-1-8">
                <Link className="share-item" to="/Hiring">item</Link>
              </div>
              <div className="pure-u-1-8">
                <Link className="share-item" to="/Hiring">item</Link>
              </div>
              <div className="pure-u-1-8">
                <Link className="share-item" to="/Hiring">item</Link>
              </div>
              <div className="pure-u-1-8">
                <Link className="share-item" to="/Hiring">item</Link>
              </div>
              <div className="pure-u-1-8">
                <Link className="share-item" to="/Hiring">item</Link>
              </div>
              <div className="pure-u-1-8">
                <Link className="share-item" to="/Hiring">item</Link>
              </div>
              <div className="pure-u-1-8">
                <Link className="share-item" to="/Hiring">item</Link>
              </div>
            </div>
          </div>

          <div className="pure-u-1">
            <div className="footer-links">
              <Link className="link" to="/Hiring">Hiring</Link>
              <Link className="link" to="/Hiring">Hiring</Link>
              <Link className="link" to="/Hiring">Hiring</Link>
            </div>
          </div>
        </div>
        <div className="footer-right-bg" />
        <div className="footer-logo logo">
          <Link title="Go to homepage" to="/">
            <div className="logo-img" />
            <span className="logo-text">DINNGO</span>
          </Link>
        </div>
        <p className="copyright">{i18n('footer.copyright')}</p>
      </footer>
    );
  }
}

export default Footer;
