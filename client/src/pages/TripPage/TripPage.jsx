import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const TripPage = () => {
  const { id } = useParams();  
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await axios.get(`/api/trips/${id}`);
        setTrip(response.data); 
      } catch (err) {
        console.error("Failed to fetch trip", err);
      }
    };

    fetchTrip();
  }, [id]);

  if (!trip) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <h1>Title:{trip.title}</h1>
    <img src={`/images/${trip.img}`} alt={trip.title} style={{ width: '100%', height: 'auto' }} />
    <p>{trip.description}</p>
    <h3>Price: ${trip.price ? trip.price.toFixed(2) : 'N/A'}</h3>
  </div>
  );
};
