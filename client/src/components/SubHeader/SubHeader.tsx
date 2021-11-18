import React, {FC, memo, useEffect, useState} from 'react'
import styles from './SubHeader.module.css'
import {useAppSelector} from '../../redux/hooks/redux'
import image1 from '../../assets/subheader_1.jpeg'
import image2 from '../../assets/subheader_2.jpeg'
import image3 from '../../assets/subheader_3.jpeg'
import image4 from '../../assets/subheader_4.jpeg'
import image5 from '../../assets/subheader_5.jpeg'
import image6 from '../../assets/subheader_6.jpeg'
import image7 from '../../assets/subheader_7.jpeg'
import image8 from '../../assets/subheader_8.jpeg'
import useWindowDimensions from '../../hooks/useWindowDimensions'


const images = [image1, image2, image3, image4, image5, image6, image7, image8]

const SubHeader: FC = () => {

    const {theme} = useAppSelector(state => state.settingsReducer)
    const {width} = useWindowDimensions()

    const colorStyles = require(`./SubHeader${theme}.module.css`)

    const [currentImageNumber, setCurrentImageNumber] = useState<number>(0)
    const [height, setHeight] = useState<number>(width * 500 / 1440)

    useEffect(() => {
        setHeight(width * 500 / 1440)
    }, [width])

    useEffect(() => {
        setTimeout(() => {
            if (currentImageNumber < images.length - 1) {
                setCurrentImageNumber(prev => prev += 1)
            } else {
                setCurrentImageNumber(0)
            }
        }, 6000)
    }, [currentImageNumber])

    return (
        <div
            className={`${styles.subHeader} + ${colorStyles.subHeader}`}
            style={{
                backgroundImage: `url(${images[currentImageNumber]})`,
                height: `${height}px`
            }}
        >
        </div>
    )
}

export default memo(SubHeader)
