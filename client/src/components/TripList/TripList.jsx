import React, { useEffect } from "react";
import Grid2 from "@mui/material/Grid2";
import { TripCard } from "../TripCard/TripCard";
import { QUERY_ALL_TRIPS } from "../../utils/query";
import { useQuery } from "@apollo/client";
import { SET_TRIPS } from "../../utils/actions";
import { useGlobalState } from "../../utils/GlobalState";

export const TripList = () => {
  const [state, dispatch] = useGlobalState();

  // Destructures the trips and currentCategory to set the buttons for
  // trips categories
  const { trips, currentCategory } = state;
  // This query will fetch all trips that is saved to the db
  const { data, loading } = useQuery(QUERY_ALL_TRIPS);

  // This hook will set the state for the categories and trips to be displayed to
  // the page.  It will update if data from the useQuery changes
  useEffect(() => {
    if (data) {
      dispatch({
        type: SET_TRIPS,
        payload: data.allTrips,
      });
    }
  }, [data, loading, dispatch]);

  // This will filter the trips depending on which category is selected
  function filterProducts() {
    if (!currentCategory) {
      return trips;
    }

    return trips.filter((product) => product.category.id === currentCategory);
  }

  return (
    <Grid2
      container
      spacing={4}
      justifyContent="center"
      sx={{ paddingTop: "20px" }}
    >
      {/* This will display the trips that are selected from the current category */}
      {filterProducts().map((trip) => (
        <Grid2 xs={12} sm={6} md={4} key={trip._id}>
          <TripCard
            id={trip.id}
            title={trip.title}
            summary={trip.summary}
            description={trip.description}
            img={trip.img}
            price={trip.price}
          />
        </Grid2>
      ))}
    </Grid2>
  );
};