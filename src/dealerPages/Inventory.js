import React from "react";

export default function Home() {
  const [testText, setTestText] = React.useState("Inventory Screen");
  return (
    <div>
      <h2>{testText}</h2>
    </div>
  );
}
