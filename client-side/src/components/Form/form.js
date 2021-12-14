import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import FileBase from "react-file-base64";
import { ArrowDropDown, Close } from '@material-ui/icons'
import { createPostToServer } from "../../action/crudAction";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  TextField,
  Button,
  Paper,
  TextareaAutosize,
} from "@material-ui/core";
import { updatedPost } from "../../action/crudAction";
function Form({ currentid, setcurrentid, openinput, setopeninput }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.User.authData);
  const location = useLocation();

  const initialState = JSON.parse(localStorage.getItem("profile"));
  const [user, setuser] = useState(initialState);
  const updatePost = useSelector((state) =>
    currentid ? state.post.find((p) => p._id === currentid) : null
  );
  const [post, setPostInfo] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentid) {
      dispatch(updatedPost(currentid, { ...post, name: user?.result?.name }));
    } else {
      dispatch(createPostToServer({ ...post, name: user?.result?.name }));
    }
    clear();
  };
  const clear = () => {
    setPostInfo({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
    setcurrentid(null);
  };

  const handleOpenInput = () => setopeninput(prv => !prv)
  useEffect(() => {
    if (updatePost) setPostInfo(updatePost);
    setuser(initialState);
  }, [currentid, updatePost, data]);

  if (!user?.result?.firstName) {
    return (
      <div className="form_input">
        <Typography>
          Please log in to create,update, like and delete memories
        </Typography>
      </div>
    );
  }
  return (
    <div style={{ transform: `translateY(${openinput ? '0vh' : '49vh'})` }} className="form_input">
      <div onClick={handleOpenInput} className="open">
        <div className="form_head">
          click to create a memory
        </div>
        <div className="icon">{openinput ? <Close /> : <ArrowDropDown />}</div>
      </div>
      <form style={{ opacity: openinput ? '1' : '0' }} autoComplete="off" noValidate onSubmit={handleSubmit}>
        <TextField
          name="title"
          variant="standard"
          label="Title"
          fullWidth
          value={post.title}
          onChange={(e) => setPostInfo({ ...post, title: e.target.value })}
        />
        <TextareaAutosize
          name="message"
          variant="contained"
          label="Message"
          fullWidth
          style={{
            height: "30vh",
            width: "100%",
            border: "none",
            outline: "none",
          }}
          value={post.message}
          onChange={(e) => setPostInfo({ ...post, message: e.target.value })}
        />
        <TextField
          name="tags"
          variant="standard"
          label="Tags"
          fullWidth
          value={post.tags}
          onChange={(e) => setPostInfo({ ...post, tags: e.target.value })}
        />
        <div>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostInfo({ ...post, selectedFile: base64 })
            }
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="submit_btns">

          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"

          >
            Submit
          </Button>
          <Button onClick={clear} variant="contained" size="large" >
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Form;
