import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useGlobalState } from "../../utils/GlobalState";
import { SET_CATEGORIES, UPDATE_CURRENT_CATEGORY } from "../../utils/actions";
import { QUERY_CATEGORY } from "../../utils/query";
import Container from "@mui/material/Container"; // Import Container
import Button from "@mui/material/Button"; // Import Button for consistent styling

export const Categories = () => {
  const [state, dispatch] = useGlobalState();
  // Destructures categories from state to be used to make buttons
  const { categories } = state;
  // Fetches all the categories from the db
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORY);
  // This will save all the categories to global state and if the query changes then it will
  // update the state
  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: SET_CATEGORIES,
        payload: categoryData.categories,
      });
    }
  }, [categoryData, loading, dispatch]);
  // When the button is clicked then it will update the current category in the global state
  // so that the trips can be filtered 
  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      payload: id,
    });
  };
  return (
    // This will display all the buttons of the categories to be selected
    <Container
      maxWidth="lg"
      sx={{ display: "flex", justifyContent: "center", marginBottom: 2, marginTop: 2 }}
    >
      <div>
        {/* This will reset the categories to display all trips */}
        <Button
          variant="contained"
          onClick={() => {
            handleClick("");
          }}
          sx={{
            margin: 1,
            backgroundColor: "#007BFF",
            color: "#FFFFFF",
            '&:hover': { backgroundColor: '#0056B3' }
          }}
        >
          All Trips
        </Button>
        {/* This will display all the categories from state as buttons */}
        {categories.map((item) => (
          <Button
            key={item._id}
            variant="contained"
            onClick={() => {
              handleClick(item.id);
            }}
            sx={{
              margin: 1,
              backgroundColor: "#28A745",
              color: "#FFFFFF",
              '&:hover': { backgroundColor: '#218838' }
            }}
          >
            {item.name}
          </Button>
        ))}
      </div>
    </Container>
  );
};