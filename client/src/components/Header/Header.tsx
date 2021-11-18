import React, {FC, memo, useState} from 'react'
import styles from './Header.module.css'
import {useAppDispatch, useAppSelector} from '../../redux/hooks/redux'
import Switch from '../common/Switch/Switch'
import {settingsSlice} from '../../redux/store/reducers/settings/settingsSlice'
import {ThemeType} from '../../redux/models/settings'
import {PayloadAction} from '@reduxjs/toolkit'
import headerLogo from '../../assets/header_logo.png'
import headerLabel from '../../assets/rick_and_morty_heade_label.png'
import headerDark from '../../assets/headerDark.png'
import headerLight from '../../assets/headerLight.png'
import * as GiIcons from 'react-icons/gi'


const Header: FC = () => {

    const {theme} = useAppSelector(state => state.settingsReducer)
    const dispatch = useAppDispatch()

    const [isHeaderShown, setIsHeaderShown] = useState<boolean>(false)

    const onHeaderOver = (): void => {
        setIsHeaderShown(true)
    }

    const onHeaderLeave = (): void => {
        setIsHeaderShown(false)
    }

    const colorStyles = require(`./Header${theme}.module.css`)

    const setTheme = (theme: ThemeType): PayloadAction<ThemeType> => dispatch(settingsSlice.actions.setTheme(theme))

    return (
        <div
            className={`${styles.header} + ${colorStyles.header} + ${isHeaderShown ? styles.shown : ''}`}
            onMouseOver={onHeaderOver}
            onMouseLeave={onHeaderLeave}
            style={{
                backgroundImage: `url(${theme === 'Light' ? headerLight : headerDark})`
            }}
        >
            <img className={`${styles.logo} + ${colorStyles.logo}`} src={headerLogo} alt=''/>

            <img className={`${styles.brand} + ${colorStyles.brand}`} src={headerLabel} alt=''/>

            <Switch
                setProp={setTheme}
                prop1={'Light'}
                prop2={'Dark'}
                currentProp={theme}
                icons={{
                    icon1: <GiIcons.GiStarProminences/>,
                    icon2: <GiIcons.GiSolarSystem/>
                }}
                title={'Switch theme'}
            />
        </div>
    )
}

export default memo(Header)
