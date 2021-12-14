import React, { useState, useEffect } from "react";
import { AppBar, Avatar, Typography, Button, Toolbar } from "@material-ui/core";
import "./styles.css";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import memories from "../../images/memories.png";
import { logout } from "../../action/auth";
function Nav() {
  const dispatch = useDispatch();
  const [user, setuser] = useState(JSON.parse(localStorage.getItem("profile")));
  const history = useHistory();
  const location = useLocation();
  const handlelogout = () => {
    setuser(null);
    dispatch(logout());
  };
  useEffect(() => {
    // const token = user?.token

    setuser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <div className="nav" color="inherit">
      <Link to="/">
        <div className="classes brandcontainer">
          <svg className="nav_link" width="100%" height="100%">
            <text
              className="svg_text"
              stroke="tomato"
              x="50%"
              y="60%"
              textAnchor="middle"
            >
              Memories
            </text>
          </svg>
        </div>
      </Link>
      <div className="userauth">
        {user ? (
          <div className="auth_section">
            <Avatar
              alt={user.result.firstName}
              src={user.result.ImageUR}
            ></Avatar>
            <Typography
              style={{ color: "white" }}
            >{`${user?.result?.firstName} ${user?.result?.secondName}`}</Typography>
            <Button
              style={{ marginLeft: "auto" }}
              variant="contained"
              color="secondary"
              onClick={handlelogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="secondary"
          >
            Sign in
          </Button>
        )}
      </div>
    </div>
  );
}

export default Nav;
