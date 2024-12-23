import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid2 as Grid, Snackbar } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import InfoIcon from "@mui/icons-material/Info";
import { useGlobalState } from "../../utils/GlobalState";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_FROM_LIST } from "../../utils/mutation";
// eslint-disable-next-line react/prop-types
export const MyTripsCard = ({ id, title, img, remove }) => {
  const [expanded] = React.useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  // Removes wishlist from the users account
  const [removeFromList] = useMutation(DELETE_FROM_LIST);

  // Function will delete the trip that was clicked on from the users wishlist account
  const deleteWishList = async () => {
    try {
      const { data } = await removeFromList({ variables: { id } });
      if (data.deleteFromList.wishList) {
        setIsSnackbarOpen(true);
        // Sets the message on the snackbar
        setSnackbarMessage("Deleted from List");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const navigate = useNavigate();
// Redirects to a single trip page for more information about that page
  const handleImageClick = () => {
    navigate(`/trip/${id}`);
  };
  return (
    // Cards that will show the users wishlist and purchased trips in their account
    <Grid>
      <Snackbar
        open={isSnackbarOpen}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={2000}
        onClose={() => setIsSnackbarOpen(false)}
        message={snackbarMessage}
      />
      <Card key={id} sx={{ width: 345, height: 325 }}>
        <CardHeader
          title={
            <Typography variant="h6" sx={{ fontSize: "1.3rem" }}>
              {title}
            </Typography>
          }
        />
        <CardMedia
          component="img"
          height="194"
          src={`/images/${img}`}
          alt={title}
          onClick={handleImageClick}
          style={{ cursor: "pointer" }}
        />

        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Grouping first two buttons */}
          {remove && (
            <Box>
              <IconButton
                aria-label="add to favorites"
                onClick={deleteWishList}
              >
                <DeleteForeverIcon />
              </IconButton>
            </Box>
          )}

          {/* Spacer to push the button to the end */}
          <Box sx={{ flexGrow: 1 }} />

          {/* New button at the end */}
          <IconButton aria-label="settings" onClick={handleImageClick}>
            <InfoIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};
