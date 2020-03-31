import React, { Component } from 'react';

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      association: '',
      message: '',
      disableButton: true,
    };
  }

  onInputChange = event => {
    event.preventDefault();

    this.setState({ [event.target.name]: event.target.value }, 
      () => {
         const {
          firstName,
          lastName,
          email,
          message,
        } = this.state;

        if (firstName !== '' && lastName !== '' && email !== '' && message !== '') {
          this.setState({ disableButton: false });
        } else {
          this.setState({ disableButton: true });
        }
      }
    );
  };

  handleInputValidation = () => {
    const {
      firstName,
      lastName,
      email,
      message,
    } = this.state;

    if (firstName !== '' && lastName !== '' && email !== '' && message !== '') {
      this.setState({ disableButton: false });
    } else {
      this.setState({ disableButton: true });
    }
  }

  handleSubmit = event => {
    event.preventDefault();

    console.log('Submitting message...');
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      association,
      message,
      disableButton,
    } = this.state;

    return (
      <div className="form-container">
        <form id="contact-form">
          <div className="form-group" id="fname-form">
            <label htmlFor="firstName">
              First Name
              <span className="asterisk">*</span>
              <input
                name="firstName"
                type="text"
                className="form-control"
                value={firstName}
                onChange={this.onInputChange.bind(this)}
              />
            </label>
          </div>

          <div className="form-group" id="lname-form">
            <label htmlFor="lastName">
              Last Name
              <span className="asterisk">*</span>
              <input
                name="lastName"
                type="text"
                className="form-control"
                value={lastName}
                onChange={this.onInputChange.bind(this)}
              />
            </label>
          </div>

          <div className="form-group" id="email-form">
            <label htmlFor="email">
              Email
              <span className="asterisk">*</span>
              <input
                name="email"
                type="email"
                className="form-control"
                value={email}
                required
                onChange={this.onInputChange.bind(this)}
              />
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="association">
              Association
              <input
                name="association"
                type="text"
                className="form-control"
                value={association}
                onChange={this.onInputChange.bind(this)}
              />
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="message">
              Message
              <span className="asterisk">*</span>
              <textarea
                name="message"
                className="form-control"
                rows="7"
                value={message}
                onChange={this.onInputChange.bind(this)}
              />
            </label>
          </div>

          <div className="btn-container">
            <button type="submit" className="contact-btn" onClick={event => this.handleSubmit(event)} disabled={disableButton}>
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ContactForm;
