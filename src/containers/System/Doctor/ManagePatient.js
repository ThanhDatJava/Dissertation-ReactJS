import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";
import {
  getAllPatientForDoctor,
  postSendRemedy,
} from "../../../services/userService";
import RemedyModal from "./RemedyModal";
import MedicalRecordModal from "./MedicalRecordModal";

import LoadingOverlay from "react-loading-overlay";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isOpenRemedyModal: false,
      isOpenMedicalRecordModal: false,
      dataModal: {},
      isShowLoangding: false,

      currentPage: 1, // Trang hiện tại
      itemsPerPage: 3, // Số lượng phần tử mỗi trang
      totalItems: 0, // Tổng số phần tử
    };
  }

  async componentDidMount() {
    this.getDataPatient();
  }
  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formattedDate = new Date(currentDate).getTime();

    let res = await getAllPatientForDoctor({
      doctorId: user.user.id,
      date: formattedDate,
    });

    let totalItems = res.data.length;
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
        totalItems: totalItems,
      });
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
    }
  }

  handleOnchangeDatePicker = (data) => {
    this.setState(
      {
        currentDate: data[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };
  handleBtnConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
      gender: item.patientData.genderData.valueVi,
    };
    this.setState({
      isOpenRemedyModal: true,
      dataModal: data,
    });
  };
  handleBtnSave = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
      gender: item.patientData.genderData.valueVi,
    };
    this.setState({
      isOpenMedicalRecordModal: true,
      dataModal: data,
    });
  };
  closeMedicalRecordModal = () => {
    this.setState({
      isOpenMedicalRecordModal: false,
      dataModal: {},
    });
  };

  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: {},
    });
  };

  sendRemedy = async (dataChild) => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoangding: true,
    });
    let res = await postSendRemedy({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      patientName: dataModal.patientName,
      language: this.props.language,
    });
    if (res && res.errCode === 0) {
      toast.success("Send Remedy succeeds !");
      await this.getDataPatient();
      this.setState({
        isShowLoangding: false,
      });
      this.closeRemedyModal();
    } else {
      toast.error("Send Remedy error !");
      this.setState({
        isShowLoangding: false,
      });
      this.closeRemedyModal();
    }
  };

  // Hàm tính toán dữ liệu cho trang hiện tại
  paginateData = () => {
    const { dataPatient, currentPage, itemsPerPage } = this.state;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return dataPatient.slice(startIndex, endIndex);
  };

  // Xử lý thay đổi trang
  handlePageChange = (newPage) => {
    this.setState({
      currentPage: newPage,
    });
  };

  render() {
    let {
      dataPatient,
      isOpenRemedyModal,
      dataModal,
      isOpenMedicalRecordModal,
      currentPage,
      itemsPerPage,
      totalItems,
    } = this.state;

    let { language } = this.props;

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const displayedPatients = this.paginateData();

    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoangding}
          spinner
          text="Loading...."
        >
          <div className="manage-patient-container">
            <div className="m-p-title">Quản lí bệnh nhân khám bệnh</div>
            <div className="manage-patient-body row">
              <div className="col-3 form-group">
                <label>Chọn ngày khám :</label>
                <DatePicker
                  onChange={this.handleOnchangeDatePicker}
                  className="form-control"
                  value={this.state.currentDate}
                />
              </div>
              <div className="col-12 table-manage-patient">
                <table className="table" style={{ minHeight: "5rem" }}>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Họ và Tên</th>
                    <th scope="col">Thời gian</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Giới tính</th>
                    <th scope="col">Actions</th>
                  </tr>

                  <tbody>
                    {displayedPatients && displayedPatients.length > 0 ? (
                      displayedPatients.map((item, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </th>
                            <td>{item.patientData.firstName}</td>
                            <td>{item.timeTypeDataPatient.valueVi}</td>
                            <td>{item.patientData.address}</td>
                            <td>{item.patientData.genderData.valueVi}</td>
                            <td>
                              <button
                                className="btn btn-warning mx-2"
                                onClick={() => this.handleBtnSave(item)}
                              >
                                Lưu thông tin bệnh án
                              </button>
                              <button
                                className="btn btn-primary mx-2"
                                onClick={() => this.handleBtnConfirm(item)}
                              >
                                Xác nhận
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <th
                          colSpan="6"
                          style={{ textAlign: "center", fontSize: "20px" }}
                        >
                          Không tìm thấy dữ liệu!
                        </th>
                      </tr>
                    )}
                  </tbody>
                </table>

                <div className="pagination">
                  <button
                    className="btn btn-secondary"
                    disabled={currentPage === 1}
                    onClick={() => this.handlePageChange(currentPage - 1)}
                  >
                    Prev
                  </button>
                  <span>
                    Trang {currentPage} / {totalPages}
                  </span>
                  <button
                    className="btn btn-secondary"
                    disabled={currentPage === totalPages}
                    onClick={() => this.handlePageChange(currentPage + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
          <RemedyModal
            isOpenModal={isOpenRemedyModal}
            dataModal={dataModal}
            closeRemedyModal={this.closeRemedyModal}
            sendRemedy={this.sendRemedy}
          />
          <MedicalRecordModal
            isOpenModal={isOpenMedicalRecordModal}
            dataModal={dataModal}
            dataPatient={dataPatient}
            closeMedicalRecordModal={this.closeMedicalRecordModal}
          />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
