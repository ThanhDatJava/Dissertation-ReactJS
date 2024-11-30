import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctorAll.scss";
import { getTopDoctorHomeService } from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
class DetailDoctorAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDoctors: [],
    };
  }

  async componentDidMount() {
    let res = await getTopDoctorHomeService(10);
    if (res && res.errCode === 0) {
      this.setState({
        dataDoctors: res.data,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleViewDetailDoctor = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${item.id}`);
    }
  };

  render() {
    let { language } = this.props;
    let { dataDoctors } = this.state;
    console.log("check dataDoctors", dataDoctors);

    return (
      <div className="detail-doctor-container">
        <HomeHeader />
        <div className="detail-doctor-all-body">
          {dataDoctors &&
            dataDoctors.length > 0 &&
            dataDoctors.map((item, index) => {
              let imageBase64 = "";
              if (item.image) {
                imageBase64 = Buffer.from(item.image, "base64").toString(
                  "binary"
                );
              }

              return (
                <div className="detail-doctor-child" key={index}>
                  <div className="left">
                    <div
                      className="bg-image-doctor"
                      style={{ backgroundImage: `url(${imageBase64})` }}
                      onClick={() => this.handleViewDetailDoctor(item)}
                    ></div>
                    <div className="name"> {item.name}</div>
                  </div>
                  <div className="right">
                    {item && !_.isEmpty(item) && (
                      <>
                        <div className="name">
                          <FormattedMessage id="detail-doctor.full-name" />
                          {item.lastName} {item.firstName}
                        </div>
                        <div className="email">
                          <FormattedMessage id="detail-doctor.hometown" />
                          {item.address}
                        </div>
                        <div className="position">
                          <FormattedMessage id="detail-doctor.title" />
                          {/* {item.positionData.valueVi} */}
                          {language === LANGUAGES.VI
                            ? item.positionData.valueVi
                            : item.positionData.valueEn}
                        </div>
                        <div className="email">Email : {item.email}</div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctorAll);
