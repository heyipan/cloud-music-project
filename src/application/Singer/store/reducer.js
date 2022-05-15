/*
 * @Descripttion:  存放 initialState 和 reducer 函数
 * @version:
 * @Author: 输入自己姓名
 * @Date: 2022-05-04 20:28:45
 */
import * as actionTypes from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS ({
  artist: {},
  songsOfArtist: [],
  loading: true
});

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
    switch (action.type) {
      case actionTypes.CHANGE_ARTIST:
        return state.set ('artist', action.data);
      case actionTypes.CHANGE_SONGS_OF_ARTIST:
        return state.set ('songsOfArtist', action.data);
      case actionTypes.CHANGE_ENTER_LOADING:
        return state.set ('loading', action.data);
      default:
        return state;
    }
  }
