import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Speciality from "./Section/Speciality";
import MedicalFacility from "./Section/MedicalFacility";
import "./HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OutStandingDoctor from "./Section/OutStandingDoctor";
import HandBook from "./Section/HandBook";
import About from "./Section/About";
import HomeFooter from "./HomeFooter";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.specialityRef = createRef();
    this.MedicalFacilityRef = createRef();
    this.OutStandingDoctorRef = createRef();
    this.HandBookRef = createRef();
  }

  scrollToSpeciality = () => {
    if (this.specialityRef.current) {
      this.specialityRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  scrollToMedicalFacility = () => {
    if (this.MedicalFacilityRef.current) {
      this.MedicalFacilityRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  scrollToOutStandingDoctor = () => {
    if (this.OutStandingDoctorRef.current) {
      this.OutStandingDoctorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  scrollToHandBook = () => {
    if (this.HandBookRef.current) {
      this.HandBookRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  render() {
    let settings = {
      dots: false,
      infinite: false,
      speend: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <div>
        <HomeHeader
          isShowBanner={true}
          onScrollToSpeciality={this.scrollToSpeciality}
          onScrollToMedicalFacility={this.scrollToMedicalFacility}
          onScrollToOutStandingDoctor={this.scrollToOutStandingDoctor}
          onScrollToHandBook={this.scrollToHandBook}
        />
        <Speciality settings={settings} forwardedRef={this.specialityRef} />
        <MedicalFacility
          settings={settings}
          forwardedRef={this.MedicalFacilityRef}
        />
        <OutStandingDoctor
          settings={settings}
          forwardedRef={this.OutStandingDoctorRef}
        />
        <HandBook settings={settings} forwardedRef={this.HandBookRef} />
        <About />
        <HomeFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
