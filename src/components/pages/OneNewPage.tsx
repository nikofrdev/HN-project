import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useReduxHooks";
import {
  getComments,
  updateComments,
} from "../../redux/thunkActions/commentThunkActions";
import { fetchStoriesThunk } from "../../redux/thunkActions/storyThunkAction";

import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import Comment from "../ui/Comment";

export default function OneNewPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentStory, status } = useAppSelector((state) => state.stories);
  const { comments, status: commentsStatus } = useAppSelector(
    (state) => state.comments
  );

  useEffect(() => {
    if (id) {
      void dispatch(fetchStoriesThunk(parseInt(id)));
      void dispatch(getComments(parseInt(id)));
    }
  }, [dispatch, id]);

  const handleRefreshComments = () => {
    if (id) {
      void dispatch(updateComments(parseInt(id)));
    }
  };

  if (status === "fetching" || commentsStatus === "fetching") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!currentStory) {
    return null;
  }

  return (
    <Box marginTop={5}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="success">
          Back to News
        </Button>
      </Link>

      {currentStory && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginTop="100px"
        >
          <Typography variant="h4">{currentStory.title}</Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body2">by {currentStory.by}</Typography>
            <Typography variant="body2">
              {new Date(currentStory.time * 1000).toLocaleString()}
            </Typography>
            <Typography variant="body2">
              {currentStory.descendants} comments
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1">{currentStory.text}</Typography>
          <Divider sx={{ my: 2 }} />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleRefreshComments}
          >
            Refresh Comments
          </Button>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} level={0} />
          ))}
        </Box>
      )}
    </Box>
  );
}
