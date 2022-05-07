import React, { useState, useRef, useEffect, memo } from "react";
import { PropTypes } from "prop-types";

import Scroll from "../../components/scroll";
import { List, ListItem } from "./style";

function Horizon(props) {
  const { list, value, title } = props;
  const { handleClick } = props;
  return (
    <Scroll direction="horizontal">
      <List>
        <span>{title}</span>
        {list.map((item) => {
          return (
            <ListItem
              key={item.key}
              className={`${value === item.key ? "selected" : ""}`}
              onClick={() => handleClick(item.key)}
            >
              {item.name}
            </ListItem>
          );
        })}
      </List>
    </Scroll>
  );
}

Horizon.defaultProps = {
  list: [],
  value: "",
  title: "",
  handleClick: null,
};

Horizon.propTypes = {
  list: PropTypes.array, //list 为接受的列表数据
  value: PropTypes.string, //value 为当前选中的 item 值
  title: PropTypes.string, //title 为列表左边的标题
  handleClick: PropTypes.func, //handleClick 为点击不同的 item 执行的方法
};
export default memo(Horizon);
