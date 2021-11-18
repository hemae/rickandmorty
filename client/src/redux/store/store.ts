import {combineReducers, configureStore} from '@reduxjs/toolkit'
import settingsReducer from './reducers/settings/settingsSlice'
import charactersReducer from './reducers/characters/charactersSlice'
import sorterReducer from './reducers/sorter/sorterSlice'


const reducer = combineReducers({
    settingsReducer,
    charactersReducer,
    sorterReducer
})

const setupStore = () => {
    return configureStore({
        reducer
    })
}

export type State = ReturnType<typeof reducer>
export type Store = ReturnType<typeof setupStore>
export type Dispatch = Store['dispatch']


export default setupStore()