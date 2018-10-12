import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import isMobile from 'ismobilejs';

import { ViewPortAnimation } from 'components';

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

    this.backgroundHoverColor = [
      '#1b4f9a',
      '#27649b',
      '#356c84',
      '#4c6f5e',
      '#33498a',
      '#4e6383',
    ];

    this.doughnutSettings = {
      labels: this.labels,
      datasets: [{
        data: this.data,
        backgroundColor: this.backgroundColor,
        borderWidth: 0,
      }],
    };

    this.doughnutOptions = {
      maintainAspectRatio: false,
      cutoutPercentage: 80,
      onHover: this.onHover,
      tooltips: {
        enabled: !isMobile.any,
      },
    };

    this.state = {
      isShowChart: false,
    };
  }

  onHover = (e, hoverItems) => {
    if (hoverItems.length > 0) {
      const { _index: index } = hoverItems[0];
      const nextBackgroundColor = Array.from(this.backgroundHoverColor);
      nextBackgroundColor[index] = this.backgroundColor[index];
      this.chart.chartInstance.data.datasets[0].backgroundColor = nextBackgroundColor;
    } else {
      this.chart.chartInstance.data.datasets[0].backgroundColor = this.backgroundColor;
    }
    this.chart.chartInstance.update();
  }

  showChart = () => {
    this.setState({
      isShowChart: true,
    });
  }

  showChartTooltip = (e) => {
    clearTimeout(this.timeoutId);
    const index = e.currentTarget.getAttribute('data-index');
    const { chartInstance } = this.chart;
    const item = chartInstance.getDatasetMeta(0).data[index];
    this.onHover(null, [item]);
    chartInstance.tooltip._active = [item];
    chartInstance.tooltip.update();
    chartInstance.render();

    this.timeoutId = setTimeout(() => {
      this.onHover(null, []);
      chartInstance.tooltip._active = [];
      chartInstance.tooltip.update();
      chartInstance.render();
    }, 2000);
  }
  render() {
    const { i18n } = this.props;
    const { isShowChart } = this.state;

    return (
      <section id="economics" className="section-economics">
        <div className="section row pure-g two-circle-container">
          <div className="section-economics-bg" />

          <div className="pure-u-1-1 pure-u-sm-1-2">
            <h2 className="section-title">{i18n({ id: 'section.economics.title' }, 'html')}</h2>
            <p className="section-msg pure-u-1">{i18n('section.economics.desc')}</p>
          </div>

          <div className="pure-u-1-1 pure-u-sm-1-2 text-center">
            <ViewPortAnimation addClassName="section-economics-circle-animation">
              <div className="circle">
                <div className="circle-text">
                  {i18n('section.economics.circle.left.title')}
                  <p className="circle-tips">{i18n('section.economics.circle.left.desc')}</p>
                </div>
              </div>
            </ViewPortAnimation>
            <ViewPortAnimation addClassName="section-economics-circle-blue-animation">
              <div className="circle blue">
                <div className="circle-text">
                  {i18n('section.economics.circle.right.title')}
                  <p className="circle-tips">{i18n('section.economics.circle.right.desc')}</p>
                </div>
              </div>
            </ViewPortAnimation>
          </div>

          <div className="pure-u-1 section-sub-title">
            {i18n('section.economics.chart.left.title')}
          </div>
        </div>


        <div className="pure-u-1">
          <ViewPortAnimation isVisibleCallback={this.showChart}>
            <div className="section row pure-g chart-container">
              <div className="pure-u-1-1 pure-u-sm-1-2 chart-container-pie">
                {isShowChart &&
                  <React.Fragment>
                    <Doughnut
                      ref={(chart) => { this.chart = chart; }}
                      data={this.doughnutSettings}
                      width={260}
                      height={260}
                      options={this.doughnutOptions}
                      legend={{
                        display: false,
                      }}
                    />
                    <div className="pure-u-1-1 pure-u-sm-1-2 chart-center-text text-center">
                      {i18n('section.economics.chart.center.title')}
                      <p className="chart-center-tips">{i18n('section.economics.chart.center.desc')}</p>
                    </div>
                  </React.Fragment>
                }
              </div>
              <div className="chart-label-container pure-u-1-1 pure-u-sm-1-2">
                <div className="row pure-g">
                  <div className="labels text-center pure-u-1-1 pure-u-sm-1-2">
                    <div className="labels-item" data-index="0" onClick={this.showChartTooltip} onMouseOver={this.showChartTooltip}>
                      <p className="title" style={{ color: this.backgroundColor[0] }}>{this.data[0]}%</p>
                      <p>{this.labels[0]}</p>
                    </div>
                    <div className="labels-item" data-index="1" onClick={this.showChartTooltip} onMouseOver={this.showChartTooltip}>
                      <p className="title" style={{ color: this.backgroundColor[1] }}>{this.data[1]}%</p>
                      <p>{this.labels[1]}</p>
                    </div>
                    <div className="labels-item" data-index="2" onClick={this.showChartTooltip} onMouseOver={this.showChartTooltip}>
                      <p className="title" style={{ color: this.backgroundColor[2] }}>{this.data[2]}%</p>
                      <p>{this.labels[2]}</p>
                    </div>
                  </div>
                  <div className="labels text-center pure-u-1-1 pure-u-sm-1-2">
                    <div className="labels-item" data-index="3" onClick={this.showChartTooltip} onMouseOver={this.showChartTooltip}>
                      <p className="title" style={{ color: this.backgroundColor[3] }}>{this.data[3]}%</p>
                      <p>{this.labels[3]}</p>
                    </div>
                    <div className="labels-item" data-index="4" onClick={this.showChartTooltip} onMouseOver={this.showChartTooltip}>
                      <p className="title" style={{ color: this.backgroundColor[4] }}>{this.data[4]}%</p>
                      <p>{this.labels[4]}</p>
                    </div>
                    <div className="labels-item" data-index="5" onClick={this.showChartTooltip} onMouseOver={this.showChartTooltip}>
                      <p className="title" style={{ color: this.backgroundColor[5] }}>{this.data[5]}%</p>
                      <p>{this.labels[5]}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pure-u-1-2" />
            </div>
          </ViewPortAnimation>
        </div>
      </section>
    );
  }
}

