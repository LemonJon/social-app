import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import MyButton from "../../utility/MyButton";

//icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

//redux
import { connect } from "react-redux";
import { likeSub, unlikeSub } from "../../redux/actions/dataActions";

export class LikeButton extends Component {
  likedSub = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.subId === this.props.subId)
    )
      return true;
    else return false;
  };
  likeSub = () => {
    this.props.likeSub(this.props.subId);
  };
  unlikeSub = () => {
    this.props.unlikeSub(this.props.subId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedSub() ? (
      <MyButton tip="Undo like" onClick={this.unlikeSub}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeSub}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  subId: PropTypes.string.isRequired,
  likeSub: PropTypes.func.isRequired,
  unlikeSub: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeSub,
  unlikeSub
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton);
