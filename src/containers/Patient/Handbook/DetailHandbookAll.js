import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailHandbookAll.scss";
import { getAllHandbook } from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";

class DetailHandbookAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHandbooks: [],
    };
  }

  async componentDidMount() {
    let res = await getAllHandbook();
    if (res && res.errCode === 0) {
      this.setState({
        dataHandbooks: res.data,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleViewDetailDoctor = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-handbook/${item.id}`);
    }
  };

  render() {
    let { language } = this.props;
    let { dataHandbooks } = this.state;
    console.log("check dataHandbooks", dataHandbooks);

    return (
      <div className="detail-handbook-container">
        <HomeHeader />
        <div className="detail-handbook-all-body">
          {dataHandbooks &&
            dataHandbooks.length > 0 &&
            dataHandbooks.map((item, index) => {
              return (
                <div className="detail-handbook-child" key={index}>
                  <div className="left">
                    <div
                      className="bg-image-handbook"
                      style={{ backgroundImage: `url(${item.image})` }}
                      onClick={() => this.handleViewDetailDoctor(item)}
                    ></div>
                    <div className="name"> {item.name}</div>
                  </div>
                  <div className="right">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.descriptionHTML,
                      }}
                    ></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbookAll);
