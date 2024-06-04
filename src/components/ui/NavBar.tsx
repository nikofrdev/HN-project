import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";
import { autoUpdateStoriesThunk } from "../../redux/thunkActions/storyThunkAction";
import { styled } from "@mui/material";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: theme.zIndex.drawer + 1,
}));

export default function NavBar() {
  const dispatch = useDispatch();

  const handleUpdateClick = () => {
    void dispatch(autoUpdateStoriesThunk());
  };

  return (
    <Box sx={{ flexGrow: 1}}>
      <StyledAppBar position="static" sx={{ backgroundColor: 'orange' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hacker News
          </Typography>
          <Button variant="contained" color='secondary' onClick={handleUpdateClick}>
            Update
          </Button>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
}
