import React from 'react';
import PropTypes from 'prop-types';
import Slider from "react-slick";

import { Modal } from 'components';

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

    this.state = {
      media: '',
    };
  }

  openVideo = (e) => {
    this.setState({
      media: e.currentTarget.getAttribute('data-media'),
    });
    this.videoModal.show();
  }

  closeVideo = () => {
    this.videoModal.hide();
  }

  render() {
    const { i18n } = this.props;
    const { media } = this.state;

    return (
      <section id="media" className="section-media">
        <div className="section row pure-g">
          <div className="pure-u-1">
            <h2 className="section-title">{i18n({ id: 'section.media.title' }, 'html')}</h2>
          </div>

          <div className="pure-u-lg-1-3 pure-u-md-1-2 pure-u-sd-1">
            <div className="media-container" data-media="crypto" onClick={this.openVideo}>
              <div className="media-img media-img-crow" />
              <div className="media-mask">
                <div className="media-logo media-logo-crow" />
                <p className="media-title">{i18n('section.media.media.a')}</p>
              </div>
            </div>
          </div>

          <div className="pure-u-lg-1-3 pure-u-md-1-2 pure-u-sd-1">
            <div className="media-container" data-media="bad" onClick={this.openVideo}>
              <div className="media-img media-img-bad" />
              <div className="media-mask">
                <div className="media-logo media-logo-bad" />
                <p className="media-title">{i18n('section.media.media.b')}</p>
              </div>
            </div>
          </div>

          <div className="pure-u-lg-1-3 pure-u-md-1-2 pure-u-sd-1">
            <div className="media-container" data-media="prome" onClick={this.openVideo}>
              <div className="media-img media-img-prome" />
              <div className="media-mask">
                <div className="media-logo media-logo-prome" />
                <p className="media-title">{i18n('section.media.media.c')}</p>
              </div>
            </div>
          </div>

          <div className="pure-u-1 media-link-container">
            <Slider {...this.settings}>
              <a className="media-link media-link-its" target="_blank" rel="noopener noreferrer" href="https://itsblockchain.com/ico-review-dinngo/" />
              <a className="media-link media-link-exchange" target="_blank" rel="noopener noreferrer" href="https://bitcoinexchangeguide.com/dinngo-ico-dgo-token/" />
              <a className="media-link media-link-bitsonline" target="_blank" rel="noopener noreferrer" href="https://bitsonline.com/dinngo-cold-wallet-mobile/" />
              <a className="media-link media-link-idol" target="_blank" rel="noopener noreferrer" href="https://coinidol.com/dinngo-hybrid-exchange-announces-bluetooth-integration-between-cold-wallets-and-mobile-devices/" />
              <a className="media-link media-link-reuters" target="_blank" rel="noopener noreferrer" href="https://www.reuters.com/brandfeatures/venture-capital/article?id=49322" />
              <a className="media-link media-link-cryptomode" target="_blank" rel="noopener noreferrer" href="https://cryptomode.com/crypto-exchange-dinngo-announces-innovative-bluetooth-integration-between-cold-wallets-and-mobile-devices/" />
              <a className="media-link media-link-oracle" target="_blank" rel="noopener noreferrer" href="https://oracletimes.com/dinngo-hybrid-exchange-integrates-cold-wallets-and-mobile-devices-via-bluetooth/" />
              <a className="media-link media-link-speaker" target="_blank" rel="noopener noreferrer" href="https://www.coinspeaker.com/2018/09/03/dinngo-breaks-ground-with-bluetooth-integration-of-cold-wallets-and-mobile-devices/" />
              <a className="media-link media-link-nvezz" target="_blank" rel="noopener noreferrer" href="http://invezz.com/news/crypto/32134-Upcoming-ICO-DINNGO-dares-to-be-different-with-new-crypto-exchange-" />
              <a className="media-link media-link-bitcoin" target="_blank" rel="noopener noreferrer" href="https://usethebitcoin.com/dinngo-aims-to-use-bluetooth-to-create-next-gen-exchange/" />
            </Slider>
          </div>

          <div className="pure-u-1-7">
            <a className="media-s-link media-s-link-bench" target="_blank" rel="noopener noreferrer" href="https://icobench.com/ico/dinngo" />
          </div>
          <div className="pure-u-1-7">
            <a className="media-s-link media-s-link-track" target="_blank" rel="noopener noreferrer" href="https://www.trackico.io/ico/dinngo/" />
          </div>
          <div className="pure-u-1-7">
            <a className="media-s-link media-s-link-icodr" target="_blank" rel="noopener noreferrer" href="https://icodrops.com/dinngo/" />
          </div>
          <div className="pure-u-1-7">
            <a className="media-s-link media-s-link-rating" target="_blank" rel="noopener noreferrer" href="https://icorating.com/ico/dinngo-dgo/" />
          </div>
          <div className="pure-u-1-7">
            <a className="media-s-link media-s-link-icoholder" target="_blank" rel="noopener noreferrer" href="https://icoholder.com/en/dinngo-23884" />
          </div>
          <div className="pure-u-1-7">
            <a className="media-s-link media-s-link-watch" target="_blank" rel="noopener noreferrer" href="https://icowatchlist.com/ico/dinngo" />
          </div>
          <div className="pure-u-1-7">
            <a className="media-s-link media-s-link-marks" target="_blank" rel="noopener noreferrer" href="https://icomarks.com/ico/dinngo" />
          </div>
        </div>

        <Modal ref={ref => { this.videoModal = ref; }}>
          <div className="video-content">
            <i className="icon-close" onClick={this.closeVideo} />

            { media === 'crypto' &&
              <iframe
                className="video"
                src="https://www.youtube.com/embed/oR4-GorGo-w"
                frameBorder={0}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            }

            { media === 'bad' &&
              <iframe src="https://omny.fm/shows/badcrypto/crypto-spotlight-dinngo/embed"
                className="video"
                frameborder="0">
              </iframe>
            }

            { media === 'prome' &&
              <iframe
                className="video"
                src="https://www.youtube.com/embed/C_aRdm89yx8"
                frameBorder={0}
                allow="autoplay; encrypted-media"
                allowFullScreen>
              </iframe>
            }
          </div>
        </Modal>
      </section>
    );
  }
}

