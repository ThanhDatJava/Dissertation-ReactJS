import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getAllSpecialty } from "../../../services/userService";
import { withRouter } from "react-router";
class Speciality extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpeciality: [],
    };
  }
  async componentDidMount() {
    let res = await getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpeciality: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`);
    }
  };

  handleViewDetailAllSpecialty = () => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty-all`);
    }
  };

  render() {
    let { dataSpeciality } = this.state;
    return (
      <div
        className="section-share section-specialty"
        ref={this.props.forwardedRef}
      >
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.popular-specialties" />
            </span>
            <button
              className="btn-section"
              onClick={() => this.handleViewDetailAllSpecialty()}
            >
              <FormattedMessage id="homepage.see-more" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataSpeciality &&
                dataSpeciality.length > 0 &&
                dataSpeciality.map((item, index) => {
                  return (
                    <div
                      className="section-customize"
                      key={index}
                      onClick={() => this.handleViewDetailSpecialty(item)}
                    >
                      <div className="customize-boder">
                        <div
                          className="bg-image section-specialty-img"
                          style={{ backgroundImage: `url(${item.image})` }}
                        ></div>
                        <div>{item.name}</div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Speciality)
);
