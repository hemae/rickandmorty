import React, {FC, memo} from 'react'
import styles from './Switch.module.css'
import {PayloadAction} from '@reduxjs/toolkit'
import {UrlType} from '../../../redux/models/Character'
import {useAppSelector} from '../../../redux/hooks/redux'
import toggle from '../../../assets/toggleHead.png'
import toggleReverse from '../../../assets/toggleHeadReverse.png'


type SwitchPropsType = {
    setProp: (prop: any) => PayloadAction<any>
    prop1: any
    prop2: any
    currentProp: any
    icons?: {
        icon1: JSX.Element
        icon2: JSX.Element
    }
    images?: {
        image1: UrlType
        image2: UrlType
    }
    size?: number
    title?: string
}

const Switch: FC<SwitchPropsType> = ({
                                         setProp,
                                         prop1,
                                         prop2,
                                         currentProp,
                                         icons,
                                         images,
                                         size = 40,
                                         title = ''
                                     }) => {

    const {theme} = useAppSelector(state => state.settingsReducer)

    const colorStyles = require(`./Switch${theme}.module.css`)

    const onSwitchClick = (): void => {
        setProp(prop1 === currentProp ? prop2 : prop1)
    }

    const switchStyle = {
        height: `${size}px`,
        width: `${2 * size + (size * 1 / 6)}px`,
        borderRadius: `${Math.round(size / 2)}px`,
        flexDirection: prop1 === currentProp ? 'row' : 'row-reverse',
        fontSize: `${Math.round(size * 10 / 13)}px`,
        transform: 'rotate(5deg)',
        marginTop: '15px'
    }

    return (
        <div
            className={`${styles.switch} + ${colorStyles.switch}`}
            //@ts-ignore
            style={switchStyle}
            onClick={onSwitchClick}
            title={title}
        >
            <img src={prop1 === currentProp ? toggle : toggleReverse} alt='' className={styles.toggle}/>
            {icons && <div style={{
                marginTop: '15px',
                marginLeft: '10px',
                marginRight: '10px'
            }}>{prop1 === currentProp ? icons.icon1 : icons.icon2}</div>}
            {images && <div>{prop1 === currentProp ? images.image1 : images.image2}</div>}
        </div>
    )
}

export default memo<SwitchPropsType>(Switch)