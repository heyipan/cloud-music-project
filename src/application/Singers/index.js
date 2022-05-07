import React, { useState } from "react";
import { connect } from "react-redux";

import Horizen from "../../baseUI/horizon-item";
import Scroll from "../../components/scroll";
import { categoryTypes, alphaTypes } from "../../api/config";
import { NavContainer, List, ListItem, ListContainer } from "./style";

import {
  getSingerList,
  getHotSingerList,
  changeEnterLoading,
  changePageCount,
  refreshMoreSingerList,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreHotSingerList,
} from "./store/actionCreators";

function Singers(props) {
  const { singerList } = props;

  const [category, setCategory] = useState("");
  const [alpha, setAlpha] = useState("");

  const handleUpdateAlpha = (val) => {
    setAlpha(val);
  };

  const handleUpdateCatetory = (val) => {
    setCategory(val);
  };

  const singerListJS = singerList ? singerList.toJS() : [];

  // 渲染函数，返回歌手列表
  const renderSingerList = () => {
    return (
      <List>
        {singerListJS.map((item, index) => {
          return (
            <ListItem key={item.accountId + "" + index}>
              <div className="img_wrapper">
                <img
                  src={`${item.picUrl}?param=300x300`}
                  width="100%"
                  height="100%"
                  alt="music"
                />
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <NavContainer>
      <Horizen
        list={categoryTypes}
        title={"分类 (默认热门):"}
        handleClick={handleUpdateCatetory}
        value={category}
      />
      <Horizen
        list={alphaTypes}
        title={"首字母:"}
        handleClick={handleUpdateAlpha}
        value={alpha}
      />
      <ListContainer>
        <Scroll>{renderSingerList()}</Scroll>
      </ListContainer>
    </NavContainer>
  );
}

const mapStateToProps = (state) => ({
  singerList: state.getIn(["singers", "singerList"]),
  enterLoading: state.getIn(["singers", "enterLoading"]),
  pullUpLoading: state.getIn(["singers", "pullUpLoading"]),
  pullDownLoading: state.getIn(["singers", "pullDownLoading"]),
  pageCount: state.getIn(["singers", "pageCount"]),
});
const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList());
    },
    updateDispatch(category, alpha) {
      dispatch(changePageCount(0)); //由于改变了分类，所以pageCount清零
      dispatch(changeEnterLoading(true)); //loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
      dispatch(getSingerList(category, alpha));
    },
    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(category, alpha, hot, count) {
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count + 1));
      if (hot) {
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(category, alpha));
      }
    },
    //顶部下拉刷新
    pullDownRefreshDispatch(category, alpha) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(0)); //属于重新获取数据
      if (category === "" && alpha === "") {
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList(category, alpha));
      }
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Singers));
