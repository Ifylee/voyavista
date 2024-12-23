import { TripList } from "../../components/TripList/TripList";
import { Categories } from "../../components/Categories/Categories";
export const Home = () => {
  return (
    <div className="container">
      <Categories />
      <TripList />
    </div>
  );
};

