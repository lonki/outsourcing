import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

import Header from './Elementor/Header';
import Footer from './Elementor/Footer';
import AdCountDown from './Elementor/AdCountDown';


const closePreloaderPage = () => {
  $('#pagePreloader').addClass('hide');
};

export default class App extends React.Component {
  static propTypes = {
    location: PropTypes.object,
    children: PropTypes.object,
  };

  componentDidMount() {
    closePreloaderPage();
  }

  render() {
    const { location: { pathname } } = this.props;
    const countdownClass = __OPEN_COUNTDOWN__ ? 'up' : '';
    return (
      <React.Fragment>
        <Header pathname={pathname} />
        {this.props.children}
        <Footer className={countdownClass} />
        <a className={`fixed-button ${countdownClass}`} target="_blank" rel="noopener noreferrer" href="https://t.me/DINNGO" />
        {__OPEN_COUNTDOWN__ &&
          <AdCountDown />
        }
      </React.Fragment>
    );
  }
}

