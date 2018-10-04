import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Slider from "react-slick";

import withI18N from 'shared/intl/withI18N';

@withI18N
export default class Media extends React.PureComponent {

  static propTypes = {
    i18n: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.settings = {
      arrows: false,
      dots: false,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: 'linear',
    };
  }

  render() {
    const { i18n } = this.props;

    return (
      <section id="media" className="section-media">
        <div className="section row pure-g">
          <div className="pure-u-1">
            <h2 className="section-title">{i18n({ id: 'section.media.title' }, 'html')}</h2>
          </div>

          <div className="pure-u-lg-1-3 pure-u-md-1-2 pure-u-sd-1">
            <div className="media-container">
              <div className="media-img media-img-crow" />
              <div className="media-mask">
                <div className="media-logo media-logo-crow" />
                <p className="media-title">Crypto Crow</p>
              </div>
            </div>
          </div>

          <div className="pure-u-lg-1-3 pure-u-md-1-2 pure-u-sd-1">
            <div className="media-container">
              <div className="media-img media-img-bad" />
              <div className="media-mask">
                <div className="media-logo media-logo-bad" />
                <p className="media-title">Crypto Crow</p>
              </div>
            </div>
          </div>

          <div className="pure-u-lg-1-3 pure-u-md-1-2 pure-u-sd-1">
            <div className="media-container">
              <div className="media-img media-img-prome" />
              <div className="media-mask">
                <div className="media-logo media-logo-prome" />
                <p className="media-title">Crypto Crow</p>
              </div>
            </div>
          </div>

          <div className="pure-u-1 media-link-container">
            <Slider {...this.settings}>
              <Link className="media-link media-link-its" to="https://itsblockchain.com/ico-review-dinngo/" />
              <Link className="media-link media-link-exchange" to="https://itsblockchain.com/ico-review-dinngo/" />
              <Link className="media-link media-link-bitsonline" to="https://itsblockchain.com/ico-review-dinngo/" />
              <Link className="media-link media-link-idol" to="https://itsblockchain.com/ico-review-dinngo/" />
              <Link className="media-link media-link-reuters" to="https://itsblockchain.com/ico-review-dinngo/" />
              <Link className="media-link media-link-cryptomode" to="https://itsblockchain.com/ico-review-dinngo/" />
              <Link className="media-link media-link-oracle" to="https://itsblockchain.com/ico-review-dinngo/" />
              <Link className="media-link media-link-speaker" to="https://itsblockchain.com/ico-review-dinngo/" />
              <Link className="media-link media-link-nvezz" to="https://itsblockchain.com/ico-review-dinngo/" />
              <Link className="media-link media-link-bitcoin" to="https://itsblockchain.com/ico-review-dinngo/" />
            </Slider>
          </div>

          <div className="pure-u-1-7">
            <Link className="media-s-link media-s-link-bench" to="https://itsblockchain.com/ico-review-dinngo/" />
          </div>
          <div className="pure-u-1-7">
            <Link className="media-s-link media-s-link-track" to="https://itsblockchain.com/ico-review-dinngo/" />
          </div>
          <div className="pure-u-1-7">
            <Link className="media-s-link media-s-link-icodr" to="https://itsblockchain.com/ico-review-dinngo/" />
          </div>
          <div className="pure-u-1-7">
            <Link className="media-s-link media-s-link-rating" to="https://itsblockchain.com/ico-review-dinngo/" />
          </div>
          <div className="pure-u-1-7">
            <Link className="media-s-link media-s-link-icoholder" to="https://itsblockchain.com/ico-review-dinngo/" />
          </div>
          <div className="pure-u-1-7">
            <Link className="media-s-link media-s-link-watch" to="https://itsblockchain.com/ico-review-dinngo/" />
          </div>
          <div className="pure-u-1-7">
            <Link className="media-s-link media-s-link-marks" to="https://itsblockchain.com/ico-review-dinngo/" />
          </div>
        </div>
      </section>
    );
  }
}

