import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import SubSkeleton from "../utility/SubSkeleton";

import Sub from "../components/sub/Sub";
import Profile from "../components/profile/Profile";

import { connect } from "react-redux";
import { getSubs } from "../redux/actions/dataActions";

export class home extends Component {
  componentDidMount() {
    this.props.getSubs();
  }
  render() {
    const { subs, loading } = this.props.data;
    let recentSubsMarkup = !loading ? (
      subs.map((sub, index) => <Sub sub={sub} key={index} />)
    ) : (
      <SubSkeleton />
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentSubsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getSubs: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getSubs }
)(home);
