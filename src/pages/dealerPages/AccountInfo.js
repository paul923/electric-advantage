import React from "react";

export default function Home() {
  const [testText, setTestText] = React.useState("Account Info");
  return (
    <div>
      <h2>{testText}</h2>
    </div>
  );
}