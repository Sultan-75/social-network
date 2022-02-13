import React from "react";
import { connect } from "react-redux";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <section key={alert.id} className="container">
      <div className={`alert alert-${alert.alertType}`}>{alert.msg}</div>
    </section>
  ));

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
