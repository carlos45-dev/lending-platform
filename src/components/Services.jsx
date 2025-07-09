
import styles from '../styles/Services.module.css';
function Services(props){

   return(
      <div className={styles.services}>
        <img className={styles.image} src={props.image} alt="" />
        <h2 className={styles.title}>{props.title}</h2>
      </div>
   )
}
export default Services