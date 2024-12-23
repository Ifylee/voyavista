import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Grid2 as Grid, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";
import { FullScreenDialog } from "../Cart/cart";

export const Nav = () => {
  // This state will indicate which tab is selected
  const [value, setValue] = useState(() => {
    // This gets the state value saved from local storage so that
    // page refreshes it will still be on the tab that corresponds to the
    // correct page
    return sessionStorage.getItem("selectedTab") || "one";
  });
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  // This variable will help redirect the page to the corresponding component
  const navigate = useNavigate();
  // Objects hold the different endpoints for the pages
  const routes = {
    one: "/",
    two: "/my/trips",
    three: "/login",
    logout: "/",
  };

  const handleChange = (event, newValue) => {
    // This will trigger a state change and change it to the value of that tab that was selected
    setValue(newValue);
    // Saves the value from the tab in local storage so that if the page refreshes
    // it will still indicate the correct tab that is selected for that page
    sessionStorage.setItem("selectedTab", newValue);
    // Navigate will redirect user to the correct endpoint and page
    navigate(routes[newValue]);
  };

  return (
    // This will displayed at the top of the page
    <Grid
      className="nav"
      container
      style={{
        width: "100%",
        padding: "20px",
        background: "linear-gradient(90deg, #f5f7fa, #c3cfe2)",
        color: "#333",
      }}
    >
      <Grid
        container
        size={12}
        alignItems={"center"}
        justifyContent={"space-between"}
        marginRight={"15px"}
      >
        <Grid size={{ xs: 4, md: 2, sm: 4 }}>
          {/* This will hold the name in the navbar at the far left */}
          <h2
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontWeight: 2000,
            }}
            onClick={() => navigate("/")}
          >
            Dream Voyage
          </h2>
        </Grid>
        <Grid size={{ md: 3, xs: 4, sm: 4 }}>
          {/* Tabs is a Material UI component that will help with the 
          routing of the different endpoints */}
          <Tabs
            // The value will indicate which tab was selected
            value={value}
            // This will hanlde the change of pages when a tab is selected
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            TabIndicatorProps={{ style: { display: "none" } }} // Remove underline indicator
          >
            {/* About Me will be the home page */}
            <Tab
              // When the user selects this value this is what will save to the state
              // and indicate which route to send to use
              value="one"
              label="Home"
              sx={{
                minWidth: 80,
                padding: "6px 12px",
                fontSize: ".850rem",
                "&.Mui-selected": { color: "#333" },
              }} // Adjust the size
            />
            <Tab
              // When the user selects this value this is what will save to the state
              // and indicate which route to send to use
              value="two"
              label="My Trips"
              sx={{
                minWidth: 80,
                padding: "6px 12px",
                fontSize: ".850rem",
                "&.Mui-selected": { color: "#333" },
              }} // Adjust the size
            />
            {Auth.loggedIn() ? (
              <Tab
                value="logout"
                label="Logout"
                onClick={() => {
                  setIsSnackbarOpen(true);
                  // Sets the message on the snackbar
                  setSnackbarMessage("Logged Out");
                  Auth.logout();
                  navigate("/");
                }}
              />
            ) : (
              <Tab label="Login" value="three" />
            )}
          </Tabs>
        </Grid>
        <Grid container justifyContent={"end"} sx={{ paddingRight: "20px" }}>
          <Grid size={{ md: 6, xs: 4, sm: 4 }}>
            <FullScreenDialog />
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open={isSnackbarOpen}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={3000}
        onClose={() => setIsSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Grid>
  );
};

export default Nav;
