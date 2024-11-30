import React, { Component } from "react";
import { connect } from "react-redux";

import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-container">
          <div className="section-about-header text-center">
            Truyền thông nói về BookingDoctor
          </div>
          <div className="section-about-content">
            <div className="content-left">
              <iframe
                width="100%"
                height="400px"
                src="https://www.youtube.com/embed/FyDQljKtWnI"
                title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <div className="content-right">
              <p>
                " Trong lĩnh vực chăm sóc sức khỏe đã có nhiều giải pháp để hỗ
                trợ người bệnh theo các hướng khác nhau. Có ứng dụng cung cấp
                thông tin để người bệnh tham khảo; có nơi tập trung vào mảng bác
                sĩ gia đình; đưa ra giải pháp về xét nghiệm tại nhà; và có cả
                nền tảng giúp người bệnh hỏi đáp bác sĩ. Tuy nhiên, đó chưa phải
                là những giải pháp giúp người bệnh dễ dàng tiếp cận với việc đi
                khám và giải quyết được vấn đề quá tải tại các bệnh viện.
                BookingCare là nền tảng tập trung vào việc đặt khám chuyên khoa,
                kết nối bệnh nhân với bác sĩ, cơ sở y tế và giúp trải nghiệm đi
                khám của người bệnh được tốt hơn, hiệu quả hơn. Đồng thời, góp
                phần giải quyết vấn đề quá tải của các bệnh viện hiện nay. Nền
                tảng này được xây dựng đơn giản, dễ sử dụng, phản ánh hành trình
                đi khám thực tế của người bệnh. Tập trung vào nhóm bệnh chuyên
                khoa, không có tính chất cấp cứu, bệnh mãn tính, những người
                biết rõ tình trạng bệnh của mình và chủ động sắp xếp kế hoạch đi
                khám. "
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
