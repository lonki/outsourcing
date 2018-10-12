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
      swipeToSlide: true,
      touchThreshold: 10,
      responsive: [
        {
          breakpoint: 5000,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 980,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 568,
          settings: {
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    this.ROADMAP = [
      {
        title: i18n('section.roadmap.card.title.1'),
        cards: [
          i18n('section.roadmap.card.1.1'),
          i18n('section.roadmap.card.1.2'),
          i18n('section.roadmap.card.1.3'),
          i18n('section.roadmap.card.1.4'),
        ],
      },
      {
        title: i18n('section.roadmap.card.title.2'),
        cards: [
          i18n('section.roadmap.card.2.1'),
          i18n('section.roadmap.card.2.2'),
          i18n('section.roadmap.card.2.3'),
        ],
      },
      {
        title: i18n('section.roadmap.card.title.3'),
        cards: [
          i18n('section.roadmap.card.3.1'),
          i18n('section.roadmap.card.3.2'),
        ],
      },
      {
        title: i18n('section.roadmap.card.title.4'),
        cards: [
          i18n('section.roadmap.card.4.1'),
          i18n('section.roadmap.card.4.2'),
        ],
      },
      {
        title: i18n('section.roadmap.card.title.5'),
        cards: [
          i18n('section.roadmap.card.5.1'),
          i18n('section.roadmap.card.5.2'),
          i18n('section.roadmap.card.5.3'),
        ],
      },
      {
        title: i18n('section.roadmap.card.title.6'),
        cards: [
          i18n('section.roadmap.card.6.1'),
          i18n('section.roadmap.card.6.2'),
        ],
      },
    ];

    this.state = {
      sliderIndex: 0,
      sliderFocusIndex: 0,
    };
  }

  selectItem = (e) => {
    const sliderIndex = parseInt(e.currentTarget.getAttribute('data-index'), 10);
    this.setState({
      sliderIndex,
    });

    this.slider.slickGoTo(sliderIndex);
  }

  sliderItemsRender = () => {
    const { sliderIndex } = this.state;

    return this.ROADMAP.map((road, index) => {
      const selectedClass = sliderIndex === index ? 'selected' : '';
      const { cards } = road;

      return (
        <div key={`roadmap_${index}`}>
          <div className={`roadmap-item ${selectedClass}`} onClick={this.selectItem} data-index={index}>
            <p className="title">{road.title}</p>
            <ul>
              { this.sliderItemDetailRender(cards) }
            </ul>
          </div>
        </div>
      );
    });
  }

  sliderItemDetailRender = (cards) => {
    return cards.map((card) => {
      return (
        <li key={card}>{card}</li>
      );
    });
  }

  next = () => {
    this.slider.slickNext();
  }

  prev = () => {
    this.slider.slickPrev();
  }

  render() {
    const { i18n } = this.props;

    return (
      <section id="roadmap" className="section-roadmap">
        <div className="section row pure-g">
          <div className="pure-u-1">
            <h2 className="section-title">{i18n({ id: 'section.roadmap.title' }, 'html')}</h2>
            <div className="arrow">
              <div className="arrow-left" onClick={this.prev} />
              <div className="arrow-right" onClick={this.next} />
            </div>
          </div>

          <div className="pure-u-1">
            <Slider ref={(slider) => { this.slider = slider; }} {...this.sliderSettings}>
              {this.sliderItemsRender()}
            </Slider>
          </div>
        </div>
      </section>
    );
  }
}

