import React, { useRef, useState } from "react";
import "../App.css";
import axios from "axios";
import { Comments } from "./Comments";

import { LoadingSpinner } from "./LodingSpinner";
import "./Searchbar.css";

// className="search_bar d-flex justify-content-center"
export const Searchbar = () => {
  const [fucUrl, setUrl] = useState("");
  const [fetching, setFetching] = useState(false);
  const [Comment, setComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [selectedOption, setSelectedOption] = useState("all");
  const [option, setOption] = useState("All");

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setOption(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let url = fucUrl;
    setUrl("");
    setFetching(true);
    let p = url.split("=");
    let final = p[1].split("&");
    console.log(final[0]);
    const Url = {
      videoId: final[0],
    };

    try {
      const response = await fetch(
        "http://localhost:3001/comments/addcomments",
        {
          method: "POST",
          body: JSON.stringify(Url),
          headers: {
            "Content-Type": "application/json",
            authtoken: localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = Array.from(await response.json());
      setComments(responseData);
      setComment(true);
      setFetching(false);
    } catch (error) {
      setFetching(false);
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  return (
    <>
      <div className="Searchbar" style={{ width: "100%" }}>
        <input
          type="url"
          name="URL"
          id="URL"
          value={fucUrl}
          placeholder="Enter Url"
          style={{
            width: "40%",
            height: "38px",
            paddingLeft: "15px",
            paddingRight: "10px",
          }}
          className="rounded-start-4 hover-effect text_input"
          onChange={handleUrlChange}
          required
        />
        <input
          type="button"
          value="Submit"
          className="rounded-end-4 border border-dark hover-button button-response"
          onClick={handleSubmit}
        />
        <select
          id="options"
          value={selectedOption}
          onChange={handleOptionChange}
          className="select"
        >
          <option value="All" className="option">All</option>
          <option value="Positive" className="option">Positive</option>
          <option value="Negative" className="option">Negative</option>
          <option value="Nutural" className="option">Neutral</option>
        </select>
      </div>
      {!fetching && !Comment ? (
        ""
      ) : fetching ? (
        // Condition 2: Display loading spinner if fetching is true
        <LoadingSpinner></LoadingSpinner>
      ) : Comment ? (
        // Condition 3: Display "No comments to display" if fetching is false and Comments is present
        <div className="comments">
          <div
            style={{
              width: "87%",
              height:"20rem",
              overflow: "auto",
              marginLeft:"10px"
            }}
          >
            <Comments data={comments} options = {option}></Comments>
          </div>
        </div>
      ) : (
        // Default condition: Display "Loading comments..." if none of the above conditions are met
        <h1>Loading comments...</h1>
      )}
    </>
  );
};
