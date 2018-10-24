import React from 'react';
import PropTypes from 'prop-types';
import withI18N from 'shared/intl/withI18N';

@withI18N
export default class CountDownToDate extends React.PureComponent {
  static propTypes = {
    isSmall: PropTypes.bool,
    isXsSmall: PropTypes.bool,
    date: PropTypes.string.isRequired,
  };

  static defaultProps = {
    isSmall: false,
    isXsSmall: false,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      endTime: new Date(props.date),
    };
  }

  componentDidMount() {
    this.decr = setInterval(this.update, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.decr);
  }

  update = () => {
    const { endTime } = this.state;
    const newTime = endTime - 1;
    this.setState({ endTime: newTime });

    if (endTime === 0) {
      clearInterval(this.decr);
    }
  }

  pad = (str, size = 2) => {
    let s = String(str);
    while (s.length < size) {
      s = `0${s}`;
    }

    return s;
  }

  render() {
    const { i18n, isSmall, isXsSmall } = this.props;
    const { endTime } = this.state;
    const formattedEndDate = endTime;
    const today = new Date();
    const msDiff = formattedEndDate - today;
    const days = parseInt(msDiff / (24 * 3600 * 1000), 10);
    const hours = parseInt(msDiff / (3600 * 1000) - (days * 24), 10);
    const mins = parseInt(msDiff / (60 * 1000) - (days * 24 * 60) - (hours * 60), 10);
    const secs = parseInt(msDiff / (1000) - (mins * 60) - (days * 24 * 60 * 60) - (hours * 60 * 60), 10);

    return (
      <React.Fragment>
        {!isSmall && !isXsSmall &&
          <div className="countdown">
            <div className="countdown-top">
              <p>{i18n('section.countdown.days')}</p>
              <p className="days">{this.pad(days)}</p>
            </div>
            <div className="countdown-bottom">{`${this.pad(hours)} : ${this.pad(mins)}`}</div>
          </div>
        }
        {isSmall &&
          <div className="countdown">
            <p className="left">
              {this.pad(days)}
              <span className="small-text">{i18n('section.countdown.days')}</span>
            </p>
            <p className="right">{`${this.pad(hours)} : ${this.pad(mins)}`}</p>
          </div>
        }
        {isXsSmall &&
          <div className="countdown">
            <span>{this.pad(days)}</span>
            <span className="small-text">{i18n('section.countdown.days')}</span>
          </div>
        }
      </React.Fragment>
    );
  }
}
