import React from "react";

const TestingPage = () => {
  // Intentional bug: reference an undefined variable to trigger a runtime error
  // Added extra comment for PR review testing
  console.log("Rendering TestingPage");
  return <div>{brokenVar.toString()}</div>;
};

export default TestingPage;
