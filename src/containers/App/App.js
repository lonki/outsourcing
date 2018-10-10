import React from 'react';
import PropTypes from 'prop-types';
import Header from './Elementor/Header';
import Footer from './Elementor/Footer';
import $ from 'jquery';

const closePreloaderPage = () => {
  $('#pagePreloader').addClass('hide');
};

export default class App extends React.Component {
  static propTypes = {
    location: PropTypes.object,
    children: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    closePreloaderPage();
  }

  render() {
    const { location: { pathname } } = this.props;
    return (
      <React.Fragment>
        <Header pathname={pathname} />
        {this.props.children}
        <Footer />
        <a className="fixed-button" target="_blank" rel="noopener noreferrer" href="https://t.me/DINNGO" />
      </React.Fragment>
    );
  }
}

