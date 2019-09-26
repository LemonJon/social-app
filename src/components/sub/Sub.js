import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import MyButton from "../../utility/MyButton";
import DeleteSub from "./DeleteSub";
import SubDialog from "./SubDialog";
import LikeButton from "./LikeButton";

// MUI imports
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

//DayJS imports
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

//icons
import ChatIcon from "@material-ui/icons/Chat";
//redux
import { connect } from "react-redux";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: "cover"
  }
};

class Sub extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      sub: { body, date, userImage, userName, likeCount, commentCount, subId },
      user: {
        authenticated,
        credentials: { name }
      }
    } = this.props; // const classes = this.props.classes;

    const deleteButton =
      authenticated && userName === name ? <DeleteSub subId={subId} /> : null;

    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          tite="profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userName}`}
            color="primary"
          >
            {userName}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(date).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <LikeButton subId={subId} />
          <span>{likeCount} likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
          <SubDialog
            subId={subId}
            userName={userName}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

Sub.propTypes = {
  user: PropTypes.object.isRequired,
  sub: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Sub));
