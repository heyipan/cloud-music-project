import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import BScroll from "better-scroll";
import styled from "styled-components";

import Loading from "../../baseUI/loading";
import Loading2 from '../../baseUI/loadingV2';
import { debounce } from "../../api/utils";

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const PullUpLoading = styled.div`
  position: absolute;
  left:0; right:0;
  bottom: 5px;
  width: 60px;
  height: 60px;
  margin: auto;
  z-index: 100;
`;

export const PullDownLoading = styled.div`
  position: absolute;
  left:0; right:0;
  top: 0px;
  height: 30px;
  margin: auto;
  z-index: 100;
`;


const Scroll = forwardRef((props, ref) => {
  //better-scroll 实例对象
  const [bScroll, setBScroll] = useState();

  //current 指向初始化 bs 实例需要的 DOM 元素
  const scrollContaninerRef = useRef();

  const { direction, click, refresh, bounceTop, bounceBottom,pullUpLoading,pullDownLoading } = props;

  const { pullUp, pullDown, onScroll } = props;

  useEffect(() => {
    const scroll = new BScroll(scrollContaninerRef.current, {
      scrollX: direction === "horizontal",
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
      },
    });
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    };
    //eslint-disable-next-line
  }, []);

  let pullUpDebounce = useCallback(() => {
    return debounce(pullUp, 300);
  }, [pullUp]);
  // 千万注意，这里不能省略依赖，
  // 不然拿到的始终是第一次 pullUp 函数的引用，相应的闭包作用域变量都是第一次的，产生闭包陷阱。下同。

  let pullDownDebounce = useCallback(() => { 
    return debounce(pullDown, 300)
  }, [pullDown]);

  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on("scroll", (scroll) => {
      onScroll(scroll);
    });
    return () => {
      bScroll.off("scroll");
    };
  }, [onScroll, bScroll]);

  useEffect(() => {
    if (!bScroll || !pullUp) return;
    const handlePullUp = () => {
        // console.log(bScroll.y,bScroll.maxScrollY)
      // 判断是否滑动到了底部  加100的原因是：当剩下最后一排的时候 就可以去获取新的数据了 也可以不加 当小于时去获取
        if(bScroll.y <= bScroll.maxScrollY + 100){
          pullUpDebounce()();
        }
      };
      bScroll.on('scrollEnd', handlePullUp);
      // 解绑
      return () => {
        bScroll.off('scrollEnd', handlePullUp);
      }
  }, [pullUp, bScroll, pullUpDebounce]);

  useEffect(() => {
    if (!bScroll || !pullDown) return;
    const handlePullDown = (pos) => {
        // console.log('touch',pos)
       // 判断用户的下拉动作  当拖动的幅度大于50时 刷新  都可以通过scroll事件中的y值来判断当前是顶部下拉还是底部上拉
        if(pos.y > 50) {
          pullDownDebounce()();
        }
      };
      bScroll.on('touchEnd', handlePullDown);
      return () => {
        bScroll.off('touchEnd', handlePullDown);
      }
  }, [pullDown, bScroll, pullDownDebounce]);

  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  });

  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    getBScroll() {
      if (bScroll) {
        return bScroll;
      }
    },
  }));

  const PullUpdisplayStyle = pullUpLoading ? { display: "" } : { display: "none" };
  const PullDowndisplayStyle = pullDownLoading ? { display: "" } : { display: "none" };

  return (
    <ScrollContainer ref={scrollContaninerRef}>
      {props.children}
      {/* 滑到底部加载动画 */}
    <PullUpLoading style={PullUpdisplayStyle }><Loading></Loading></PullUpLoading>
    {/* 顶部下拉刷新动画 */}
    <PullDownLoading style={PullDowndisplayStyle}><Loading2></Loading2></PullDownLoading>
    </ScrollContainer>
  );
});

Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true,
};

Scroll.propTypes = {
  direction: PropTypes.oneOf(["vertical", "horizontal"]), // 滚动的方向
  click: true, // 是否支持点击
  refresh: PropTypes.bool, // 是否刷新
  onScroll: PropTypes.func, // 滑动触发的回调函数
  pullUp: PropTypes.func, // 上拉加载逻辑
  pullDown: PropTypes.func, // 下拉加载逻辑
  pullUpLoading: PropTypes.bool, // 是否显示上拉 loading 动画
  pullDownLoading: PropTypes.bool, // 是否显示下拉 loading 动画
  bounceTop: PropTypes.bool, // 是否支持向上吸顶
  bounceBottom: PropTypes.bool, // 是否支持向下吸底
};

export default Scroll;
