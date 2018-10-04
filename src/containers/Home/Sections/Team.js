import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import withI18N from 'shared/intl/withI18N';

@withI18N
export default class Team extends React.PureComponent {

  static propTypes = {
    i18n: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { i18n } = this.props;

    return (
      <section id="team" className="section-team">
        <div className="section row pure-g">
          <div className="pure-u-1">
            <h2 className="section-title">{i18n({ id: 'section.team.title' }, 'html')}</h2>
          </div>

          <div className="pure-u-lg-1-3 pure-u-md-1-2 pure-u-sd-1 text-center member-container-shadow">
            <div className="member-container">
              <div className="member-img" />
              <div className="member-desc">
                <p className="title">HSUAN-TING CHU</p>
                <p className="position">Chief Executive Officer</p>
                <p>Founder & CEO, a serial entrepreneur who built multiple VC funded business. Founder of Jessyfrup, extensive experience in US financial market.</p>
              </div>
              <Link className="link text-center" title="linkedin" to="/"></Link>
            </div>
          </div>

          <div className="pure-u-lg-1-3 pure-u-md-1-2 pure-u-sd-1 text-center member-container-shadow">
            <div className="member-container">
              <div className="member-img" />
              <div className="member-desc">
                <p className="title">HSUAN-TING CHU</p>
                <p className="position">Chief Executive Officer</p>
                <p>Founder & CEO, a serial entrepreneur who built multiple VC funded business. Founder of Jessyfrup, extensive experience in US financial market.</p>
              </div>
              <Link className="link text-center" title="linkedin" to="/"></Link>
            </div>
          </div>

          <div className="pure-u-lg-1-3 pure-u-md-1-2 pure-u-sd-1 text-center member-container-shadow">
            <div className="member-container">
              <div className="member-img" />
              <div className="member-desc">
                <p className="title">HSUAN-TING CHU</p>
                <p className="position">Chief Executive Officer</p>
                <p>Founder & CEO, a serial entrepreneur who built multiple VC funded business. Founder of Jessyfrup, extensive experience in US financial market.</p>
              </div>
              <Link className="link text-center" title="linkedin" to="/"></Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

