import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageMedicalRecords.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from "../../../utils";

import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";

import LoadingOverlay from "react-loading-overlay";
import { getAllMedicalRecords } from "../../../services/userService";
import ViewMedicalRecordModal from "./ViewMedicalRecordModal";
import DeleteMedicalRecordModal from "./DeleteMedicalRecordModal";
import EditMedicalRecordModal from "./EditMedicalRecordModal";
import MedicalRecordModal from "./MedicalRecordModal";

class ManageMedicalRecords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowLoangding: false,
      selectedMedicalRecord: {},
      dataMedicalRecord: [],
      index: "",
      isOpenViewMedicalRecordModal: false,
      isOpenDeleteMedicalRecordModal: false,
      isOpenEditMedicalRecordModal: false,
      searchEmail: "",

      currentPage: 1, // Trang hiện tại
      recordsPerPage: 5, // Số bản ghi hiển thị mỗi trang

      isOpenMedicalRecordModal: false,
    };
  }

  async componentDidMount() {
    this.getDataMedicalRecord();
  }
  getDataMedicalRecord = async () => {
    let res = await getAllMedicalRecords({});
    if (res && res.errCode === 0) {
      this.setState({
        dataMedicalRecord: res.data,
      });
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleBtnView = (index) => {
    this.setState({
      isOpenViewMedicalRecordModal: true,
      index: index,
    });
  };

  handleBtnEdit = (index) => {
    this.setState({
      isOpenEditMedicalRecordModal: true,
      index: index,
    });
  };

  handleBtndelete = (index) => {
    this.setState({
      isOpenDeleteMedicalRecordModal: true,
      index: index,
    });
  };

  handleBtnAdd = () => {
    this.setState({
      isOpenMedicalRecordModal: true,
    });
  };

  closeMedicalRecordModal = () => {
    this.setState({
      isOpenMedicalRecordModal: false,
    });
  };

  closeViewMedicalRecordModal = () => {
    this.setState({
      isOpenViewMedicalRecordModal: false,
      dataModal: {},
    });
  };
  closeEditMedicalRecordModal = () => {
    this.setState({
      isOpenEditMedicalRecordModal: false,
      dataModal: {},
    });
  };

  closeDeleteMedicalRecordModal = () => {
    this.setState({
      isOpenDeleteMedicalRecordModal: false,
      dataModal: {},
    });
  };

  handleSearchChange = (event) => {
    this.setState({
      searchEmail: event.target.value,
      currentPage: 1,
    });
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  render() {
    let { language } = this.props;
    let {
      dataMedicalRecord,
      isOpenViewMedicalRecordModal,
      isOpenEditMedicalRecordModal,
      isOpenDeleteMedicalRecordModal,
      isOpenMedicalRecordModal,
      index,
    } = this.state;

    const { searchEmail, currentPage, recordsPerPage } = this.state;

    const filteredData = dataMedicalRecord.filter((item) =>
      item.email.toLowerCase().includes(searchEmail.toLowerCase())
    );

    const totalRecords = filteredData.length;
    const totalPages = Math.ceil(totalRecords / recordsPerPage);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredData.slice(
      indexOfFirstRecord,
      indexOfLastRecord
    );

    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoangding}
          spinner
          text="Loading...."
        >
          <div className="manage-patient-container">
            <div className="m-p-title">Quản lí bệnh án</div>
            <div className="manage-patient-body row">
              <div className="col-3 form-group">
                <label htmlFor="searchEmail" className="form-label">
                  Tìm kiếm theo email:
                </label>
                <input
                  type="text"
                  id="searchEmail"
                  className="form-control"
                  placeholder="Nhập email để tìm..."
                  value={searchEmail}
                  onChange={this.handleSearchChange}
                />
              </div>
              <div className="col-12 table-manage-patient">
                <button
                  type="button"
                  class="btn btn-info"
                  onClick={() => this.handleBtnAdd()}
                >
                  <i class="fa fa-plus" aria-hidden="true"></i> Add
                </button>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Email</th>
                      <th>Họ và tên</th>
                      <th>Địa chỉ</th>
                      <th>Số điện thoại</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRecords.length > 0 ? (
                      currentRecords.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1 + indexOfFirstRecord}</th>
                          <td>{item.email}</td>
                          <td>{item.fullName}</td>
                          <td>{item.address}</td>
                          <td>{item.phoneNumber}</td>
                          <td>
                            <button
                              className="btn btn-warning  mx-2"
                              onClick={() => this.handleBtnView(item)}
                            >
                              Xem thông tin
                            </button>

                            <button
                              className="btn btn-primary mx-2 my-2"
                              onClick={() => this.handleBtnEdit(item)}
                            >
                              Cập nhật
                            </button>
                            <button
                              className="btn btn-danger mx-2 px-4"
                              onClick={() => this.handleBtndelete(item)}
                            >
                              Xóa
                            </button>
                          </td>
                        </tr>
                      ))
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
              </div>

              <div
                className="pagination"
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 auto",
                }}
              >
                <button
                  className="btn btn-success"
                  onClick={() => this.handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Trang trước
                </button>
                <span className="mx-3">
                  Trang {currentPage} / {totalPages}
                </span>
                <button
                  className="btn btn-success"
                  onClick={() => this.handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Trang sau
                </button>
              </div>
            </div>
          </div>

          <MedicalRecordModal
            isOpenModal={isOpenMedicalRecordModal}
            closeMedicalRecordModal={this.closeMedicalRecordModal}
          />

          <ViewMedicalRecordModal
            isOpenModal={isOpenViewMedicalRecordModal}
            dataModal={dataMedicalRecord}
            closeViewMedicalRecordModal={this.closeViewMedicalRecordModal}
            index={index}
          />

          <EditMedicalRecordModal
            isOpenModal={isOpenEditMedicalRecordModal}
            dataModal={dataMedicalRecord}
            closeEditMedicalRecordModal={this.closeEditMedicalRecordModal}
            getDataMedicalRecord={this.getDataMedicalRecord}
            index={index}
          />

          <DeleteMedicalRecordModal
            isOpenModal={isOpenDeleteMedicalRecordModal}
            closeDeleteMedicalRecordModal={this.closeDeleteMedicalRecordModal}
            index={index}
            getDataMedicalRecord={this.getDataMedicalRecord}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageMedicalRecords);
