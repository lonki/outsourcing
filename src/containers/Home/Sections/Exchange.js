import React from 'react';
import PropTypes from 'prop-types';
import Slider from "react-slick";
import TextTruncate from 'react-text-truncate';

import { Modal, ViewPortAnimation } from 'components';

import withI18N from 'shared/intl/withI18N';

const MOBILE_SLIDER_SETTINGS = {
  arrows: false,
  infinite: false,
  speed: 1000,
  dots: true,
  centerMode: true,
  centerPadding: '40px',
  swipeToSlide: true,
  touchThreshold: 10,
  autoplay: true,
  autoplaySpeed: 4000,
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
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};


@withI18N
export default class Exchange extends React.PureComponent {

  static propTypes = {
    i18n: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    const { i18n } = props;

    this.grids = [
      { title: i18n('section.exchange.grids.a.title'), desc: i18n({ id: 'section.exchange.grids.a.desc' }, 'html') },
      { title: i18n('section.exchange.grids.b.title'), desc: i18n({ id: 'section.exchange.grids.b.desc' }, 'html') },
      { title: i18n('section.exchange.grids.c.title'), desc: i18n({ id: 'section.exchange.grids.c.desc' }, 'html') },
      { title: i18n('section.exchange.grids.d.title'), desc: i18n({ id: 'section.exchange.grids.d.desc' }, 'html') },
      { title: i18n('section.exchange.grids.e.title'), desc: i18n({ id: 'section.exchange.grids.e.desc' }, 'html') },
      { title: i18n('section.exchange.grids.f.title'), desc: i18n({ id: 'section.exchange.grids.f.desc' }, 'html') },
    ];
  }

  openVideo = () => {
    this.videoModal.show();
  }

  closeVideo = () => {
    this.videoModal.hide();
  }

  sliderItemsRender = () => {
    return this.grids.map((item, index) => {
      return (
        <div key={`exchange_${index}`}>
          <div className="slider-item">
            <p className="title">{item.title}</p>
            <p className="desc">{item.desc}</p>
          </div>
        </div>
      );
    });
  }

  render() {
    const { i18n } = this.props;

    return (
      <section id="exchange" className="section-exchange">
        <div className="section-exchange-bg" />
        <div className="section row pure-g">
          <div className="section-exchange-right-bg" />
          <div className="section-exchange-bg-bottom">
            <div className="bg-icon" />
            <div className="bg-icon" />
            <div className="bg-icon" />
            <div className="bg-icon" />
          </div>

          <div className="section-exchange-features pure-u-1-1 pure-u-sm-1-2">
            <h2 className="section-title">{i18n({ id: 'section.exchange.title' }, 'html')}</h2>
            <p className="section-msg pure-u-1">{i18n('section.exchange.desc')}</p>
          </div>

          <div className="section-exchange-video-container pure-u-1-1 pure-u-sm-1-2 text-center section-exchange-video-shadow">
            <div className="section-exchange-video" onClick={this.openVideo} />
          </div>

          <div className="pure-u-1-1 pure-u-sm-1-3 list-container">
            <div className="list-img list-img-a"></div>
            <div className="list-desc">
              <p className="title">{i18n('section.exchange.list.a.title')}</p>
              <span>{i18n({ id: 'section.exchange.list.a.desc' }, 'html')}</span>
            </div>
          </div>
          <div className="pure-u-1-1 pure-u-sm-1-3 list-container">
            <div className="list-img list-img-b"></div>
            <div className="list-desc">
              <p className="title">{i18n('section.exchange.list.b.title')}</p>
              <span>{i18n({ id: 'section.exchange.list.b.desc' }, 'html')}</span>
            </div>
          </div>
          <div className="pure-u-1-1 pure-u-sm-1-3 list-container">
            <div className="list-img list-img-c"></div>
            <div className="list-desc">
              <p className="title">{i18n('section.exchange.list.c.title')}</p>
              <span>{i18n({ id: 'section.exchange.list.c.desc' }, 'html')}</span>
            </div>
          </div>

          <div className="pure-u-1">
            <h2 className="section-h3">Other Features</h2>
          </div>
          <ViewPortAnimation addClassName="section-exchange-slider section-exchange-slider-item-left-animation">
            <div className="pure-u-1-3">
              <div className="desktop-slider-item-shadow">
                <div className="desktop-slider-item">
                  <p className="title">{i18n('section.exchange.grids.a.title')}</p>
                  <p className="desc">{i18n('section.exchange.grids.a.desc')}</p>
                </div>
              </div>
              <div className="desktop-slider-item-shadow">
                <div className="desktop-slider-item">
                  <p className="title">{i18n('section.exchange.grids.b.title')}</p>
                  <p className="desc">{i18n('section.exchange.grids.b.desc')}</p>
                </div>
              </div>
              <div className="desktop-slider-item-shadow">
                <div className="desktop-slider-item">
                  <p className="title">{i18n('section.exchange.grids.c.title')}</p>
                  <p className="desc">{i18n('section.exchange.grids.c.desc')}</p>
                </div>
              </div>
            </div>
          </ViewPortAnimation>
          <ViewPortAnimation addClassName="section-exchange-slider section-exchange-slider-item-center-animation">
            <div className="pure-u-1-3 desktop-slider-circle-container">
              <div className="desktop-slider-circle">
                <div className="desktop-slider-circle-2" />
                <div className="desktop-slider-circle-3" />
              </div>
              <div className="section-exchange-loader">
                <div className="loader-circle loader-circle-left" />
                <div className="loader-circle loader-circle-right loader-circle-delay" />
              </div>
            </div>
          </ViewPortAnimation>
          <ViewPortAnimation addClassName="section-exchange-slider section-exchange-slider-item-right-animation">
            <div className="pure-u-1-3 text-right">
              <div className="desktop-slider-item-shadow">
                <div className="desktop-slider-item">
                  <p className="title">{i18n('section.exchange.grids.d.title')}</p>
                  <p className="desc">{i18n('section.exchange.grids.d.desc')}</p>
                </div>
              </div>
              <div className="desktop-slider-item-shadow">
                <div className="desktop-slider-item">
                  <p className="title">{i18n('section.exchange.grids.e.title')}</p>
                  <p className="desc">{i18n('section.exchange.grids.e.desc')}</p>
                </div>
              </div>
              <div className="desktop-slider-item-shadow">
                <div className="desktop-slider-item">
                  <p className="title">{i18n('section.exchange.grids.f.title')}</p>
                  <p className="desc">{i18n('section.exchange.grids.f.desc')}</p>
                </div>
              </div>
            </div>
          </ViewPortAnimation>

          <div className="mobile-slider-circle-container pure-hidden-xs pure-u-1-1">
            <div className="mobile-slider-circle">
              <div className="mobile-slider-circle-2" />
              <div className="mobile-slider-circle-3" />
            </div>
          </div>
        </div>

        <div className="pure-hidden-xs">
          <Slider {...MOBILE_SLIDER_SETTINGS}>
            <div className="desktop-slider-item-shadow">
              <div className="desktop-slider-item">
                <p className="title">{i18n('section.exchange.grids.a.title')}</p>
                <p className="desc">
                  <TextTruncate
                    line={2}
                    truncateText="…"
                    text={i18n('section.exchange.grids.a.desc')}
                  />
                </p>
              </div>
            </div>
            <div className="desktop-slider-item-shadow">
              <div className="desktop-slider-item">
                <p className="title">{i18n('section.exchange.grids.b.title')}</p>
                <p className="desc">
                  <TextTruncate
                    line={2}
                    truncateText="…"
                    text={i18n('section.exchange.grids.b.desc')}
                  />
                </p>
              </div>
            </div>
            <div className="desktop-slider-item-shadow">
              <div className="desktop-slider-item">
                <p className="title">{i18n('section.exchange.grids.c.title')}</p>
                <p className="desc">
                  <TextTruncate
                    line={2}
                    truncateText="…"
                    text={i18n('section.exchange.grids.c.desc')}
                  />
                </p>
              </div>
            </div>
            <div className="desktop-slider-item-shadow">
              <div className="desktop-slider-item">
                <p className="title">{i18n('section.exchange.grids.d.title')}</p>
                <p className="desc">
                  <TextTruncate
                    line={2}
                    truncateText="…"
                    text={i18n('section.exchange.grids.d.desc')}
                  />
                </p>
              </div>
            </div>
            <div className="desktop-slider-item-shadow">
              <div className="desktop-slider-item">
                <p className="title">{i18n('section.exchange.grids.e.title')}</p>
                <p className="desc">
                  <TextTruncate
                    line={2}
                    truncateText="…"
                    text={i18n('section.exchange.grids.e.desc')}
                  />
                </p>
              </div>
            </div>
            <div className="desktop-slider-item-shadow">
              <div className="desktop-slider-item">
                <p className="title">{i18n('section.exchange.grids.f.title')}</p>
                <p className="desc">
                  <TextTruncate
                    line={2}
                    truncateText="…"
                    text={i18n('section.exchange.grids.f.desc')}
                  />
                </p>
              </div>
            </div>
          </Slider>
        </div>

        <Modal ref={ref => { this.videoModal = ref; }}>
          <div className="video-content">
            <i className="icon-close" onClick={this.closeVideo} />
            <iframe
              className="video"
              titile="What is DINNGO?"
              src="https://www.youtube.com/embed/wWpa3i1CZrc"
              frameBorder={0}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </Modal>
      
        <div className="section-exchange-left-bottom-bg" />
      </section>
    );
  }
}

