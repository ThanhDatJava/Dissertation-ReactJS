import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Modal } from "reactstrap";
// import "./ViewMedicalRecordModal.scss";
import moment from "moment";
import { toast } from "react-toastify";
import { CommonUtils } from "../../../utils";
import { Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import DatePicker from "../../../components/Input/DatePicker";
import { postMedicalRecords } from "../../../services/userService";
class ViewMedicalRecordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
    };
  }

  componentDidMount() {
    // Các timestamp bạn muốn tính toán

    // Tính số ngày giữa 2 timestamp
    const days = this.calculateDaysBetweenTimestamps(
      this.props.index.dateAdmission,
      this.props.index.dischargeDate
    );

    // Cập nhật số ngày vào state
    this.setState({ days: days.toFixed(0) });
  }
  componentDidUpdate(prevProps, prevState) {
    // Kiểm tra nếu props index thay đổi
    if (
      prevProps.index.dateAdmission !== this.props.index.dateAdmission ||
      prevProps.index.dischargeDate !== this.props.index.dischargeDate
    ) {
      // Các timestamp bạn muốn tính toán
      const { dateAdmission, dischargeDate } = this.props.index;

      // Tính số ngày giữa 2 timestamp từ props
      const days = this.calculateDaysBetweenTimestamps(
        dateAdmission,
        dischargeDate
      );

      // Cập nhật số ngày vào state nếu có sự thay đổi
      this.setState({ days: days.toFixed(0) });
    }
  }

  convertTimestampToDate(timestamp) {
    if (!timestamp) return ""; // Kiểm tra nếu timestamp không hợp lệ
    const date = new Date(timestamp);
    const dateString = date.toLocaleDateString("vi-VN"); // Lấy ngày tháng, không có giờ
    return dateString.split(" ")[0]; // Chỉ trả về phần ngày mà không có giờ
  }

  calculateDaysBetweenTimestamps = (timestamp1, timestamp2) => {
    // if (isNaN(timestamp1) || isNaN(timestamp2)) {
    //   console.error("Timestamp không hợp lệ");
    //   return 0; // Trả về 0 nếu một trong các timestamp không hợp lệ
    // }
    // Chuyển đổi timestamp từ mili-giây sang giây
    const timestamp1_seconds = timestamp1 / 1000;
    const timestamp2_seconds = timestamp2 / 1000;

    // Tính chênh lệch thời gian (số giây)
    const timeDifference_seconds = Math.abs(
      timestamp2_seconds - timestamp1_seconds
    );

    // Tính số ngày (1 ngày = 86400 giây)
    const daysDifference = timeDifference_seconds / 86400;

    return daysDifference;
  };

  render() {
    let { isOpenModal, closeViewMedicalRecordModal, dataModal, index } =
      this.props;

    const formattedDateBirthday = index?.birthday
      ? this.convertTimestampToDate(index.birthday * 1)
      : "N/A";

    const formattedDatehealthInsurancePeriod = index?.healthInsurancePeriod
      ? this.convertTimestampToDate(index.healthInsurancePeriod * 1)
      : "N/A";

    const formattedDatedateAdmission = index?.dateAdmission
      ? this.convertTimestampToDate(index.dateAdmission * 1)
      : "N/A";

    const formattedDatedischargeDate = index?.dischargeDate
      ? this.convertTimestampToDate(index.dischargeDate * 1)
      : "N/A";

    return (
      <Modal
        isOpen={isOpenModal}
        className={"booking-modal-container"}
        size="lg"
        centered
      >
        <div className="modal-header">
          <h5 className="modal-title ">Hồ sơ bệnh án</h5>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={closeViewMedicalRecordModal}
          >
            <span aria-hidden="true">x</span>
          </button>
        </div>
        <ModalBody>
          <form>
            <div className="form-row">
              <div className="form-group col-md-">
                <label>Cơ sở y tế : </label>
                <input
                  className="form-control"
                  value={index.medicalFacility}
                  disabled
                  style={{ cursor: "not-allowed" }}
                />

                <label>Bệnh viện : </label>
                <input
                  className="form-control"
                  value={index.hospital}
                  disabled
                  style={{ cursor: "not-allowed" }}
                />
              </div>
              <div className="form-group col-md-2">
                <label>Số lưu trữ : </label>
                <input
                  className="form-control"
                  value={index.storageNumber}
                  disabled
                  style={{ cursor: "not-allowed" }}
                />

                <label>Mã YT : </label>
                <input
                  className="form-control"
                  value={index.medicalCode}
                  disabled
                  style={{ cursor: "not-allowed" }}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-4">
                <label>Họ và tên : </label>
                <input
                  type="text"
                  className="form-control"
                  value={index.fullName}
                  disabled
                  style={{ cursor: "not-allowed" }}
                />
              </div>
              <div className="form-group col-md-4">
                <label>Ngày sinh : </label>
                <input
                  type="text"
                  className="form-control"
                  value={formattedDateBirthday}
                  disabled
                  style={{ cursor: "not-allowed" }}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-2">
                <label>Giới tính : </label>
                <input
                  type="text"
                  className="form-control"
                  value={index.gender}
                  disabled
                  style={{ cursor: "not-allowed" }}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Nghề nghiệp : </label>
                <input
                  type="text"
                  className="form-control"
                  value={index.job}
                  disabled
                  style={{ cursor: "not-allowed" }}
                />
              </div>

              <div className="form-group col-md-5">
                <label>Dân tộc : </label>
                <input
                  type="text"
                  className="form-control"
                  value={index.ethnicGroup}
                  disabled
                  style={{ cursor: "not-allowed" }}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-10">
                <label>Địa chỉ : </label>
                <input
                  type="text"
                  className="form-control"
                  value={index.address}
                  disabled
                  style={{ cursor: "not-allowed" }}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-4">
                <label>Nơi làm việc : </label>
                <input
                  type="text"
                  className="form-control"
                  value={index.workplace}
                  disabled
                  style={{ cursor: "not-allowed" }}
                />
              </div>
              <div className="form-group col-md-4">
                <label>Đối tượng : </label>
                <input
                  type="text"
                  className="form-control"
                  value={index.object}
                  disabled
                  style={{ cursor: "not-allowed" }}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-4">
                <label>BHYT thời hạn đến ngày : </label>
                <input
                  type="text"
                  className="form-control"
                  value={formattedDatehealthInsurancePeriod}
                  disabled
                  style={{ cursor: "not-allowed" }}
                />
              </div>
              <div className="form-group col-md-4">
                <label>Số thể BHYT : </label>
                <input
                  type="text"
                  className="form-control"
                  value={index.cardNumber}
                  disabled
                  style={{ cursor: "not-allowed" }}
                />
              </div>

              <div className="form-group col-md-4">
                <label>Số điện thoại : </label>
                <input
                  type="text"
                  className="form-control"
                  value={index.phoneNumber}
                  disabled
                  style={{ cursor: "not-allowed" }}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-4">
                <label>Ngày vào viện : </label>
                <input
                  type="text"
                  className="form-control"
                  value={formattedDatedateAdmission}
                  disabled
                  style={{ cursor: "not-allowed" }}
                />
              </div>
              <div className="form-group col-md-4">
                <label>Nơi giới thiệu : </label>
                <input
                  type="text"
                  className="form-control"
                  value={index.placeIntroduction}
                  disabled
                  style={{ cursor: "not-allowed" }}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-4">
                <label>Ngày Xuất viện : </label>
                <input
                  type="text"
                  className="form-control"
                  value={formattedDatedischargeDate}
                  disabled
                  style={{ cursor: "not-allowed" }}
                />
              </div>
              <div className="form-group col-md-4">
                <label>Tổng số ngày điều trị : </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.days}
                  disabled
                  style={{ cursor: "not-allowed" }}
                />
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={closeViewMedicalRecordModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewMedicalRecordModal);
