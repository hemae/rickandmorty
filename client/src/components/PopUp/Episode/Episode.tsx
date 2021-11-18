import React, {FC, memo, useEffect, useState} from 'react'
import {UrlType} from '../../../redux/models/Character'
import {useAppSelector} from '../../../redux/hooks/redux'
import styles from './Episode.module.css'


const Episode: FC<{link: UrlType}> = ({link}) => {

    const {theme} = useAppSelector(state => state.settingsReducer)

    const colorStyles = require(`./Episode${theme}.module.css`)

    const [isEpisodeHover, setIsEpisodeHover] = useState<boolean>(false)
    const [rotate, setRotate] = useState<number>(Math.random() * 20 - 10)

    useEffect(() => {
        setRotate(Math.random() * 20 - 10)
    }, [isEpisodeHover])

    const onEpisodeOver = (): void => {
        setIsEpisodeHover(true)
    }

    const onEpisodeLeave = (): void => {
        setIsEpisodeHover(false)
    }

    const splitLink: Array<string> = link.split('/')

    return (
        <div
            className={`${styles.episode} + ${colorStyles.episode}`}
            onMouseOver={onEpisodeOver}
            onMouseLeave={onEpisodeLeave}
            style={{transform: `rotate(${rotate}deg)`}}
        >
            {splitLink[splitLink.length - 1]}
        </div>
    )
}

export default memo<{link: UrlType}>(Episode)
