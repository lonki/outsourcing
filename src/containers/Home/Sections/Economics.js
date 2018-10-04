import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';

import withI18N from 'shared/intl/withI18N';

@withI18N
export default class Economics extends React.PureComponent {

  static propTypes = {
    i18n: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    const { i18n } = props;

    this.labels = [
      i18n('section.economics.chart.a.label'),
      i18n('section.economics.chart.b.label'),
      i18n('section.economics.chart.c.label'),
      i18n('section.economics.chart.d.label'),
      i18n('section.economics.chart.e.label'),
      i18n('section.economics.chart.f.label'),
    ];

    this.data = [25, 25, 20, 10, 10, 10];

    this.backgroundColor = [
      '#0085fd',
      '#60d3fe',
      '#76d6bf',
      '#b6de54',
      '#7072cf',
      '#bcbcbc',
    ];

    this.doughnutSettings = {
      labels: this.labels,
      datasets: [{
        data: this.data,
        backgroundColor: this.backgroundColor,
        // hoverBackgroundColor: [
        //   '#FF6384',
        //   '#36A2EB',
        //   '#FFCE56',
        // ],
        borderWidth: 0,
      }],
    };
  }

  render() {
    const { i18n } = this.props;

    return (
      <section id="economics" className="section-economics">
        <div className="section row pure-g">
          <div className="section-economics-bg" />

          <div className="pure-u-1-2">
            <h2 className="section-title">{i18n({ id: 'section.economics.title' }, 'html')}</h2>
            <p className="section-msg pure-u-1">{i18n('section.economics.desc')}</p>
          </div>

          <div className="pure-u-1-2 text-center">
            <div className="circle">
              <div className="circle-text">
                {i18n('section.economics.circle.left.title')}
                <p className="circle-tips">{i18n('section.economics.circle.left.desc')}</p>
              </div>
            </div>
            <div className="circle blue">
              <div className="circle-text">
                {i18n('section.economics.circle.right.title')}
                <p className="circle-tips">{i18n('section.economics.circle.right.desc')}</p>
              </div>
            </div>
          </div>
        </div>


        <div className="pure-u-1">
          <div className="section row pure-g chart-container">
            <div className="pure-u-1-2 chart-center-text text-center">
              {i18n('section.economics.chart.center.title')}
              <p className="chart-center-tips">{i18n('section.economics.chart.center.desc')}</p>
            </div>
            <div className="pure-u-1-2"></div>
            <div className="pure-u-1-2">
              <Doughnut
                data={this.doughnutSettings}
                width={260}
                height={260}
                options={{
                  maintainAspectRatio: false,
                  cutoutPercentage: 80,
                }}
                legend={{
                  display: false,
                }}
              />
            </div>
            <div className="pure-u-1-2">
              <div className="row pure-g">
                <div className="labels text-center pure-u-1-2">
                  <div className="labels-item">
                    <p className="title" style={{ color: this.backgroundColor[0] }}>{this.data[0]}%</p>
                    <p>{this.labels[0]}</p>
                  </div>
                  <div className="labels-item">
                    <p className="title" style={{ color: this.backgroundColor[1] }}>{this.data[1]}%</p>
                    <p>{this.labels[1]}</p>
                  </div>
                  <div className="labels-item">
                    <p className="title" style={{ color: this.backgroundColor[1] }}>{this.data[2]}%</p>
                    <p>{this.labels[2]}</p>
                  </div>
                </div>
                <div className="labels text-center pure-u-1-2">
                  <div className="labels-item">
                    <p className="title" style={{ color: this.backgroundColor[3] }}>{this.data[3]}%</p>
                    <p>{this.labels[3]}</p>
                  </div>
                  <div className="labels-item">
                    <p className="title" style={{ color: this.backgroundColor[4] }}>{this.data[4]}%</p>
                    <p>{this.labels[4]}</p>
                  </div>
                  <div className="labels-item">
                    <p className="title" style={{ color: this.backgroundColor[5] }}>{this.data[5]}%</p>
                    <p>{this.labels[5]}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

