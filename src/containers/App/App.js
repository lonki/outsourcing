import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import withI18N from 'shared/intl/withI18N';

import Header from './Elementor/Header';
import Footer from './Elementor/Footer';
import AdCountDown from './Elementor/AdCountDown';


const closePreloaderPage = () => {
  $('#pagePreloader').addClass('hide');
};

@withI18N
export default class App extends React.Component {
  static propTypes = {
    location: PropTypes.object,
    children: PropTypes.object,
    i18n: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    closePreloaderPage();
  }

  render() {
    const { location: { pathname }, i18n } = this.props;
    const countdownClass = __OPEN_COUNTDOWN__ ? 'up' : '';
    return (
      <React.Fragment>
        <Header pathname={pathname} />
        {this.props.children}
        <Footer />
        <a className={`fixed-button ${countdownClass}`} target="_blank" rel="noopener noreferrer" href="https://t.me/DINNGO" />
        {__OPEN_COUNTDOWN__ &&
          <AdCountDown />
        }
      </React.Fragment>
    );
  }
}

