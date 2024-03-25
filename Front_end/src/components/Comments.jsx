import React from "react";
import "./Comment.css";
import "../vars.css";
export const Comments = ({ data, options }) => {
  return data.map((comment, index) => {
    return (
      <>
        {options === "All" ? (
          <div className="comm">
            <span key={index} className="commentdata" style={comment.sentiment === 1 ? {color:"green"}: comment.sentiment === -1 ? {color:"red"}:{color:"var(--color-text)"}}>
              {/* {comment.sentiment === 1 ? } */}
              {comment.comment}
            </span>
          </div>
        ) : options === "Positive" ? (
          <div className="comm">
            <span key={index} className="commentdata">
              {comment.sentiment === 1 && comment.comment}
            </span>
          </div>
        ) : options === "Negative" ? (
          <div className="comm">
            <span key={index} className="commentdata">
              {comment.sentiment === -1 && comment.comment}
            </span>
          </div>
        ) : options === "Nutural" ? (
          <div className="comm">
            <span key={index} className="commentdata">
              {comment.sentiment === 0 && comment.comment}
            </span>
          </div>
        ) : (
          <h3>data is not present</h3>
        )}
      </>
    );
  });
};
