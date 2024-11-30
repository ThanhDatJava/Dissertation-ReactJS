import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Modal } from "reactstrap";
// import "./EditMedicalRecordModal.scss";
import moment from "moment";
import { toast } from "react-toastify";
import { CommonUtils } from "../../../utils";
import { Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import DatePicker from "../../../components/Input/DatePicker";
import {
  editMedicalRecords,
  postMedicalRecords,
} from "../../../services/userService";
import { event } from "jquery";
class EditMedicalRecordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      id: "",
      email: "",
      medicalFacility: "",
      hospital: "",
      storageNumber: "",
      medicalCode: "",
      fullName: " ",
      birthday: props.birthday || new Date(),
      gender: "",
      job: "",
      ethnicGroup: "",
      address: "",
      workplace: "",
      object: "",
      healthInsurancePeriod: "",
      cardNumber: "",
      phoneNumber: "",
      dateAdmission: "",
      placeIntroduction: "",
      dischargeDate: "",
      totalTreatmentDays: "",
    };
  }

  async componentDidMount() {
    // Các timestamp bạn muốn tính toán

    // Tính số ngày giữa 2 timestamp
    const days = this.calculateDaysBetweenTimestamps(
      this.props.index.dateAdmission,
      this.props.index.dischargeDate
    );

    // Cập nhật số ngày vào state
    this.setState({ days: days.toFixed(0) });

    if (this.props.index) {
      this.setState({
        id: this.props.index.id,
        email: this.props.index.email,
        medicalFacility: this.props.index.medicalFacility,
        hospital: this.props.index.hospital,
        storageNumber: this.props.index.storageNumber,
        medicalCode: this.props.index.medicalCode,
        fullName: this.props.index.fullName,
        birthday: this.props.index.birthday,
        gender: this.props.index.gender,
        job: this.props.index.job,
        ethnicGroup: this.props.index.ethnicGroup,
        address: this.props.index.address,
        workplace: this.props.index.workplace,
        object: this.props.index.object,
        healthInsurancePeriod: this.props.index.healthInsurancePeriod,
        cardNumber: this.props.index.cardNumber,
        phoneNumber: this.props.index.phoneNumber,
        dateAdmission: this.props.index.dateAdmission,
        placeIntroduction: this.props.index.placeIntroduction,
        dischargeDate: this.props.index.dischargeDate,
        totalTreatmentDays: this.props.index.totalTreatmentDays,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
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
    if (prevProps.index !== this.props.index) {
      this.setState({
        id: this.props.index.id,
        email: this.props.index.email,
        medicalFacility: this.props.index.medicalFacility,
        hospital: this.props.index.hospital,
        storageNumber: this.props.index.storageNumber,
        medicalCode: this.props.index.medicalCode,
        fullName: this.props.index.fullName,
        birthday: this.props.index.birthday,
        gender: this.props.index.gender,
        job: this.props.index.job,
        ethnicGroup: this.props.index.ethnicGroup,
        address: this.props.index.address,
        workplace: this.props.index.workplace,
        object: this.props.index.object,
        healthInsurancePeriod: this.props.index.healthInsurancePeriod,
        cardNumber: this.props.index.cardNumber,
        phoneNumber: this.props.index.phoneNumber,
        dateAdmission: this.props.index.dateAdmission,
        placeIntroduction: this.props.index.placeIntroduction,
        dischargeDate: this.props.index.dischargeDate,
        totalTreatmentDays: this.props.index.totalTreatmentDays,
      });
    }
  }

  // convertTimestampToDate(timestamp) {
  //   if (!timestamp) return ""; // Kiểm tra nếu timestamp không hợp lệ
  //   const date = new Date(timestamp);
  //   const dateString = date.toLocaleDateString("vi-VN"); // Lấy ngày tháng, không có giờ
  //   return dateString.split(" ")[0]; // Chỉ trả về phần ngày mà không có giờ
  // }

  convertToTimestamp = (date) => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      console.error("Invalid date passed:", date);
      return NaN; // Return NaN if the date is invalid
    }
    return date.getTime(); // Return timestamp if date is valid
  };

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

  handleOnchangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnchangeDatePicker = (date, id) => {
    console.log("Received date:", date); // Log the value of 'date'

    const validDate = Array.isArray(date) ? date[0] : date; // Handle array if passed
    const valueInput = this.convertToTimestamp(validDate); // Convert date to timestamp
    this.setState(
      {
        [id]: valueInput, // Dynamically update state using the `id`
      },
      () => {
        console.log("check state birthday : ", this.state.birthday); // Log the updated state
      }
    );
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = [
      "email",
      "medicalFacility",
      "hospital",
      "storageNumber",
      "medicalCode",
      "fullName",
      "birthday",
      "job",
      "gender",
      "ethnicGroup",
      "address",
      "workplace",
      "object",
      "healthInsurancePeriod",
      "cardNumber",
      "phoneNumber",
      "dateAdmission",
      "placeIntroduction",
      "dischargeDate",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        toast.error(`Missing parameter : ${arrInput[i]} ! `);
        break;
      }
    }
    return isValid;
  };

  convertToTimestamp(dateString) {
    const date = new Date(dateString); // Tạo đối tượng Date từ chuỗi thời gian
    return Math.floor(date.getTime()); // Lấy timestamp (giây)
  }

  handleEditRecords = async () => {
    console.log("check this.state edit :", this.state);

    let isValid = this.checkValidateInput();

    if (isValid === true) {
      let res = await editMedicalRecords({
        id: this.state.id,
        email: this.state.email,
        medicalFacility: this.state.medicalFacility,
        hospital: this.state.hospital,
        storageNumber: this.state.storageNumber,
        medicalCode: this.state.medicalCode,
        fullName: this.state.fullName,
        birthday: this.state.birthday,
        gender: this.state.gender,
        job: this.state.job,
        ethnicGroup: this.state.ethnicGroup,
        address: this.state.address,
        workplace: this.state.workplace,
        object: this.state.object,
        healthInsurancePeriod: this.state.healthInsurancePeriod,
        cardNumber: this.state.cardNumber,
        phoneNumber: this.state.phoneNumber,
        dateAdmission: this.state.dateAdmission,
        placeIntroduction: this.state.placeIntroduction,
        dischargeDate: this.state.dischargeDate,
        totalTreatmentDays: this.state.days,
      });
      if (res && res.errCode === 0) {
        toast.success("Success !");
        this.props.getDataMedicalRecord();
        this.props.closeEditMedicalRecordModal();

        this.setState({
          email: "",
          medicalFacility: "",
          hospital: "",
          storageNumber: "",
          medicalCode: "",
          fullName: " ",
          birthday: "",
          gender: "",
          job: "",
          ethnicGroup: "",
          address: "",
          workplace: "",
          object: "",
          healthInsurancePeriod: "",
          cardNumber: "",
          phoneNumber: "",
          dateAdmission: "",
          placeIntroduction: "",
          dischargeDate: "",
          totalTreatmentDays: "",
        });
      } else {
        toast.error("Error !");
      }
    }
  };

  render() {
    let { isOpenModal, closeEditMedicalRecordModal, dataModal, index } =
      this.props;

    // const formattedDateBirthday = index?.birthday
    //   ? this.convertTimestampToDate(index.birthday * 1)
    //   : "N/A";

    // const formattedDatehealthInsurancePeriod = index?.healthInsurancePeriod
    //   ? this.convertTimestampToDate(index.healthInsurancePeriod * 1)
    //   : "N/A";

    // const formattedDatedateAdmission = index?.dateAdmission
    //   ? this.convertTimestampToDate(index.dateAdmission * 1)
    //   : "N/A";

    // const formattedDatedischargeDate = index?.dischargeDate
    //   ? this.convertTimestampToDate(index.dischargeDate * 1)
    //   : "N/A";
    console.log("check props", this.props);
    const { birthday } = this.state;
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
            onClick={closeEditMedicalRecordModal}
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
                  value={this.state.medicalFacility}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "medicalFacility")
                  }
                />

                <label>Bệnh viện : </label>
                <input
                  className="form-control"
                  value={this.state.hospital}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "hospital")
                  }
                />
              </div>
              <div className="form-group col-md-2">
                <label>Số lưu trữ : </label>
                <input
                  className="form-control"
                  value={this.state.storageNumber}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "storageNumber")
                  }
                />

                <label>Mã YT : </label>
                <input
                  className="form-control"
                  value={this.state.medicalCode}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "medicalCode")
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-4">
                <label>Họ và tên : </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.fullName}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "fullName")
                  }
                />
              </div>
              <div className="form-group col-md-4">
                <label>Ngày sinh : </label>
                {/* <DatePicker
                  className="form-control"
                  selected={this.state.birthday}
                  onChange={(date) =>
                    this.handleOnchangeDatePicker(date, "birthday")
                  }
                  value={formattedDateBirthday}
                /> */}

                <DatePicker
                  className="form-control"
                  selected={
                    this.state.birthday instanceof Date
                      ? this.state.birthday
                      : new Date()
                  } // Ensure it's a valid Date object
                  onChange={(date) =>
                    this.handleOnchangeDatePicker(date, "birthday")
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-2">
                <label>Giới tính : </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.gender}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "gender")
                  }
                />
              </div>
              <div className="form-group col-md-3">
                <label>Nghề nghiệp : </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.job}
                  onChange={(event) => this.handleOnchangeInput(event, "job")}
                />
              </div>

              <div className="form-group col-md-5">
                <label>Dân tộc : </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.ethnicGroup}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "ethnicGroup")
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-10">
                <label>Địa chỉ : </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.address}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "address")
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-4">
                <label>Nơi làm việc : </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.workplace}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "workplace")
                  }
                />
              </div>
              <div className="form-group col-md-4">
                <label>Đối tượng : </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.object}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "object")
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-4">
                <label>BHYT thời hạn đến ngày : </label>
                {/* <DatePicker
                  className="form-control"
                  selected={this.state.healthInsurancePeriod}
                  onChange={(date) =>
                    this.handleOnchangeDatePicker(date, "healthInsurancePeriod")
                  }
                  value={formattedDatehealthInsurancePeriod}
                /> */}

                <DatePicker
                  className="form-control"
                  selected={
                    this.state.healthInsurancePeriod instanceof Date
                      ? this.state.healthInsurancePeriod
                      : new Date()
                  } // Ensure it's a valid Date object
                  onChange={(date) =>
                    this.handleOnchangeDatePicker(date, "healthInsurancePeriod")
                  }
                />
              </div>
              <div className="form-group col-md-4">
                <label>Số thể BHYT : </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.cardNumber}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "cardNumber")
                  }
                />
              </div>

              <div className="form-group col-md-4">
                <label>Số điện thoại : </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.phoneNumber}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "phoneNumber")
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-4">
                <label>Ngày vào viện : </label>

                {/* <DatePicker
                  className="form-control"
                  value={formattedDatedateAdmission}
                  selected={this.state.dateAdmission}
                  onChange={(date) =>
                    this.handleOnchangeDatePicker(date, "dateAdmission")
                  }
                /> */}

                <DatePicker
                  className="form-control"
                  selected={
                    this.state.dateAdmission instanceof Date
                      ? this.state.dateAdmission
                      : new Date()
                  } // Ensure it's a valid Date object
                  onChange={(date) =>
                    this.handleOnchangeDatePicker(date, "dateAdmission")
                  }
                />
              </div>
              <div className="form-group col-md-4">
                <label>Nơi giới thiệu : </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.placeIntroduction}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "placeIntroduction")
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-4">
                <label>Ngày Xuất viện : </label>

                {/* <DatePicker
                  className="form-control"
                  value={formattedDatedischargeDate}
                  selected={this.state.dischargeDate}
                  onChange={(date) =>
                    this.handleOnchangeDatePicker(date, "dischargeDate")
                  }
                /> */}

                <DatePicker
                  className="form-control"
                  selected={
                    this.state.dischargeDate instanceof Date
                      ? this.state.dischargeDate
                      : new Date()
                  } // Ensure it's a valid Date object
                  onChange={(date) =>
                    this.handleOnchangeDatePicker(date, "dischargeDate")
                  }
                />
              </div>
              <div className="form-group col-md-4">
                <label>Tổng số ngày điều trị : </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.days}
                />
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={this.handleEditRecords}>
            Save
          </Button>
          <Button color="secondary" onClick={closeEditMedicalRecordModal}>
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
)(EditMedicalRecordModal);
