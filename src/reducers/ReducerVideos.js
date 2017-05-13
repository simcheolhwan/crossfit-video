import _ from 'lodash'
import * as types from '../actions/types'
import { SAMPLE_VIDEOS } from './SampleStorage'

export default function (state = {}, action) {
  switch(action.type) {
    case types.FETCH_VIDEOS:
      return action.payload || {}

    case types.IMPORT_STORAGE:
      return SAMPLE_VIDEOS

    case types.EMPTY_STORAGE:
      return []

    case types.EDIT_BOARD:
      const { editingBoard, editingBoardPart } = action.payload
      return state.map(video => {return video.board === editingBoard.slug ?
        { ...video, board: editingBoardPart.slug } : video
      })

    case types.DELETE_BOARD:
      const deletingBoard = action.payload
      return state.map(video => {return video.board === deletingBoard.slug ?
        { ...video, board: null, list: null, deleted: true } : video
      })

    case types.EDIT_LIST:
      const { editingList, editingListPart } = action.payload
      return state.map(video => {return video.list === editingList.slug ?
        { ...video, list: editingListPart.slug } : video
      })

    case types.DELETE_LIST:
      const { deletingList, deletingListCurrentBoard } = action.payload
      return state.map(video => {
        return video.board === deletingListCurrentBoard.slug && video.list === deletingList.slug ?
          { ...video, list: null, deleted: true } : video
      })

    case types.ADD_VIDEO:
      const addingVideo = action.payload
      return [ ...state, addingVideo ]

    case types.EDIT_VIDEO:
      const { editingVideo, editingVideoPart } = action.payload
      return state.map(video => {return video === editingVideo ?
        { ...video, ...editingVideoPart } : video
      })

    case types.DELETE_VIDEO:
      const deletingVideo = action.payload
      return state.filter(video => {return video !== deletingVideo})

    case types.EMPTY_TRASH:
      return state.filter(video => {return video.deleted !== true})

    default:
      return state
  }
}
