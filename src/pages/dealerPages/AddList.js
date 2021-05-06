import React from "react";

export default function Home() {
  const [testText, setTestText] = React.useState("Add Screen");
  return (
    <div>
      <h2>{testText}</h2>
    </div>
  );
}
