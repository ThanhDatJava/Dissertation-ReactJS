import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Modal } from "reactstrap";
// import "./DeleteMedicalRecordModal.scss";
import moment from "moment";
import { toast } from "react-toastify";
import { CommonUtils } from "../../../utils";
import { Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import DatePicker from "../../../components/Input/DatePicker";
import {
  deleteMedicalRecords,
  postMedicalRecords,
} from "../../../services/userService";
class DeleteMedicalRecordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {}

  handleConfirm = async (index) => {
    let res = await deleteMedicalRecords(index.id);
    if (res && res.errCode === 0) {
      toast.success("DELETE SUCCESS");
      this.props.getDataMedicalRecord();
      this.props.closeDeleteMedicalRecordModal();
    } else {
      toast.error("DELETE ERROR");
    }
  };

  render() {
    let { isOpenModal, index, closeDeleteMedicalRecordModal } = this.props;

    return (
      <Modal
        isOpen={isOpenModal}
        className={"booking-modal-container"}
        size="lg"
        centered
      >
        <div className="modal-header">
          <h5 className="modal-title ">Bạn có chắc muốn xóa bệnh án của : </h5>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={closeDeleteMedicalRecordModal}
          >
            <span aria-hidden="true">x</span>
          </button>
        </div>
        <ModalBody>
          <form>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label>Ho va Ten : </label>
                <input
                  className="form-control"
                  value={index.fullName}
                  disabled
                  style={{ cursor: "not-allowed" }}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Email : </label>
                <input
                  className="form-control"
                  value={index.email}
                  disabled
                  style={{ cursor: "not-allowed" }}
                />
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.handleConfirm(index)}>
            Confirm
          </Button>
          <Button color="secondary" onClick={closeDeleteMedicalRecordModal}>
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
)(DeleteMedicalRecordModal);
