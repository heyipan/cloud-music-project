import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { Container } from "./style";

function Album(props) {
  const navigate = useNavigate();

  const [showStatus, setShowStatus] = useState(true);

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => {
        console.log(13);
        navigate("/recommend");
      }}
    >
      <Container
        onClick={() => {
          setShowStatus(false);
        }}
      >
        123123
      </Container>
    </CSSTransition>
  );
}

export default React.memo(Album);
