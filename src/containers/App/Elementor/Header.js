import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Scrollchor from 'react-scrollchor';
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
      { path: 'exchange', text: i18n('header.about') },
      { path: 'economics', text: i18n('header.token') },
      { path: 'team', text: i18n('header.team') },
      { path: 'roadmap', text: i18n('header.roadmap') },
    ];

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
              <Link title="Go to homepage" to="/">
                <div className="logo-img" />
                <span className="logo-text">DINNGO</span>
              </Link>
            </div>

            <div className="nav-wrap">
              <div
                className={`nav-hamburger ${openClass}`}
                onClick={this.handleToggleMenu}
              >
                <span /><span />
              </div>

              <ul className="nav">
                { this.renderMenuList() }
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
                      { this.renderMenuList() }
                    </ul>

                    <a title="White Paper" href="#" className="mobile-btn" target="_blank" rel="noopener noreferrer">{i18n('header.white.paper')}</a>
                  </div>
                </div>
              </CSSTransition>
            </div>

            <a title="White Paper" href="#" className="btn" target="_blank" rel="noopener noreferrer">{i18n('header.white.paper')}</a>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
