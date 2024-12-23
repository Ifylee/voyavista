
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { BOUGHT_TRIP } from "../../utils/mutation";
// import { CREATE_CHECKOUT_SESSION } from "../../utils/mutation";
import { loadStripe } from "@stripe/stripe-js";
import { useGlobalState } from "../../utils/GlobalState";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Divider,
  Paper,
  Badge,
  TextField,
  Snackbar,
  Grid2 as Grid,
} from "@mui/material";
import { REMOVE_TRIP_FROM_CART, CLEAR_CART } from "../../utils/actions";
import LinearProgress from "@mui/material/LinearProgress";
import Auth from "../../utils/auth";
const stripePromise = loadStripe("your_stripe_publishable_key");


export const FullScreenDialog = ({ icon }) => {
  const [loading, setLoading] = useState(false); // state for tracking loader
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useGlobalState();

  // This mutation will add a trip to their account as a purchased one
  const [checkoutTrips] = useMutation(BOUGHT_TRIP);
  // These two states will open the snackabar and set the message for it
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  // const [createCheckoutSession] = useMutation(CREATE_CHECKOUT_SESSION);
  const [couponCode, setCouponCode] = React.useState("");
  // Handles the opening of the cart
  const handleClickOpen = () => {
    setOpen(true);
  };
  // Handles the closing of the cart
  const handleClose = () => {
    setOpen(false);
  };
  // This will remove the item from the cart using the id
  const handleRemoveFromCart = (id) => {
    dispatch({
      type: "REMOVE_TRIP_FROM_CART",
      payload: id,
    });
  };

  const handleUpdateQuantity = (id, change) => {
    dispatch({
      type: "UPDATE_CART_QUANTITY",
      payload: { id, change },
    });
  };

  const handleCheckout = async () => {
    try {

      const { data } = await createCheckoutSession({
        variables: { items: state.cart.map((item) => item.id) },
      });
      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({
        sessionId: data.createCheckoutSession.sessionId,
      });
  
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  // This reducer will clear the cart when the button is clicked

  const handleClearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  // This will perform the mock transaction
  const checkout = async () => {
    try {
      // If cart is not empty from state and the user is logged in then
      // user can purchase a trip
      if (state.cart && Auth.loggedIn()) {
        // This state will engage the loader
        setLoading(true);
        setTimeout(() => {
          // Performs the mutation to add all the trips that are in the cart
          // to be added to the users account
          setLoading(false); // Stop loading after 3 seconds
          state.cart.forEach(async (trip) => {
            const { data } = await checkoutTrips({
              variables: { id: trip.id },
            });
          });
          handleClearCart();
          handleClose();
          setIsSnackbarOpen(true);
          // Sets the message on the snackbar
          setSnackbarMessage("Get ready for your next adventure 🌎");
        }, 3000);
      } else {
        handleClose();
        setIsSnackbarOpen(true);
        // Sets the message on the snackbar if the user is not logged in
        setSnackbarMessage("Must be logged in to purchase a trip");
      }
    } catch (error) {
      console.log(error);
    }
  };


  // Calculates the total for the items in cart
  const subtotal = state.cart.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + tax;

  return (
    <React.Fragment>
      <IconButton color="inherit" onClick={handleClickOpen}>
        <Badge badgeContent={state.cart.length} color="secondary">
          {icon || <AirplanemodeActiveIcon />}
        </Badge>
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        PaperProps={{

          sx: { width: { xs: "100%", sm: 400 }, backgroundColor: "#F5F5F5" },
        }}
      >
        <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Your Travel Cart
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            padding: 3,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Paper
            elevation={3}
            sx={{ padding: 2, flexGrow: 1, overflow: "auto" }}
          >
            <List>
              {/* This will take all things from the cart in state
              and place them inside  the cart so that the 
              user can see what they are about to purchase */}
              {state.cart.map((item, index) => (
                <React.Fragment key={item.id}>
                  <ListItem
                    secondaryAction={

                      <IconButton
                        edge="end"
                        aria-label="delete"
                        // Removes the item from the cart
                        onClick={() => handleRemoveFromCart(item.id)}
                      >

                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar alt={item.title} src={`/images/${item.img}`} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.title}
                      secondary={`$${item.price.toFixed(2)}`}
                    />
                    <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                      <IconButton
                        onClick={() => handleUpdateQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton
                        onClick={() => handleUpdateQuantity(item.id, 1)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </ListItem>
                  {index < state.cart.length - 1 && (
                    <Divider variant="inset" component="li" />
                  )}
                </React.Fragment>
              ))}
            </List>
            {/* If the cart is empty then a message will be displayed saying it's empty */}
            {state.cart.length === 0 && (
              <Typography
                variant="subtitle1"
                align="center"
                sx={{ marginTop: 2 }}
              >
                Your cart is empty. Start adding some amazing trips!
              </Typography>
            )}
          </Paper>

          <Paper
            elevation={3}
            sx={{ marginTop: 2, padding: 2, backgroundColor: "#E3F2FD" }}
          >
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 1,
              }}
            >
              <Typography>Subtotal:</Typography>
              <Typography>${subtotal.toFixed(2)}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 1,
              }}
            >
              <Typography>Tax:</Typography>
              <Typography>${tax.toFixed(2)}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 2,
              }}
            >
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">${total.toFixed(2)}</Typography>
            </Box>
            <TextField
              fullWidth
              label="Coupon Code"
              variant="outlined"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              sx={{ marginBottom: 2 }}
            />

            {/* Checkout button will call the checkout function to add trips to users account */}
            <Button
              variant="contained"
              fullWidth
              onClick={checkout}
              startIcon={<AirplanemodeActiveIcon />}
              sx={{
                backgroundColor: "#4CAF50",
                "&:hover": {
                  backgroundColor: "#45A049",
                },
                marginBottom: 1,
              }}
            >
              Proceed to Checkout
            </Button>
            {/* If loading is true during the buying process then the loader will appear */}
            {loading && <LinearProgress color="success" />}

            <Button
              variant="outlined"
              fullWidth
              onClick={handleClearCart}
              sx={{ marginBottom: 1 }}
            >
              Clear Cart
            </Button>
            <Button variant="text" fullWidth onClick={handleClose}>
              Continue Shopping
            </Button>
          </Paper>
        </Box>
      </Drawer>
      {/* Snackbar will pop up for the user to display the certain message */}
      <Snackbar
        open={isSnackbarOpen}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={3000}
        onClose={() => setIsSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </React.Fragment>
  );
};