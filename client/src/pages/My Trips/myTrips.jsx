import React, { useEffect } from "react";
import { Tabs, Tab, Snackbar, Alert, Grid2 } from "@mui/material";
import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "../../utils/query";
import { MyTripsCard } from "../../components/MyTripsCard/myTripsCard";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Auth from "../../utils/auth";

export const MyTrips = () => {
  const [value, setValue] = React.useState(1);
  // Fetches the data for the current user that is logged in
  const { data} = useQuery(CURRENT_USER);
  const [open, setOpen] = React.useState(false);
// This will redirect users to certain page using the useNaviaget hook
  const navigate = useNavigate();

  // This will check to see if the user is logged in
  // if they are not logged in they will be redirected to login
  useEffect(() => {
    if (!Auth.loggedIn()) {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [data]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
// This will verify that the data exist for the current user
  if (!data || data.oneTrip) {
    return <p>No trip data found</p>;
  }
// Destructure the data needed to display for the logged in user
  const { wishList, purchased } = data.currentUser;
  return (
    <div>
      {/* These options will display the users information  */}
      <Tabs value={value} onChange={handleChange}>
        <Tab value={1} label="Wishlist" />
        <Tab value={2} label="Purchased" />
        <Tab value={3} label="Coming Up" />
      </Tabs>
      {value === 1 && (
        // <TripList />
        <Grid2
          container
          spacing={4}
          justifyContent="center"
          sx={{ paddingTop: "40px" }}
        >
          {/* If the user selects Wishlist then it will display all the wishlist
          trips for that users account */}
          {wishList.map((trip) => (
            <Grid2 xs={12} sm={6} md={4} key={trip._id}>
              <MyTripsCard id={trip.id} title={trip.title} img={trip.img} remove={true} />
            </Grid2>
          ))}
        </Grid2>
      )}
      {value === 2 && (
        <Grid2
          container
          spacing={4}
          justifyContent="center"
          sx={{ paddingTop: "40px" }}
        >
         
            {/* If the user selects Purchased then it will display all the bought
          trips for that users account */}
          {purchased.map((trip) => (
            <Grid2 xs={12} sm={6} md={4} key={trip._id}>
              <MyTripsCard id={trip.id} title={trip.title} img={trip.img} remove={false} />
            </Grid2>
          ))}
        </Grid2>
      )}
    </div>
  );
};
