import React from 'react';
import PropTypes from 'prop-types';
import withI18N from 'shared/intl/withI18N';

@withI18N
export default class Team extends React.PureComponent {

  static propTypes = {
    i18n: PropTypes.func.isRequired,
  };

  teamsRender = () => {
    const { i18n } = this.props;
    const render = [];

    for (let i = 1; i <= 13; i += 1) {
      render.push((
        <div className="pure-u-lg-1-3 pure-u-sm-1-2 pure-u-1 text-center member-container-shadow">
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
        </div>
      </section>
    );
  }
}

