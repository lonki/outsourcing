import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Scrollchor from 'react-scrollchor';
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';
import CSSTransition from 'react-transition-group/CSSTransition';
import $ from 'jquery';

import withI18N from 'shared/intl/withI18N';

@connect(
  state => ({
    viewPort: state.app.get('viewPort'),
  }), {
  },
)
@withI18N
class Header extends React.PureComponent {

  static propTypes = {
    i18n: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    viewPort: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    const { i18n } = this.props;

    this.MENU_LIST = [
      { path: 'exchange', text: i18n('header.feature') },
      { path: 'economics', text: i18n('header.token') },
      { path: 'team', text: i18n('header.team') },
      { path: 'media', text: i18n('header.media') },
      { path: 'roadmap', text: i18n('header.roadmap') },
    ];

    this.iScrollOptions = {
      scrollX: true,
      scrollY: false,
    };

    this.state = {
      openMenu: false,
      isScroll: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps, prevState) {
    const { openMenu } = this.state;
    const { openMenu: prevOpenMenu } = prevState;

    if (!prevOpenMenu && openMenu) {
      $('body').addClass('lock');
    }

    if (prevOpenMenu && !openMenu) {
      $('body').removeClass('lock');
    }
  }

  handleScroll = () => {
    this.setState({
      isScroll: document.documentElement.scrollTop > 0,
    });
  }

  handleCloseMenu = () => {
    this.setState({
      openMenu: false,
    });
  }

  handleToggleMenu = () => {
    const { openMenu } = this.state;

    this.setState({
      openMenu: !openMenu,
    });
  }

  renderMenuList() {
    const { viewPort } = this.props;
    const { MENU_LIST } = this;
    const animate = { offset: 0, duration: 300 };
    return MENU_LIST.map((item, index) => {
      const currentClass = item.path === viewPort ? 'current' : '';

      return (
        <li
          key={`menu_item${index}`}
          className={currentClass}
          onClick={this.handleCloseMenu}
        >
          <Scrollchor to={item.path} animate={animate} className="nav-link">{item.text}</Scrollchor>
        </li>
      );
    });
  }

  render() {
    const { i18n } = this.props;
    const { openMenu, isScroll } = this.state;
    const zIndex = openMenu ? '250' : '';
    const openClass = openMenu ? 'open' : '';
    const scrollClass = isScroll ? 'scrolling' : '';

    return (
      <header className={`header ${scrollClass}`} style={{ zIndex }}>
        <div className="row pure-g">
          <div className="pure-u-1 ">
            <div className="logo">
              <a className="link" rel="noopener noreferrer" href="/">
                <div className="logo-img" />
                <span className="logo-text">{i18n('common.logo')}</span>
              </a>
            </div>

            <div className="nav-wrap">
              <div
                className={`nav-hamburger ${openClass}`}
                onClick={this.handleToggleMenu}
              >
                <span /><span />
              </div>

              <ul className="nav">
                {this.renderMenuList()}
                <li>
                  <a className="nav-link" target="_blank" rel="noopener noreferrer" href="http://support.dinngo.co/">{i18n('header.faq')}</a>
                </li>
              </ul>

              <CSSTransition
                classNames="mobile-nav"
                timeout={500}
                in={openMenu}
                mountOnEnter
                unmountOnExit
              >
                <div className="mobile-nav">
                  <div className="mobile-nav-content">
                    <ul>
                      {this.renderMenuList()}
                      <li>
                        <a className="nav-link" target="_blank" rel="noopener noreferrer" href="http://support.dinngo.co/">{i18n('header.faq')}</a>
                      </li>
                    </ul>
                    <div className="mobile-nav-white-paper">
                      <a title="White Paper" href="https://crowdsale-files.dinngo.co/whitepaper" className="mobile-btn" target="_blank" rel="noopener noreferrer">{i18n('header.white.paper')}</a>
                    </div>
                    <ReactIScroll iScroll={iScroll} options={this.iScrollOptions}>
                      <div className="social-list">
                          <a className="icon-social icon-social-telegram" target="_blank" rel="noopener noreferrer" href="https://t.me/DINNGO_Official" />
                          <a className="icon-social icon-social-twitter" target="_blank" rel="noopener noreferrer" href="https://twitter.com/dinngohq" />
                          <a className="icon-social icon-social-fb" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/dinngohq" />
                          <a className="icon-social icon-social-medium" target="_blank" rel="noopener noreferrer" href="https://medium.com/dinngo-exchange" />
                          <a className="icon-social icon-social-bitcoin" target="_blank" rel="noopener noreferrer" href="https://bitcointalk.org/index.php?topic=4948105.0" />
                          <a className="icon-social icon-social-linkedin" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/company/dinngo/" />
                          <a className="icon-social icon-social-reddit" target="_blank" rel="noopener noreferrer" href="https://www.reddit.com/r/DINNGO/" />
                      </div>
                    </ReactIScroll>
                  </div>
                </div>
              </CSSTransition>
            </div>

            <a title="White Paper" href="https://crowdsale-files.dinngo.co/whitepaper" className="btn" target="_blank" rel="noopener noreferrer">{i18n('header.white.paper')}</a>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
