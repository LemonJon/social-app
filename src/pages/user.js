import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Sub from "../components/sub/Sub";
import StaticProfile from "../components/profile/StaticProfile";

import SubSkeleton from "../utility/SubSkeleton";
import ProfileSkeleton from "../utility/ProfileSkeleton";

// MUI
import Grid from "@material-ui/core/Grid";

// redux
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

export class user extends Component {
  state = {
    profile: null,
    subIdParam: null
  };

  componentDidMount() {
    const name = this.props.match.params.name;
    const subId = this.props.match.params.subId;

    if (subId) this.setState({ subIdParam: subId });

    this.props.getUserData(name);
    axios
      .get(`/user/${name}`)
      .then(res => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { subs, loading } = this.props.data;
    const { subIdParam } = this.state;

    const subsMarkup = loading ? (
      <SubSkeleton />
    ) : subs === null ? (
      <p> Empty! User hasn't made any submissions </p>
    ) : !subIdParam ? (
      subs.map(sub => <Sub key={sub.subId} sub={sub} />)
    ) : (
      subs.map(sub => {
        if (sub.subId !== subIdParam) return <Sub key={sub.subId} sub={sub} />;
        else return <Sub key={sub.subId} sub={sub} openDialog />;
      })
    );

    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {subsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserData }
)(user);
