import React from 'react';
import PropTypes from 'prop-types';

import MAIL from 'style/img/icon-mail.svg';

export default class Subscription extends React.PureComponent {

  static propTypes = {
    onClick: PropTypes.func.isRequired,
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
    }, 3000);
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
    }, 3000);
  }

  render() {
    const { inputText, isSuccess, isFail } = this.state;
    const sucClasss = isSuccess ? 'success' : '';
    const failClasss = isFail ? 'fail' : '';
    const sucText = isSuccess ? 'Welcome to join the community!' : '';
    const failText = isFail ? 'Error! The address is invalid.' : '';

    return (
      <div className="email-subscription">
        <input type="text" className="email-subscription-input" placeholder="Keep Me Updated" onChange={this.inputOnChange} value={inputText} />
        <div className="email-subscription-group" onClick={this.send}>
          <img className="email-subscription-img" src={MAIL} width="25" height="18" />
        </div>
        <p className={`tips ${sucClasss} ${failClasss}`}>{`${sucText}${failText}`}</p>
      </div>
    );
  }
}
