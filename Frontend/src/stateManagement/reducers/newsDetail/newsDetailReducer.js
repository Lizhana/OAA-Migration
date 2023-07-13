import * as constants from '../../types/constActionsDetail'

const initialState = {
    newUserCreate: [],
    threeCategories : [],
    threeRecents: [],
    allWorks:   [],
    onlyAWork: []
}

export default function newsDetailReducer(state = initialState, action) {
    switch (action.type) {
        case constants.INSCRIPTION_NEWSLETTER:
          return {
            ...state,
            newUserCreate: action.payload
          }
        case constants.THREE_CATEGORIES:
          return {
            ...state,
            threeCategories: action.payload
          }
        case constants.THREE_RECENTS:
          return {
            ...state,
            threeRecents: action.payload
          }
        case constants.GET_A_WORK:
            return {
              ...state,
              onlyAWork: action.payload
            }
        case constants.GET_ALL_WORKS:
          return {
            ...state,
            allWorks: action.payload
            }
        default:
            return state
    }
}