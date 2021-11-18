import React, {FC, memo, useEffect, useState} from 'react'
import styles from './Character.module.css'
import {useAppDispatch, useAppSelector} from '../../../redux/hooks/redux'
import {CharacterType} from '../../../redux/models/Character'
import InfoItem from '../../common/InfoItem/InfoItem'
import footerDark from '../../../assets/itemDark.png'
import footerLight from '../../../assets/itemLight.png'
import {charactersSlice} from '../../../redux/store/reducers/characters/charactersSlice'
import * as GiIcons from 'react-icons/gi'


const infoItems: ['name', 'status', 'species', 'type', 'gender'] = ['name', 'status', 'species', 'type', 'gender']

const Character: FC<{ character: CharacterType }> = ({character}) => {

    const {theme} = useAppSelector(state => state.settingsReducer)
    const colorStyles = require(`./Character${theme}.module.css`)
    const dispatch = useAppDispatch()

    const [isCharacterHover, setIsCharacterHover] = useState<boolean>(false)
    const [isFooterShown, setIsFooterShown] = useState<boolean>(false)
    const [rotate, setRotate] = useState<number>(Math.random() * 3 - 1.5)
    const [isOnStar, setIsOnStar] = useState<boolean>(false)

    useEffect(() => {
        if (isCharacterHover) {
            setIsFooterShown(isCharacterHover)
        } else {
            setTimeout(() => {
                setIsFooterShown(isCharacterHover)
            }, 0)
        }
        setRotate(Math.random() * 3 - 1.5)
    }, [isCharacterHover])

    const onCharacterOver = (): void => {
        setIsCharacterHover(true)
    }

    const onCharacterLeave = (): void => {
        setIsCharacterHover(false)
    }

    const onCharacterClick = (): void => {
        if (!isOnStar) {
            dispatch(charactersSlice.actions.setCharacter(character))
        }
    }

    return (
        <div className={styles.characterContainer}
             style={{
                 //@ts-ignore
                 position: `${isCharacterHover ? 'relative' : 'initial'}`
             }}
        >

            {isCharacterHover && <div
                className={`${styles.characterFooter} + ${isFooterShown ? styles.active : ''}`}
                style={{
                    backgroundImage: `url(${theme === 'Light' ? footerLight : footerDark})`,
                    //@ts-ignore
                    position: `${isCharacterHover ? 'absolute' : 'initial'}`
                }}
            >
            </div>}

            <div
                className={`${styles.character} + ${colorStyles.character} + ${isCharacterHover ? colorStyles.active : ''}`}
                onMouseOver={onCharacterOver}
                onMouseLeave={onCharacterLeave}
                onClick={onCharacterClick}
                style={{
                    //@ts-ignore
                    position: `${isCharacterHover ? 'absolute' : 'initial'}`,
                    transform: `rotate(${rotate}deg) scale(${isCharacterHover ? 1.05 : 1})`
                }}
            >

                <div
                    className={`${styles.image} + ${colorStyles.image}  + ${isCharacterHover ? colorStyles.active : ''}`}
                    style={{
                        backgroundImage: `url(${character.image})`,
                        backgroundSize: `${isCharacterHover ? '230px' : '200px'}`
                    }}
                >
                </div>


                <div className={styles.infoContainer}>
                    <div className={`${styles.info} + ${colorStyles.info}`}>
                        {infoItems.map((infoItem, index) => <InfoItem
                            key={index}
                            id={infoItem === 'name' ? character.id : undefined}
                            property={infoItem}
                            value={character[infoItem]}
                            isCharacterHover={isCharacterHover}
                            shownPropertyLabel={infoItem !== 'name'}
                            setIsOnStar={infoItem === 'name' ? setIsOnStar : undefined}
                        />)}
                    </div>
                </div>

                <div className={`${styles.details} + ${colorStyles.details} + ${isCharacterHover ? styles.active : ''}`}
                     style={{
                         //@ts-ignore
                         position: 'absolute',
                         transform: `rotate(${rotate + 180}deg) `
                     }}
                >
                    <GiIcons.GiLobArrow/>
                </div>

            </div>
        </div>
    )
}

export default memo<{ character: CharacterType }>(Character)
