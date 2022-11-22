import React from "react";
import { StompSessionProvider } from "react-stomp-hooks";

const Stomp = ({ socketUrl, children }) => {
  return (
    <StompSessionProvider url={socketUrl}>
      <div>{children}</div>
    </StompSessionProvider>
  );
};

export default Stomp;
