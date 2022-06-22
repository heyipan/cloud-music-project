import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";

import style from "../../assets/global-style";
import { getCount } from "../../api/utils";
import Header from "./../../baseUI/header/index";
import Scroll from "../../components/scroll";
import SongsList from "../SongsList";
import { changeEnterLoading, getAlbumList } from "./store/actionCreators";
import { isEmptyObject } from "../../api/utils";
import Loading from "../../baseUI/loading";
import MusicNote from "../../baseUI/music-note/index";

import { Container, TopDesc, Menu } from "./style";

export const HEADER_HEIGHT = 45;

function Album(props) {
  const navigate = useNavigate();

  // 从路由中拿到歌单的 id
  const { id } = useParams();

  const {
    currentAlbum: currentAlbumImmutable,
    enterLoading,
    songsCount,
  } = props;
  const { getAlbumDataDispatch } = props;

  const musicNoteRef = useRef();

  useEffect(() => {
    getAlbumDataDispatch(id);
  }, [getAlbumDataDispatch, id]);

  // 同时将 mock 数据的代码删除
  let currentAlbum = currentAlbumImmutable.toJS();

  const [title, setTitle] = useState("歌单");
  const [showStatus, setShowStatus] = useState(true);
  const [isMarquee, setIsMarquee] = useState(false); // 是否跑马灯

  const headerEl = useRef();

  const handleBack = useCallback(() => {
    setShowStatus(false);
  }, []);

  const handleScroll = useCallback(
    (pos) => {
      let minScrollY = -HEADER_HEIGHT;
      let percent = Math.abs(pos.y / minScrollY);
      let headerDom = headerEl.current;
      // 滑过顶部的高度开始变化
      if (pos.y < minScrollY) {
        headerDom.style.backgroundColor = style["theme-color"];
        headerDom.style.opacity = Math.min(1, (percent - 1) / 2);
        setTitle(currentAlbum.name);
        setIsMarquee(true);
      } else {
        headerDom.style.backgroundColor = "";
        headerDom.style.opacity = 1;
        setTitle("歌单");
        setIsMarquee(false);
      }
    },
    [currentAlbum]
  );

  const renderTopDesc = () => {
    return (
      <TopDesc background={currentAlbum.coverImgUrl}>
        <div className="background">
          <div className="filter"></div>
        </div>
        <div className="img_wrapper">
          <div className="decorate"></div>
          <img src={currentAlbum.coverImgUrl} alt="" />
          <div className="play_count">
            <i className="iconfont play">&#xe885;</i>
            <span className="count">
              {getCount(currentAlbum.subscribedCount)}
            </span>
          </div>
        </div>
        <div className="desc_wrapper">
          <div className="title">{currentAlbum.name}</div>
          <div className="person">
            <div className="avatar">
              <img src={currentAlbum.creator.avatarUrl} alt="" />
            </div>
            <div className="name">{currentAlbum.creator.nickname}</div>
          </div>
        </div>
      </TopDesc>
    );
  };

  const renderMenu = () => {
    return (
      <Menu>
        <div>
          <i className="iconfont">&#xe6ad;</i>
          评论
        </div>
        <div>
          <i className="iconfont">&#xe86f;</i>
          点赞
        </div>
        <div>
          <i className="iconfont">&#xe62d;</i>
          收藏
        </div>
        <div>
          <i className="iconfont">&#xe606;</i>
          更多
        </div>
      </Menu>
    );
  };

  const musicAnimation = (x, y) => {
    musicNoteRef.current.startAnimation({ x, y });
  };

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => {
        navigate(-1);
      }}
    >
      <Container play={songsCount}>
        <Header
          ref={headerEl}
          title={title}
          handleClick={handleBack}
          isMarquee={isMarquee}
        ></Header>
        {!isEmptyObject(currentAlbum) ? (
          <Scroll bounceTop={false} onScroll={handleScroll}>
            <div>
              {renderTopDesc()}
              {renderMenu()}
              <SongsList
                songs={currentAlbum.tracks}
                collectCount={currentAlbum.subscribedCount}
                showCollect={true}
                showBackground={true}
                musicAnimation={musicAnimation}
              />
            </div>
          </Scroll>
        ) : null}
        <Loading show={enterLoading} />
        <MusicNote ref={musicNoteRef}></MusicNote>
      </Container>
    </CSSTransition>
  );
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  currentAlbum: state.getIn(["album", "currentAlbum"]),
  enterLoading: state.getIn(["album", "enterLoading"]),
  songsCount: state.getIn(["player", "playList"]).size, // 尽量减少 toJS 操作，直接取 size 属性就代表了 list 的长度
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    getAlbumDataDispatch(id) {
      dispatch(changeEnterLoading(true));
      dispatch(getAlbumList(id));
    },
  };
};

// 将 ui 组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album));
