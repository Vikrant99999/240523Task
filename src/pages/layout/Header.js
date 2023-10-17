import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Popover,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { ListItemButton } from "@mui/material";
import { resetState } from "../../redux/commonSlice";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import MenuIcon from "@mui/icons-material/Menu";
import CachedIcon from "@mui/icons-material/Cached";
import { RefreshButton } from "../../components/RefreshButton";

export const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const commonReducer = useSelector((state) => state.commonReducer);

  const [anchorEl, setAnchorEl] = React.useState(null);
  //   const [openMenu, setOpenMenu] = useState(true);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //   const openMenuClickHandler = () => {
  //     setOpenMenu(!openMenu);
  //   };

  const [anchorE2, setAnchorE2] = React.useState(null);
  const [openMenuDrawer, setOpenMenuDrawer] = useState(true);

  const open1 = Boolean(anchorE2);
  const id1 = open1 ? "simple-popover" : undefined;

  const handleClickMenu = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorE2(null);
  };

  //   const openMenuDrawerHandleClick = () => {
  //     setOpenMenuDrawer(!openMenu);
  //   };

  return (
    <Box>
      <Grid
        container
        style={{
          disply: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid item className={classes.menugrid}>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MenuIcon
              fontSize="large"
              onClick={handleClickMenu}
              className={classes.grid4}
            />
            <Box style={{ display: "flex" }}>
              <img
                style={{ height: "48px" }}
                src="/ews/assets/images/evosys-logo.png"
              />
              <img
                style={{ height: "48px" }}
                src="/ews/assets/images/wf-logo.png"
              />
            </Box>
          </Box>
        </Grid>
        <Grid item className={classes.grid3}>
          <Box
            textAlign="right"
            style={{ display: "flex", alignItems: "center" }}
          >
            <AccountBoxIcon
              fontSize="large"
              onClick={handleClick}
              className={classes.grid4}
            />
            <Typography variant="span" className={classes.grid5}>
              {commonReducer.userName}
            </Typography>
             
            <RefreshButton /> 
          </Box>
        </Grid>
      </Grid>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <List component="nav" aria-label="main mailbox folders">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Messages" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                primary="Logout"
                onClick={() => {
                  dispatch(resetState());
                  navigate("/", { replace: true });
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
      {
        <Menu
          id={id1}
          open={open1}
          anchorEl={anchorE2}
          handleCloseMenu={handleCloseMenu}
        />
      }
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  maincontainer: {
    backgroundColor: "#DBDBDB",
  },
  grid1: {
    height: "100vh",
  },
  grid2: {
    backgroundColor: "#F9F9F9",
  },
  grid3: {
    padding: "10px",
    backgroundColor: "#FFF",
  },
  grid4: {
    cursor: "pointer",
    verticalAlign: "middle",
  },
  grid5: {
    color: "#124590",
    verticalAlign: "middle",
  },
  menugrid: {
    display: "flex",
    justifyContent: "flex-start !important",
    backgroundColor: "#FFF",
    alignItems: "center",
    padding: "10px",
  },
}));
