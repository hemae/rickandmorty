import React, {FC} from 'react'
import loader from '../../../assets/loader.svg'


type LoaderPropsType = {
    size: number
}

const Loader: FC<LoaderPropsType> = ({size}) => {

    return (
        <div>
            <img src={loader} alt='Loader' style={{
                width: `${size}px`,
                height: `${size}px`,
            }}/>
        </div>
    )
}

export default Loader