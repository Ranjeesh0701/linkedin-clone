import React from "react";
import "./Widgets.css";
import { Info, FiberManualRecord } from "@mui/icons-material";

const Widgets = () => {
  const newsArticle = (heading, subtitle) => (
    <div className="widgets__article">
      <div className="widgets__articleLeft">
        <FiberManualRecord />
      </div>
      <div className="widgets__articleRight">
        <h4>{heading}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div className="widgets">
      <div className="widgets__header">
        <h2>LinkedIn News</h2>
        <Info />
      </div>
      {newsArticle("React just breaks Records.", "Top news - 9999 readers")}
      {newsArticle("Javascript is sick.", "Top news - 8789 readers")}
      {newsArticle("Web3 into the break.", "Top news - 7654 readers")}
      {newsArticle("Block chain in its verge?.", "Top news - 6345 readers")}
    </div>
  );
};

export default Widgets;
