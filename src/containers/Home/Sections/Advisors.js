import React from 'react';
import PropTypes from 'prop-types';
import withI18N from 'shared/intl/withI18N';
import Slider from "react-slick";

const MOBILE_SLIDER_SETTINGS = {
  arrows: false,
  infinite: false,
  speed: 500,
  dots: false,
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

@withI18N
export default class Advisors extends React.PureComponent {

  static propTypes = {
    i18n: PropTypes.func.isRequired,
  };

  advisorsRender = (isMobile = false) => {
    const { i18n } = this.props;
    const render = [];
    const mobileCSS = isMobile ? '' : 'member-container-desktop';

    for (let i = 1; i <= 6; i += 1) {
      render.push((
        <div key={i18n(`section.advisors.name.${i}`)} className={`pure-u-lg-1-3 pure-u-sm-1-2 pure-u-1 text-center member-container-shadow ${mobileCSS}`}>
          <div className="member-container">
            <div className={`member-img member-advisor-${i18n(`section.advisors.img.${i}`)}`} />
            <div className="member-desc">
              <p className="title">{i18n(`section.advisors.name.${i}`)}</p>
              <p className="position">{i18n('section.advisors.title')}</p>
              <p>{i18n(`section.advisors.desc.${i}`)}</p>
            </div>
            <a className="link text-center" title="linkedin" target="_blank" rel="noopener noreferrer" href={i18n(`section.advisors.link.${i}`)} />
          </div>
        </div>
      ));
    }
    return render;
  }

  render() {
    const { i18n } = this.props;

    return (
      <section id="team" className="section-team section-advisors">
        <div className="section row pure-g">
          <div className="pure-u-1">
            <h2 className="section-sub-title">{i18n('section.advisors.title')}</h2>
          </div>

          {this.advisorsRender()}

          <div className="pure-hidden-xs pure-u-1-1">
            <Slider {...MOBILE_SLIDER_SETTINGS}>
              {this.advisorsRender()}
            </Slider>
          </div>
        </div>
      </section>
    );
  }
}

