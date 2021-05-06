import React from "react";

export default function Dealers() {
  const [testText, setTestText] = React.useState(
    "List of existing dealers and their subscription plans in database"
  );
  return (
    <div>
      <h2>{testText}</h2>
    </div>
  );
}
