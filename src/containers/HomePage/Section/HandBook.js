import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { withRouter } from "react-router";
import { getAllHandbook } from "../../../services/userService";
class HandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHandbook: [],
    };
  }

  async componentDidMount() {
    let res = await getAllHandbook();

    if (res && res.errCode === 0) {
      this.setState({
        dataHandbook: res.data ? res.data : [],
      });
    }
  }
  handleViewDetailhandbook = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-handbook/${item.id}`);
    }
  };

  handleViewDetailhandbookAll = () => {
    if (this.props.history) {
      this.props.history.push(`/detail-handbook-all`);
    }
  };
  render() {
    let { dataHandbook } = this.state;

    return (
      <div
        className="section-share section-handbook"
        ref={this.props.forwardedRef}
      >
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homeheader.Handbook" />
            </span>
            <button
              className="btn-section"
              onClick={() => this.handleViewDetailhandbookAll()}
            >
              <FormattedMessage id="homepage.see-more" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataHandbook &&
                dataHandbook.length > 0 &&
                dataHandbook.map((item, index) => {
                  return (
                    <div
                      className="section-customize"
                      key={index}
                      onClick={() => this.handleViewDetailhandbook(item)}
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
  connect(mapStateToProps, mapDispatchToProps)(HandBook)
);
