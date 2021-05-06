import React from "react";

export default function Cars() {
  const [testText, setTestText] = React.useState(
    "List of existing cars in database"
  );
  return (
    <div>
      <h2>{testText}</h2>
    </div>
  );
}
