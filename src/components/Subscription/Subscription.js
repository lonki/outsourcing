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
    };
  }

  inputOnChange = (e) => {
    this.setState({ inputText: e.target.value });
  }

  send = () => {
    const { inputText } = this.state;

    if (inputText) {
      this.props.onClick(inputText);
    }
  }

  render() {
    const { inputText } = this.state;

    return (
      <div className="email-subscription">
        <input className="email-subscription-input" placeholder="Keep Me Updated" onChange={this.inputOnChange} value={inputText} />
        <div className="email-subscription-group" onClick={this.send}>
          <img className="email-subscription-img" src={MAIL} width="25" height="18" />
        </div>
      </div>
    );
  }
}
