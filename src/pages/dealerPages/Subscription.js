import React from "react";

export default function DealerSubscription() {
  const [testText, setTestText] = React.useState("Subscription Screen");
  return (
    <div>
      <h2>{testText}</h2>
    </div>
  );
}
