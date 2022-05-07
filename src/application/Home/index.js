import React from "react";
import { Outlet, NavLink } from "react-router-dom";

import { Top, Tab, TabItem } from "./style";

const Home = () => {
  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">网易云</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>
      <Tab>
        <NavLink to="/recommend" activeclassname="selected">
          <TabItem>
            <span>推荐</span>
          </TabItem>
        </NavLink>
        <NavLink to="/singers" activeclassname="selected">
          <TabItem>
            <span>歌手</span>
          </TabItem>
        </NavLink>
        <NavLink to="/rank" activeclassname="selected">
          <TabItem>
            <span>排行榜</span>
          </TabItem>
        </NavLink>
      </Tab>
      <Outlet />
    </div>
  );
};

export default Home;
