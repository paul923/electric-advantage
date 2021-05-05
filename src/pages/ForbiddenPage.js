import React from "react";
import { Link } from "react-router-dom";

const ForbiddenPage = () => {
  return (
    <div className="container">
      <div class="message">
        <h1>403 - Unauthorized</h1>
        <p>
          <br />
          Maybe you have a typo in the url? Or you meant to go to a different
          location?
        </p>
      </div>
      <p>
        <Link to="/">Back to Home</Link>
      </p>
    </div>
  );
};

export default ForbiddenPage;
