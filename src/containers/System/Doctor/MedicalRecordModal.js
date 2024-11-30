import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Modal } from "reactstrap";
// import "./MedicalRecordModal.scss";
import moment from "moment";
import { toast } from "react-toastify";
import { CommonUtils } from "../../../utils";
import { Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import DatePicker from "../../../components/Input/DatePicker";
import { postMedicalRecords } from "../../../services/userService";
class MedicalRecordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
  }

  async componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
        gender: this.props.dataModal.gender,
        fullName: this.props.dataModal.patientName,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
        gender: this.props.dataModal.gender,
        fullName: this.props.dataModal.patientName,
      });
    }
  }

  handleOnchangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handleOnchangeGender = (event) => {
    this.setState({
      gender: event.target.value,
    });
  };

  handleOnchangeFullname = (event) => {
    this.setState({
      fullName: event.target.value,
    });
  };

  handleOnchangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnchangeDatePickerBirthday = (date) => {
    this.setState({
      birthday: date[0],
    });
  };
  handleOnchangeDatePickerHealthInsurancePeriod = (date) => {
    this.setState({
      healthInsurancePeriod: date[0],
    });
  };

  handleOnchangeDatePickerDateAdmission = (date) => {
    this.setState({
      dateAdmission: date[0],
    });
  };

  handleOnchangeDatePickerDischargeDate = (date) => {
    this.setState({
      dischargeDate: date[0],
    });
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

  handleSaveRecords = async () => {
    let isValid = this.checkValidateInput();
    let date = new Date(this.state.birthday).getTime();

    let dateHealthInsurancePeriod = new Date(
      this.state.healthInsurancePeriod
    ).getTime();
    let dateDateAdmission = new Date(this.state.dateAdmission).getTime();
    let dateDischargeDate = new Date(this.state.dischargeDate).getTime();

    if (isValid === true) {
      let res = await postMedicalRecords({
        email: this.state.email,
        medicalFacility: this.state.medicalFacility,
        hospital: this.state.hospital,
        storageNumber: this.state.storageNumber,
        medicalCode: this.state.medicalCode,
        fullName: this.state.fullName,
        birthday: date,
        gender: this.state.gender,
        job: this.state.job,
        ethnicGroup: this.state.ethnicGroup,
        address: this.state.address,
        workplace: this.state.workplace,
        object: this.state.object,
        healthInsurancePeriod: dateHealthInsurancePeriod,
        cardNumber: this.state.cardNumber,
        phoneNumber: this.state.phoneNumber,
        dateAdmission: dateDateAdmission,
        placeIntroduction: this.state.placeIntroduction,
        dischargeDate: dateDischargeDate,
        totalTreatmentDays: this.state.totalTreatmentDays,
      });
      if (res && res.errCode === 0) {
        toast.success("Success !");
        this.props.closeMedicalRecordModal();
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
    let { isOpenModal, closeMedicalRecordModal, dataModal, dataPatient } =
      this.props;

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
            onClick={closeMedicalRecordModal}
          >
            <span aria-hidden="true">x</span>
          </button>
        </div>
        <ModalBody>
          <form>
            <div className="row">
              <div className="col-5 form-group">
                <label>Email bệnh nhân</label>
                <input
                  className="form-control"
                  type="email"
                  value={this.state.email}
                  onChange={(event) => this.handleOnchangeEmail(event)}
                />
              </div>
            </div>

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
                  onChange={(event) => this.handleOnchangeFullname(event)}
                />
              </div>
              <div className="form-group col-md-4">
                <label>Ngày sinh : </label>
                <DatePicker
                  onChange={this.handleOnchangeDatePickerBirthday}
                  className="form-control"
                  value={this.state.birthday}
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
                    this.handleOnchangeGender(event, "gender")
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
                <DatePicker
                  onChange={this.handleOnchangeDatePickerHealthInsurancePeriod}
                  className="form-control"
                  value={this.state.healthInsurancePeriod}
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
                <DatePicker
                  onChange={this.handleOnchangeDatePickerDateAdmission}
                  className="form-control"
                  value={this.state.dateAdmission}
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
                <DatePicker
                  onChange={this.handleOnchangeDatePickerDischargeDate}
                  className="form-control"
                  value={this.state.dischargeDate}
                />
              </div>
              <div className="form-group col-md-4">
                <label>Tổng số ngày điều trị : </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.totalTreatmentDays}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "totalTreatmentDays")
                  }
                />
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.handleSaveRecords()}>
            Save
          </Button>
          <Button color="secondary" onClick={closeMedicalRecordModal}>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalRecordModal);
