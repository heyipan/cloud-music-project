import React, { useState,useEffect, useCallback } from "react";
import { connect } from "react-redux";
import  LazyLoad, {forceCheck} from 'react-lazyload';

import Horizen from "../../baseUI/horizon-item";
import Scroll from "../../components/scroll";
import { categoryTypes, alphaTypes } from "../../api/config";
import { NavContainer, List, ListItem, ListContainer } from "./style";
import Loading from "../../baseUI/loading";


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
  const { singerList,pullUpLoading,pullDownLoading,pageCount,enterLoading } = props;

  const {getHotSingerDispatch, updateDispatch,pullUpRefreshDispatch, pullDownRefreshDispatch} = props;

  const [category, setCategory] = useState({});
  const [alpha, setAlpha] = useState("");


  useEffect(() => {
    getHotSingerDispatch();
  },[])

  const handleUpdateAlpha = ({key}) => {
    setAlpha(key);
    updateDispatch(category.area, category.type, key);
  };
  
  const handleUpdateCatetory = ({key,type,area}) => {
    setCategory({key,type,area});
    updateDispatch(area, type, alpha);
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
                <LazyLoad placeholder={<img width="100%" height="100%" src={require ('./singer.png')} alt="music"/>}>
                    <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
                </LazyLoad>
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          );
        })}
      </List>
    );
  };

  const handlePullUp = () => {
    pullUpRefreshDispatch(category.area, category.type, alpha, category === '', pageCount);
  };
  
  const handlePullDown = () => { 
    pullDownRefreshDispatch(category.area, category.type, alpha);
  };

  return (
    <NavContainer>
      <Horizen
        list={categoryTypes}
        title={"分类 (默认热门):"}
        handleClick={handleUpdateCatetory}
        value={category.key}
      />
      <Horizen
        list={alphaTypes}
        title={"首字母:"}
        handleClick={handleUpdateAlpha}
        value={alpha}
      />
      <ListContainer>
        <Scroll 
          pullUp={ handlePullUp }
          pullDown = { handlePullDown }
          pullUpLoading = { pullUpLoading }
          pullDownLoading = { pullDownLoading }
          onScroll={forceCheck}
        >
            {renderSingerList()}
        </Scroll>
        <Loading show={enterLoading}></Loading>
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
    updateDispatch(area, type, alpha) {
      dispatch(changePageCount(0)); //由于改变了分类，所以pageCount清零
      dispatch(changeEnterLoading(true)); // loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
      dispatch(getSingerList(area, type, alpha));
    },
    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(area, type, alpha, hot, count) {
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count + 1));
      if (hot) {
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(area, type, alpha));
      }
    },
    //顶部下拉刷新
    pullDownRefreshDispatch(area, type, alpha) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(0)); //属于重新获取数据
      if (!area && alpha === "") {
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList(area, type, alpha));
      }
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Singers));
