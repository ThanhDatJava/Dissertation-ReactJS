import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../../utils";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import Select from "react-select";
import { postPatientBookAppointment } from "../../../../services/userService";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import LoadingOverlay from "react-loading-overlay";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reson: "",
      birthday: "",
      selectedGender: "",
      doctorId: "",
      genders: "",
      timeType: "",
      isShowLoangding: false,
    };
  }

  async componentDidMount() {
    this.props.getGenders();
  }

  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;

    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.genders !== prevProps.genders) {
      if (this.props)
        this.setState({
          genders: this.buildDataGender(this.props.genders),
        });
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId;
        let timeType = this.props.dataTime.timeType;
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
  }

  handleOnchangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnchangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };

  handleOnchangeSelect = (selectedOption) => {
    this.setState({
      selectedGender: selectedOption,
    });
  };

  buildTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("dddd - MM/DD/YYYY");
      return `${time} - ${date}`;
    }
    return "";
  };

  buildDoctorName = (dataTime) => {
    let { language } = this.props;
    if (dataTime) {
      let name =
        language === LANGUAGES.VI
          ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
          : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
      return name;
    }
    return "";
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = [
      "fullName",
      "phoneNumber",
      "email",
      "address",
      "reson",
      "birthday",
      "selectedGender",
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

  handleConfirmBooking = async () => {
    this.setState({
      isShowLoangding: true,
    });
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.dataTime);
    let doctorName = this.buildDoctorName(this.props.dataTime);
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      let res = await postPatientBookAppointment({
        fullName: this.state.fullName,
        phoneNumber: this.state.phoneNumber,
        email: this.state.email,
        address: this.state.address,
        reson: this.state.reson,
        date: this.props.dataTime.date,
        birthday: date,
        selectedGender: this.state.selectedGender.value,
        doctorId: this.state.doctorId,
        timeType: this.state.timeType,
        language: this.props.language,
        timeString: timeString,
        doctorName: doctorName,
      });
      if (res && res.errCode === 0) {
        toast.success("Bookning a new appointment succeed !");

        this.setState({
          fullName: "",
          phoneNumber: "",
          email: "",
          address: "",
          reson: "",
          birthday: "",
          selectedGender: "",
          doctorId: "",
          genders: "",
          timeType: "",
          isShowLoangding: false,
        });
        this.props.closeBookingModal();
      } else {
        toast.error("Bookning a new appointment error !");
        this.setState({
          isShowLoangding: false,
        });
      }
    }
  };
  render() {
    let { isOpenModal, closeBookingModal, dataTime } = this.props;
    let doctorId = "";
    if (dataTime) {
      doctorId = dataTime.doctorId;
    }

    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoangding}
          spinner
          text="Loading...."
        >
          <Modal
            isOpen={isOpenModal}
            className={"booking-modal-container"}
            size="lg"
            centered
          >
            <div className="booking-modal-content">
              <div className="booking-modal-header">
                <span className="left">
                  <FormattedMessage id="patient.booking-modal.title" />
                </span>
                <span className="right" onClick={closeBookingModal}>
                  <i className="fas fa-times"></i>
                </span>
              </div>
              <div className="booking-modal-body">
                <div className="doctor-infor">
                  <ProfileDoctor
                    doctorId={doctorId}
                    isShowDescriptionDoctor={false}
                    dataTime={dataTime}
                    isShowLinkDetail={false}
                    isShowPrice={true}
                  />
                </div>

                <div className="row">
                  <div className="col-6 form-group">
                    <label>
                      <FormattedMessage id="patient.booking-modal.full-name" />
                    </label>
                    <input
                      className="form-control"
                      value={this.state.fullName}
                      onChange={(event) =>
                        this.handleOnchangeInput(event, "fullName")
                      }
                    />
                  </div>

                  <div className="col-6 form-group">
                    <label>
                      <FormattedMessage id="patient.booking-modal.phone-number" />
                    </label>
                    <input
                      className="form-control"
                      value={this.state.phoneNumber}
                      onChange={(event) =>
                        this.handleOnchangeInput(event, "phoneNumber")
                      }
                    />
                  </div>

                  <div className="col-6 form-group">
                    <label>
                      <FormattedMessage id="patient.booking-modal.email" />
                    </label>
                    <input
                      className="form-control"
                      value={this.state.email}
                      onChange={(event) =>
                        this.handleOnchangeInput(event, "email")
                      }
                    />
                  </div>

                  <div className="col-6 form-group">
                    <label>
                      <FormattedMessage id="patient.booking-modal.address" />
                    </label>
                    <input
                      className="form-control"
                      value={this.state.address}
                      onChange={(event) =>
                        this.handleOnchangeInput(event, "address")
                      }
                    />
                  </div>

                  <div className="col-12 form-group">
                    <label>
                      <FormattedMessage id="patient.booking-modal.reason" />
                    </label>
                    <input
                      className="form-control"
                      value={this.state.reson}
                      onChange={(event) =>
                        this.handleOnchangeInput(event, "reson")
                      }
                    />
                  </div>

                  <div className="col-6 form-group">
                    <label>
                      <FormattedMessage id="patient.booking-modal.birthday" />
                    </label>
                    <DatePicker
                      onChange={this.handleOnchangeDatePicker}
                      className="form-control"
                      value={this.state.birthday}
                    />
                  </div>

                  <div className="col-6 form-group">
                    <label>
                      <FormattedMessage id="patient.booking-modal.gender" />
                    </label>
                    <Select
                      value={this.state.selectedGender}
                      onChange={this.handleOnchangeSelect}
                      options={this.state.genders}
                    />
                  </div>
                </div>
              </div>
              <div className="booking-modal-footer">
                <button
                  className="btn btn-primary btn-booking-confirm"
                  onClick={() => this.handleConfirmBooking()}
                >
                  <FormattedMessage id="patient.booking-modal.confirm" />
                </button>
                <button
                  className="btn btn-warning btn-booking-cancel "
                  onClick={closeBookingModal}
                >
                  <FormattedMessage id="patient.booking-modal.cancel" />
                </button>
              </div>
            </div>
          </Modal>
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
