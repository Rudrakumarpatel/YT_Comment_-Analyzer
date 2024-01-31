import React from "react"
import "../App.css"
// className="search_bar d-flex justify-content-center"
export const Searchbar = () =>
{
    return <div className="Searchbar" style={{'width':"100%"}} >
      <input type="url" name="URL" id="URL" placeholder="Enter Url" style={{'width':"40%","height":"38px","paddingLeft":" 15px","paddingRight":"10px"}} className="rounded-start-4 hover-effect text_input"/>
      <input type="button" value="Submit" className="rounded-end-4 fw-bold border border-dark hover-button button-response"/>
    </div>
}