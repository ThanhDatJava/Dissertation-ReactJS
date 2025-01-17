import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../utils";
import { postVerifyBookAppointment } from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";
import ThankYouForm from "./ThankYouForm";
class verifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0,
    };
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      const urlParams = new URLSearchParams(this.props.location.search);
      const token = urlParams.get("token");
      const doctorId = urlParams.get("doctorId");
      let res = await postVerifyBookAppointment({
        token: token,
        doctorId: doctorId,
      });
      if (res && res.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode: res.errCode,
        });
      } else {
        this.setState({
          statusVerify: true,
          errCode: res && res.errCode ? res.errCode : -1,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { statusVerify, errCode } = this.state;
    return (
      <>
        <HomeHeader />
        {statusVerify === false ? (
          <div>Loading data ...</div>
        ) : (
          <div>
            {errCode === 0 ? (
              <div className="App">
                <header className="App-header">
                  <ThankYouForm />
                </header>
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  marginTop: "15%",
                  color: "red",
                }}
              >
                <h2>Lịch hẹn đã được xác nhận !</h2>
              </div>
            )}
          </div>
        )}
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(verifyEmail);
