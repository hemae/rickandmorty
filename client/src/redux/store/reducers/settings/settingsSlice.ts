import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ThemeType} from '../../../models/settings'


type SettingsStateType = {
    theme: ThemeType
}

const initialState: SettingsStateType = {
    theme: 'Light'
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setTheme(state: SettingsStateType, action: PayloadAction<ThemeType>) {
            state.theme = action.payload
            localStorage.setItem('theme', action.payload)
        }
    }
})


export default settingsSlice.reducer
