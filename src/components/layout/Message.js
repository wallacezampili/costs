import styles from './Message.module.css'
import {useEffect, useState} from 'react';


function Message({type, text})
{
    const [visible, setVisibility] = useState();

    useEffect(() => 
    {
        if(!text)
        {
            setVisibility(false)
            return
        }

        setVisibility(true)
        const timer = setTimeout(() => {
            setVisibility(false)
            
        }, 3000)

        return () => {clearTimeout(timer)}

    }, [text])

    return(
        <>
        {visible && (
            <div className={`${styles.message} ${styles[type]}`}> {text}  </div>
        )}
        </>
    )
}
export default Message