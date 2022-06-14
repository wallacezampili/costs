import styles from './Input.module.css'

function Input({name, type, placeholder, text, value, handleOnchange})
{
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input 
                type={type} 
                name={name}
                placeholder={placeholder}
                id={name}
                onChange={handleOnchange}
                value={value}
            />
        </div>
    )
}
export default Input