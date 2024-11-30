import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import logo from "../../assets/logo2.jpg";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { withRouter } from "react-router";
import { changeLanguageApp } from "../../store/actions/appActions";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { getAllSpecialty } from "../../services/userService";

import DatalistInput from "react-datalist-input";
import "react-datalist-input/dist/styles.css";
import SearchWithSuggestions from "./SearchWithSuggestions";
class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchSpecialty: "",
      dataSpeciality: [],
      // suggestions: [],
    };
  }

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push("/home");
    }
  };

  handleScrollToSpeciality = () => {
    if (this.props.onScrollToSpeciality) {
      this.props.onScrollToSpeciality(); // Gọi hàm cuộn tới phần tử Speciality
    }
  };

  handleScrollToMedicalFacility = () => {
    if (this.props.onScrollToMedicalFacility) {
      this.props.onScrollToMedicalFacility(); // Gọi hàm cuộn tới phần tử Speciality
    }
  };

  handleScrollToOutStandingDoctor = () => {
    if (this.props.onScrollToOutStandingDoctor) {
      this.props.onScrollToOutStandingDoctor(); // Gọi hàm cuộn tới phần tử Speciality
    }
  };

  handleScrollHandBook = () => {
    if (this.props.onScrollToHandBook) {
      this.props.onScrollToHandBook(); // Gọi hàm cuộn tới phần tử Speciality
    }
  };

  getDataSpeciality = async () => {
    let res = await getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpeciality: res.data,
      });
    }
  };

  handleSearchChange = (event) => {
    this.setState({
      searchSpecialty: event.target.value,
    });
  };

  render() {
    const { language, isShowBanner } = this.props;
    const { searchSpecialty, dataSpeciality } = this.state;

    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="left-content">
                <img
                  className="header-logo"
                  src={logo}
                  onClick={() => this.returnToHome()}
                ></img>
              </div>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <div className="center-content">
                    <div
                      className="child-content nav-item nav-link active"
                      onClick={this.handleScrollToSpeciality}
                    >
                      <div>
                        <h4>
                          <FormattedMessage id="homeheader.speciality" />
                        </h4>
                      </div>
                      <div className="subs-title">
                        <FormattedMessage id="homeheader.searchdoctor" />
                      </div>
                    </div>
                    <div
                      className="child-content"
                      onClick={this.handleScrollToMedicalFacility}
                    >
                      <div>
                        <h4>
                          <FormattedMessage id="homeheader.health-facility" />
                        </h4>
                      </div>
                      <div className="subs-title">
                        <FormattedMessage id="homeheader.select-room" />
                      </div>
                    </div>
                    <div
                      className="child-content"
                      onClick={this.handleScrollToOutStandingDoctor}
                    >
                      <div>
                        <h4>
                          <FormattedMessage id="homeheader.doctor" />
                        </h4>
                      </div>
                      <div className="subs-title">
                        <FormattedMessage id="homeheader.select-doctor" />
                      </div>
                    </div>
                    <div
                      className="child-content"
                      onClick={this.handleScrollHandBook}
                    >
                      <div>
                        <h4>
                          <FormattedMessage id="homeheader.Handbook" />
                        </h4>
                      </div>
                      <div className="subs-title">
                        <FormattedMessage id="homeheader.general-health-check" />
                      </div>
                    </div>
                  </div>
                  <div className="right-content">
                    <div className="support">
                      <i className="fas fa-question-circle"></i>
                      <FormattedMessage id="homeheader.Support" />
                    </div>
                    <div
                      className={
                        language === LANGUAGES.VI
                          ? "language-vi active"
                          : "language-vi"
                      }
                    >
                      <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                        VN
                      </span>
                    </div>
                    <div
                      className={
                        language === LANGUAGES.EN
                          ? "language-en active"
                          : "language-en"
                      }
                    >
                      <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                        EN
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1">
                <FormattedMessage id="banner.medical-foundation" />
              </div>
              <div className="title2">
                <FormattedMessage id="banner.comprehensive-health-care" />
              </div>

              <SearchWithSuggestions />
            </div>
            <div className="content-down">
              <div className="options">
                <div className="option-child">
                  <div className="icon-child">
                    <i className="far fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.specialized-examination" />
                  </div>
                </div>

                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.remote-examination" />
                  </div>
                </div>

                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-procedures"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.general-examination" />
                  </div>
                </div>

                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-flask"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.medical-tests" />
                  </div>
                </div>

                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-user-md"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.spiritual-health" />
                  </div>
                </div>

                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-briefcase-medical"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.dental-examination" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
