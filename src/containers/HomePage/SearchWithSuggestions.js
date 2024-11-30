import React, { Component } from "react";
import "./SearchWithSuggestions.scss";
import { getAllSpecialty } from "../../services/userService";
import { withRouter } from "react-router";
class SearchWithSuggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchSpecialty: "", // Lưu giá trị input
      suggestions: [], // Lưu danh sách gợi ý
      dataSpeciality: [],
      nameSpecialtie: [],
      specialties: [],
    };
  }

  async componentDidMount() {
    this.getDataSpeciality();
    this.getNameSpeciality();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataSpeciality !== this.props.dataSpeciality) {
      this.setState({
        dataSpeciality: this.props.dataSpeciality,
      });
    }
  }
  getNameSpeciality = async () => {
    let res = await getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        nameSpecialtie: res.data,
      });
    }
    let name = this.state.nameSpecialtie.map((user) => user.name);
    this.setState({
      specialties: name,
    });
  };

  getDataSpeciality = async () => {
    let res = await getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpeciality: res.data,
      });
    }
  };

  // handleSearchChange = (event) => {
  //   const value = event.target.value;
  //   this.setState({ searchSpecialty: value });
  //   const filteredData = this.state.dataSpeciality.filter((item) =>
  //     item.name.toLowerCase().includes(this.state.searchSpecialty.toLowerCase())
  //   );
  //   if (filteredData.length > 0) {
  //     // Use the history prop provided by withRouter to navigate
  //     this.props.history.push(`/detail-specialty/${filteredData[0].id}`);
  //   }

  //   // Lọc các chuyên khoa dựa trên input người dùng
  //   if (value) {
  //     const filteredSuggestions = this.state.specialties.filter((specialty) =>
  //       specialty.toLowerCase().includes(value.toLowerCase())
  //     );
  //     this.setState({ suggestions: filteredSuggestions });
  //   } else {
  //     this.setState({ suggestions: [] }); // Nếu không có giá trị, xóa gợi ý
  //   }
  // };

  // Hàm xử lý khi người dùng chọn một gợi ý

  handleSearchChange = (event) => {
    const value = event.target.value;
    this.setState({ searchSpecialty: value });

    // Lọc các chuyên khoa dựa trên input người dùng
    if (value) {
      const filteredSuggestions = this.state.specialties.filter((specialty) =>
        specialty.toLowerCase().includes(value.toLowerCase())
      );
      this.setState({ suggestions: filteredSuggestions });
    } else {
      this.setState({ suggestions: [] }); // Nếu không có giá trị, xóa gợi ý
    }
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const value = event.target.value;
      const filteredData = this.state.dataSpeciality.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );

      if (filteredData.length > 0) {
        // Dẫn đến trang chi tiết của chuyên khoa đầu tiên tìm được
        this.props.history.push(`/detail-specialty/${filteredData[0].id}`);
      }
    }
  };

  handleSuggestionClick = (suggestion) => {
    this.setState({
      searchSpecialty: suggestion,
      suggestions: [], // Ẩn gợi ý khi chọn
    });

    const filteredData = this.state.dataSpeciality.filter((item) =>
      item.name.toLowerCase().includes(this.state.searchSpecialty.toLowerCase())
    );

    if (filteredData.length > 0) {
      // Use the history prop provided by withRouter to navigate
      this.props.history.push(`/detail-specialty/${filteredData[0].id}`);
    }
  };

  render() {
    const { searchSpecialty, suggestions, dataSpeciality } = this.state;

    return (
      <div className="search">
        <i className="fas fa-search"></i>
        <input
          type="text"
          id="searchSpecialty"
          placeholder="Tìm chuyên khoa khám bệnh"
          value={searchSpecialty}
          onChange={(event) => this.handleSearchChange(event)} // Xử lý thay đổi input
          onKeyPress={this.handleKeyPress}
        />
        {/* Hiển thị danh sách gợi ý nếu có */}
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => this.handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default withRouter(SearchWithSuggestions);
