import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../hooks/useReduxHooks";
import { useDispatch } from "react-redux";
import {
  fetchStoriesThunk,
  autoUpdateStoriesThunk,
} from "../../redux/thunkActions/storyThunkAction";
import { Box } from "@mui/system";
import { Card, CircularProgress, Grid, Pagination } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import OneNewForm from "../ui/OneNewForm";

export default function NewsPage(): JSX.Element {
  const { data, status } = useAppSelector((state) => state.stories);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [storiesPerPage] = useState(12);
  const navigate = useNavigate();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    void dispatch(fetchStoriesThunk());

    intervalRef.current = setInterval(() => {
      void dispatch(autoUpdateStoriesThunk());
    }, 60000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [dispatch]);

  if (status === "fetching") {
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

  const indexOfLastStory = page * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = data.slice(indexOfFirstStory, indexOfLastStory);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  

  return (
    <Box sx={{ backgroundColor: "bisque" }}>
      <Grid container spacing={3}>
        {currentStories.map((story) => (
          <Grid item xs={12} sm={5} md={4} key={story.id}>
            <Card sx={{margin: '20px'}}>
              <Link to={`/news/${story.id}`} style={{ textDecoration: "none" }} >
              <OneNewForm story={story} />
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={Math.ceil(data.length / storiesPerPage)}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
