import React, { useState, useEffect } from "react";
import { Box, Divider, Typography, Button } from "@mui/material";
import { CommentType } from "../../types/commentTypes";
import { useAppDispatch } from "../../hooks/useReduxHooks";
import { updateComments } from "../../redux/thunkActions/commentThunkActions";

interface CommentProps {
  comment: CommentType;
  level: number;
}

export default function Comment({ comment, level }: CommentProps): JSX.Element {
  const [showReplies, setShowReplies] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (comment.kids?.length) {
      setShowReplies(true);
    }
  }, [comment.kids]);

  const handleRefreshReplies = () => {
    if (comment.id) {
      void dispatch(updateComments(comment.id));
    }
  };

  return (
    <Box
      marginTop={2}
      marginLeft={level * 4}
      padding={2}
      border={1}
      borderColor="grey.300"
      borderRadius={2}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Typography variant="body2">by {comment.by}</Typography>
        <Typography variant="body2">
          {new Date(comment.time * 1000).toLocaleString()}
        </Typography>
      </Box>
      <Typography variant="body1">{comment.text}</Typography>
      <Box display="flex" justifyContent="end" marginTop={2}>
        {showReplies && (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={handleRefreshReplies}
          >
            Refresh Replies
          </Button>
        )}
      </Box>
      <Divider sx={{ my: 2 }} />
      {showReplies &&
        comment.kids?.map((childId) => (
          <Comment key={childId} comment={childId} level={level + 1} />
        ))}
    </Box>
  );
}
