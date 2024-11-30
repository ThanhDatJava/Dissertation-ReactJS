// src/ThankYouForm.js
import React, { Component } from "react";
import "./ThankYouForm.scss";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
class ThankYouForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      submitted: false,
    };
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ submitted: true });
  };

  render() {
    const { name, email, submitted } = this.state;

    return (
      <main class="main-content">
        <div className="letter">
          <h2>
            <FormattedMessage id="patient.letter-booking.title" />
          </h2>
          <p>
            <FormattedMessage id="patient.letter-booking.p1" />
          </p>
          <p>
            <FormattedMessage id="patient.letter-booking.p2" />
          </p>
          <p>
            <FormattedMessage id="patient.letter-booking.p3" />
          </p>
          <p>
            <FormattedMessage id="patient.letter-booking.p4" />
          </p>
        </div>
      </main>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(ThankYouForm);

// export default ThankYouForm;
