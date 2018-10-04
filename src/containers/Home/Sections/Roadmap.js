import React from 'react';
import PropTypes from 'prop-types';
import Slider from "react-slick";

import withI18N from 'shared/intl/withI18N';

@withI18N
export default class Roadmap extends React.PureComponent {

  static propTypes = {
    i18n: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    const { i18n } = props;

    this.sliderSettings = {
      arrows: false,
      infinite: false,
      speed: 500,
      dots: false,
      focusOnSelect: true,
      responsive: [
        {
          breakpoint: 5000,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 780,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 415,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    this.ROADMAP = [
      { title: i18n('home.section.roadmap.item.title'), desc: i18n({ id: 'home.section.roadmap.item.desc' }, 'html') },
      { title: i18n('home.section.roadmap.item.title'), desc: i18n({ id: 'home.section.roadmap.item.desc' }, 'html') },
      { title: i18n('home.section.roadmap.item.title'), desc: i18n({ id: 'home.section.roadmap.item.desc' }, 'html') },
      { title: i18n('home.section.roadmap.item.title'), desc: i18n({ id: 'home.section.roadmap.item.desc' }, 'html') },
      { title: i18n('home.section.roadmap.item.title'), desc: i18n({ id: 'home.section.roadmap.item.desc' }, 'html') },
      { title: i18n('home.section.roadmap.item.title'), desc: i18n({ id: 'home.section.roadmap.item.desc' }, 'html') },
    ];

    this.state = {
      sliderIndex: 0,
      sliderFocusIndex: 0,
    };
  }

  selectItem = (e) => {
    this.setState({
      sliderIndex: parseInt(e.currentTarget.getAttribute('data-index'), 10),
    });
  }

  sliderItemsRender = () => {
    const { sliderIndex } = this.state;

    return this.ROADMAP.map((road, index) => {
      const selectedClass = sliderIndex === index ? 'selected' : '';

      return (
        <div key={`roadmap_${index}`}>
          <div className={`roadmap-item ${selectedClass}`} onClick={this.selectItem} data-index={index}>
            <p className="title">{road.title}</p>
            <ul>
              <li>Launch Exchange Beta</li>
              <li>Run Bug Bounty Campaign</li>
              <li>Delivery the first shipment of DINNGO cold wallets</li>
              <li>Keep the first response of customer support standard to be within 1 day</li>
            </ul>
          </div>
        </div>
      );
    });
  }

  render() {
    const { i18n } = this.props;

    return (
      <section id="roadmap" className="section-roadmap">
        <div className="section row pure-g">
          <div className="pure-u-1">
            <h2 className="section-title">{i18n({ id: 'section.exchange.title' }, 'html')}</h2>
          </div>

          <div className="pure-u-1">
            <Slider {...this.sliderSettings}>
              {this.sliderItemsRender()}
            </Slider>
          </div>
        </div>
      </section>
    );
  }
}

