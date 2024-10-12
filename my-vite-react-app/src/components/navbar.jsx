import React, { useState } from "react"; 
import FilterDramaIcon from "@mui/icons-material/FilterDrama"; 
import GpsFixedIcon from "@mui/icons-material/GpsFixed"; 
import SearchIcon from "@mui/icons-material/Search"; 
import { TextField, Button, InputAdornment } from "@mui/material/";

const Navbar = ({ onSearch }) => { // Accept onSearch as a prop
  const [searchCity, setSearchCity] = useState("");

  const handleSearchClick = () => {
    onSearch(searchCity); // Call the passed function
    setSearchCity(""); // Clear the input after search
  };

  return (
    <nav
      style={{
        justifyContent: "space-between",
        display: "flex",
        alignItems: "center",
        marginTop: "10px",
        padding: "10px 30px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
        <FilterDramaIcon />
        <p style={{ fontWeight: "bold", fontSize: "20px" }}>Weather</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <TextField
          variant="outlined"
          placeholder="Search the city "
          size="small"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          style={{
            backgroundColor: "white",
            borderRadius: "2rem",
            width: "22rem",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearchClick}
          style={{ borderRadius: "6px", backgroundColor: "#4B5550" }}
        >
          Search
        </Button>
      </div>
      <div
        style={{
          marginTop: "1rem",
          fontSize: "16px",
          fontWeight: "700",
          backgroundColor: "#4B5550",
          height: "35px",
          width: "150px",
          color: "white",
          gap: "2px",
          borderRadius: "6px",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <GpsFixedIcon />
        <p style={{ fontSize: "14px" }}>Current Location</p>
      </div>
    </nav>
  );
};

export default Navbar;
