import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailClinicAll.scss";
import HomeHeader from "../../HomePage/HomeHeader";

import { getAllClinic } from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";

class DetailClinicAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    };
  }

  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        dataClinics: res.data,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleViewDetailClinic = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${item.id}`);
    }
  };

  render() {
    let { language } = this.props;
    let { dataClinics } = this.state;
    return (
      <div className="detail-specialty-container">
        <HomeHeader />
        <div className="detail-specialty-all-body">
          {dataClinics &&
            dataClinics.length > 0 &&
            dataClinics.map((item, index) => {
              return (
                <div className="detail-specialty-child" key={index}>
                  <div className="left">
                    <div
                      className="bg-image-specialty"
                      style={{ backgroundImage: `url(${item.image})` }}
                      onClick={() => this.handleViewDetailClinic(item)}
                    ></div>
                    <div className="name"> {item.name}</div>
                  </div>
                  <div className="right">
                    {item && !_.isEmpty(item) && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.descriptionHTML,
                        }}
                      ></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinicAll);
