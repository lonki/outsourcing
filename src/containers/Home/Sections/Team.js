import React from 'react';
import PropTypes from 'prop-types';
import withI18N from 'shared/intl/withI18N';
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';
import { touchDeviceHoverHandlerByClass } from 'shared/util/touchDevice';

@withI18N
export default class Team extends React.PureComponent {

  static propTypes = {
    i18n: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.iScrollOptions = {
      scrollX: true,
      scrollY: false,
      probeType: 3,
      disablePointer: true,
      disableTouch: false, // false if you want the slider to be usable with touch devices
      disableMouse: false,
      preventDefault: false,
    };
  }

  componentDidMount() {
    touchDeviceHoverHandlerByClass(document.getElementsByClassName('member-img'), 'member-img-hover');
  }

  teamsRender = (isMobile = false) => {
    const { i18n } = this.props;
    const render = [];
    const mobileCSS = isMobile ? '' : 'member-container-desktop';
    const pureClass = isMobile ? '' : 'pure-u-lg-1-3 pure-u-sm-1-2 pure-u-1';

    for (let i = 1; i <= 13; i += 1) {
      render.push((
        <div key={i18n(`section.team.name.${i}`)} className={`${pureClass} text-center member-container-shadow ${mobileCSS}`}>
          <div className="member-container">
            <div className={`member-img member-team-${i18n(`section.team.img.${i}`)}`} />
            <div className="member-desc">
              <p className="title">{i18n(`section.team.name.${i}`)}</p>
              <p className="position">{i18n(`section.team.position.${i}`)}</p>
              <p>{i18n(`section.team.desc.${i}`)}</p>
            </div>
            <a className="link text-center" title="linkedin" target="_blank" rel="noopener noreferrer" href={i18n(`section.team.link.${i}`)} />
          </div>
        </div>
      ));
    }
    return render;
  }

  render() {
    const { i18n } = this.props;

    return (
      <section id="team" className="section-team">
        <div className="section row pure-g">
          <div className="pure-u-1">
            <h2 className="section-title">{i18n({ id: 'section.team.title' }, 'html')}</h2>
          </div>

          {this.teamsRender()}

          <ReactIScroll iScroll={iScroll} options={this.iScrollOptions} className="pure-hidden-xs pure-u-1-1">
            <div className="section-team-list">
              {this.teamsRender(true)}
            </div>
          </ReactIScroll>
        </div>

      </section>
    );
  }
}

