import React, {FC, memo, useEffect, useState} from 'react'
import styles from './PopUp.module.css'
import {useAppDispatch, useAppSelector} from '../../redux/hooks/redux'
import popUpDark from '../../assets/popupDark.jpg'
import popUpLight from '../../assets/popUpLight.png'
import * as GiIcons from 'react-icons/gi'
import {charactersSlice} from '../../redux/store/reducers/characters/charactersSlice'
import InfoItem from '../common/InfoItem/InfoItem'
import Episode from './Episode/Episode'
import {UrlType} from '../../redux/models/Character'
import createGrid from '../../helpers/createGrid'


const PopUp: FC = () => {

    const {theme} = useAppSelector(state => state.settingsReducer)
    const {currentCharacter} = useAppSelector(state => state.charactersReducer)
    const dispatch = useAppDispatch()

    const colorStyles = require(`./PopUp${theme}.module.css`)

    const [localIsShown, setLocalIsShown] = useState<boolean>(false)
    const [isonPopUp, setIsonPopUp] = useState<boolean>(false)

    const onCloseClick = (): void => {
        dispatch(charactersSlice.actions.setCharacter(null))
    }

    const onPopUpOver = (): void => {
        setIsonPopUp(true)
    }

    const onPopUpLeave = (): void => {
        setIsonPopUp(false)
    }

    useEffect(() => {
        if (currentCharacter) {
            setLocalIsShown(true)
        }
    }, [currentCharacter])

    if (!currentCharacter) {
        return <></>
    }

    const episodesGrid: UrlType[][] = createGrid({items: currentCharacter.episode, rowSize: 10})

    return (
        <>

            <div className={`${styles.background} + ${localIsShown ? styles.active : ''}`}
                 style={{
                     backgroundImage: `url(${theme === 'Light' ? popUpLight : popUpDark})`
                 }}
            >
            </div>

            <div className={`${styles.popUpContainer} + ${localIsShown ? styles.active : ''}`}
                 onClick={!isonPopUp ? onCloseClick : undefined}
            >
                <div className={`${styles.popUp} + ${colorStyles.popUp}`}
                     style={{transform: `rotate(${Math.random() * 3 - 1.5}deg)`}}
                     onMouseOver={onPopUpOver}
                     onMouseLeave={onPopUpLeave}
                >

                    <div className={`${styles.name} + ${colorStyles.name}`}>{currentCharacter.name}</div>

                    <div className={`${styles.close} + ${colorStyles.close}`}
                         onClick={onCloseClick}
                         title='Leave popup'
                    ><GiIcons.GiRocketFlight/></div>


                    <div className={styles.characterInfo}>

                        <img className={`${styles.image} + ${colorStyles.image}`} src={currentCharacter.image} alt=''/>

                        <div className={styles.info}>
                            <InfoItem property={'status'} value={currentCharacter['status']} isPopUp={true}/>
                            <InfoItem property={'species'} value={currentCharacter['species']} isPopUp={true}/>
                            <InfoItem property={'type'} value={currentCharacter['type']} isPopUp={true}/>
                            <InfoItem property={'gender'} value={currentCharacter['gender']} isPopUp={true}/>
                            <InfoItem property={'origin'} value={currentCharacter.origin['name']} isPopUp={true}/>
                            <InfoItem property={'location'} value={currentCharacter.location['name']} isPopUp={true}/>
                        </div>

                    </div>

                    <div className={`${styles.name} + ${colorStyles.name}`}>Episodes:</div>

                    <div className={styles.episodes}>
                        {episodesGrid.map((episodesRow, index) => {
                            return (
                                <div key={index} className={styles.episodesRow}>
                                    {episodesRow.map((episode, index) => <Episode
                                        key={index}
                                        link={episode}
                                    />)}
                                </div>
                            )
                        })}
                    </div>
                    <div className={`${styles.opacityBlock} + ${colorStyles.opacityBlock}`}></div>
                </div>

            </div>

        </>
    )
}

export default memo(PopUp)
