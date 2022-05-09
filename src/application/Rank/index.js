import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getRankList } from "./store";

function Rank(props) {
  const { rankList: list, loading } = props;

  const { getRankListDataDispatch } = props;

  useEffect(() => {
    getRankListDataDispatch();
  }, []);

  let rankList = list ? list.toJS() : [];
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  rankList: state.getIn(["rank", "rankList"]),
  loading: state.getIn(["rank", "loading"]),
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    getRankListDataDispatch() {
      dispatch(getRankList());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank));
