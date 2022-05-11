import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import  Header  from './../../baseUI/header/index';

import { Container } from "./style";

function Album(props) {
  const navigate = useNavigate();

  const [showStatus, setShowStatus] = useState(true);

  const handleBack = () => {
    setShowStatus (false);
  };

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
      <Container>
        <Header title={"返回"} handleClick={handleBack}></Header>
      </Container>
    </CSSTransition>
  );
}

export default React.memo(Album);
