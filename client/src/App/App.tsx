import React, {FC, useEffect} from 'react'
import styles from './App.module.css'
import {useAppDispatch, useAppSelector} from '../redux/hooks/redux'
import Header from '../components/Header/Header'
import SubHeader from '../components/SubHeader/SubHeader'
import Characters from '../components/Craracters/Characters'
import {settingsSlice} from '../redux/store/reducers/settings/settingsSlice'
import {ThemeType} from '../redux/models/settings'
import PopUp from '../components/PopUp/PopUp'
import {UniqueId} from '../redux/models/Character'
import {charactersSlice} from '../redux/store/reducers/characters/charactersSlice'
import Sorter from '../components/Sorter/Sorter'

const App: FC = () => {

    const {theme} = useAppSelector(state => state.settingsReducer)
    const {currentCharacter} = useAppSelector(state => state.charactersReducer)
    const dispatch = useAppDispatch()

    const colorStyles = require(`./App${theme}.module.css`)

    useEffect(() => {
        const storageTheme = localStorage.getItem('theme') as ThemeType | null
        if (storageTheme) {
            dispatch(settingsSlice.actions.setTheme(storageTheme))
        }
        const storageLikedIds: string | null = localStorage.getItem('likedIds')
        if (storageLikedIds) {
            const likedIds = JSON.parse(storageLikedIds).likedIds as Array<UniqueId>
            dispatch(charactersSlice.actions.setLikedIds(likedIds))
        }
    }, [])

    return (
        <div className={`${styles.app} + ${colorStyles.app}`}>
            <SubHeader/>
            <Sorter/>
            <Characters/>
            <Header/>
            {currentCharacter && <PopUp/>}
        </div>
    )
}

export default App
