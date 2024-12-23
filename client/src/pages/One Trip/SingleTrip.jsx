import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { ONE_TRIP } from "../../utils/query";
import {
  Container,
  Grid2 as Grid,
  Typography,
  Box,
  IconButton,
  Snackbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useGlobalState } from "../../utils/GlobalState";
import { ADD_WISH_LIST } from "../../utils/mutation";
import { ADD_TRIP_TO_CART } from "../../utils/actions";
import Auth from "../../utils/auth";

export const SingleTrip = () => {
  const [state, dispatch] = useGlobalState();
  // This mutation will add the trip to the users wishlist
  const [addList] = useMutation(ADD_WISH_LIST);
  // This will pull the wild card from the link to be used to find the specific trip
  const { id } = useParams();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // This query will find a specific trip using the wildcard
  const { data, error, loading } = useQuery(ONE_TRIP, {
    variables: { id }, // Pass the variable here
  });


  if (loading) return <p>Loading...</p>;

  // Handle the error state
  if (error) return <p>Error: {error.message}</p>;

  // Check if `data` exists before trying to access `oneTrip`
  if (!data || !data.oneTrip) {
    return <p>No trip data found</p>;
  }

  // Destructure the data that will be needed for the Trip card
  const { title, img, price, additionalImages, groupSize, description } =
    data.oneTrip;
// This will use a reducer to add the trip to the cart
  const addToCart = async () => {
    dispatch({
      type: ADD_TRIP_TO_CART,
      payload: { title, img, price, id },
    });
    setIsSnackbarOpen(true);
    // Sets the message on the snackbar
    setSnackbarMessage("Trip added to cart!");
  };

  // This will add the trip to the users wishlist using the mutation function
  const addWishTrip = async () => {
    try {
      const { data } = await addList({ variables: { id } });
      if (Auth.loggedIn()) {
        setIsSnackbarOpen(true);
        // Sets the message on the snackbar
        setSnackbarMessage("Added to wishlist!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Grid container spacing={4}>
        <Grid xs={12}>
          <Carousel showThumbs={false} autoPlay infiniteLoop>
            <div>
              <img
                src={`/images/${img}`}
                alt={title}
                style={{ height: "400px", objectFit: "cover" }}
              />
            </div>
            {/* The images will be added to the carousel */}
            {additionalImages &&
              additionalImages.map((img, index) => (
                <div key={index}>
                  <img
                    src={`/images/${img}`}
                    alt={`${title} ${index + 1}`}
                    style={{ height: "400px", objectFit: "cover" }}
                  />
                </div>
              ))}
          </Carousel>
        </Grid>
        {/* THis card will display all the information about the trip */}
        <Grid item xs={12}>
          <Box sx={{ textAlign: "center", padding: 2 }}>
            <Typography variant="h2" component="h1" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom>
              Group Size: {groupSize}
            </Typography>
            <Typography variant="body1" paragraph>
              {description}
            </Typography>
            <Typography variant="h4" component="h3">
              Price: ${price ? price.toFixed(2) : "N/A"}
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
            >
              {/* This button will add trip to the users wishlist */}
              <IconButton aria-label="add to favorites" onClick={addWishTrip}>
                <FavoriteIcon />
              </IconButton>
              {/* This button will add a trip to the cart */}
              <IconButton aria-label="add to cart" onClick={addToCart}>
                <ShoppingCartIcon />
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* Display a message when the user adds to cart or wishlist */}
      <Snackbar
        open={isSnackbarOpen}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={3000}
        onClose={() => setIsSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};
