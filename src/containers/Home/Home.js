import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import VisibilitySensor from 'react-visibility-sensor';
import { connect } from 'react-redux';

import { setSectionViewPort } from 'redux/modules/app';

import withI18N from 'shared/intl/withI18N';

import Main from './Sections/Main';
import Exchange from './Sections/Exchange';
import Economics from './Sections/Economics';
import Team from './Sections/Team';
import Advisors from './Sections/Advisors';
import Media from './Sections/Media';
import Roadmap from './Sections/Roadmap';

@connect(
  state => ({
  }), {
    setSectionViewPort,
  },
)
@withI18N
export default class Home extends Component {
  static propTypes = {
    i18n: PropTypes.func.isRequired,
    setSectionViewPort: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const { i18n } = this.props;

    document.title = i18n('home.meta.title');
    $('meta[name=description]').remove();
    $('head').append('<meta name="description" content="' + i18n('home.meta.description') + '">');
  }

  exchangeOnVisibility = (isVisible) => {
    if (isVisible) {
      this.props.setSectionViewPort('exchange');
    }
  }

  tokenOnVisibility = (isVisible) => {
    if (isVisible) {
      this.props.setSectionViewPort('economics');
    }
  }

  teamOnVisibility = (isVisible) => {
    if (isVisible) {
      this.props.setSectionViewPort('team');
    }
  }

  mediaOnVisibility = (isVisible) => {
    if (isVisible) {
      this.props.setSectionViewPort('media');
    }
  }

  roadmapOnVisibility = (isVisible) => {
    if (isVisible) {
      this.props.setSectionViewPort('roadmap');
    }
  }

  render() {
    return (
      <main>
        <div className="home">
          <Main />

          <VisibilitySensor onChange={this.exchangeOnVisibility} partialVisibility resizeDelay={100}>
            <Exchange />
          </VisibilitySensor>

          <VisibilitySensor onChange={this.tokenOnVisibility} partialVisibility resizeDelay={100}>
            <Economics />
          </VisibilitySensor>

          <VisibilitySensor onChange={this.teamOnVisibility} partialVisibility resizeDelay={100}>
            <React.Fragment>
              <Team />
              <Advisors />
            </React.Fragment>
          </VisibilitySensor>

          <VisibilitySensor onChange={this.mediaOnVisibility} partialVisibility resizeDelay={100}>
            <Media />
          </VisibilitySensor>

          <VisibilitySensor onChange={this.roadmapOnVisibility} partialVisibility resizeDelay={100}>
            <Roadmap />
          </VisibilitySensor>
        </div>
      </main>
    );
  }
}
