
import styles from '../styles/Services.module.css';
function Services(props){

   return(
      <div onClick={props.onClick} className={styles.services}>
        <img className={styles.image} src={props.image} alt="" />
        <h2 className={styles.title} style={{color:'#1A2258'}}>{props.title}</h2>
      </div>
   )
}
export default Services