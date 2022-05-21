/*
 * @Description:
 * @version: 0.0.1
 * @Author: heqiheng <qiheng.he@hand-china.com>
 * @Date: 2022-04-27 16:49:28
 * @@Copyright: Copyright (c) 2022, Hand
 */
import { combineReducers } from "redux-immutable";
import { reducer as recommendReducer } from "../application/Recommend/store";
import { reducer as singersReducer } from "../application/Singers/store/index";
import { reducer as rankReducer } from "../application/Rank/store";
import { reducer as albumReducer } from "../application/Album/store";
import { reducer as singerInfoReducer } from "../application/Singer/store";
import { reducer as playerReducer } from "../application/Player/store/index";

export default combineReducers({
  recommend: recommendReducer,
  singers: singersReducer,
  rank: rankReducer,
  album: albumReducer,
  singerInfo: singerInfoReducer,
  player: playerReducer,
});
