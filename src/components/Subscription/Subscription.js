import React from 'react';
import PropTypes from 'prop-types';

import MAIL from 'style/img/icon-mail.svg';

export default class Subscription extends React.PureComponent {
  static propTypes = {
    isInMobileNav: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isInMobileNav: false,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      inputText: '',
      isSuccess: false,
      isFail: false,
    };
  }

  inputOnChange = (e) => {
    this.setState({ inputText: e.target.value });
  }

  send = () => {
    const { inputText } = this.state;

    if (inputText) {
      this.props.onClick(inputText);
      this.setState({
        inputText: '',
      });
    }
  }

  reset = () => {
    clearTimeout(this.timeoutId);
    this.setState({
      isSuccess: false,
      isFail: false,
    });
  }

  openSucText = () => {
    clearTimeout(this.timeoutId);
    this.setState({
      isSuccess: true,
    });

    this.timeoutId = setTimeout(() => {
      this.setState({
        isSuccess: false,
      });
    }, 5000);
  }

  openFailText = () => {
    clearTimeout(this.timeoutId);
    this.setState({
      isFail: true,
    });

    this.timeoutId = setTimeout(() => {
      this.setState({
        isFail: false,
      });
    }, 5000);
  }

  render() {
    const { isInMobileNav } = this.props;
    const { inputText, isSuccess, isFail } = this.state;
    const sucClasss = isSuccess ? 'success' : '';
    const failClasss = isFail ? 'fail' : '';
    const sucText = isSuccess ? 'Welcome to join the community!' : '';
    const failText = isFail ? 'Error! The address is invalid.' : '';

    return (
      <div className="email-subscription">
        { !isInMobileNav &&
          <React.Fragment>
            <input type="text" className="email-subscription-input" placeholder="Keep Me Updated" onChange={this.inputOnChange} value={inputText} />
            <div className="email-subscription-group" onClick={this.send}>
              <img className="email-subscription-img" src={MAIL} width="25" height="18" />
            </div>
            <p className={`tips ${sucClasss} ${failClasss}`}>{`${sucText}${failText}`}</p>
          </React.Fragment>
        }
        { isInMobileNav &&
          <React.Fragment>
            <div className="email-subscription-mobile">
              <input type="text" className="email-subscription-input-mobile" placeholder="Mail Address" onChange={this.inputOnChange} value={inputText} />
              <p className={`subscription-tips-mobile tips ${sucClasss} ${failClasss}`}>{`${sucText}${failText}`}</p>
              <button className="email-subscription-btn" onClick={this.send}>
                Keep Me Updated
              </button>
            </div>
          </React.Fragment>
        }
      </div>
    );
  }
}
