
import styles from '../styles/Services.module.css';
function Services(props){

   return(
      <div className={styles.services}>
        <img className={styles.image} src={props.image} alt="" />
        <h2 className={styles.title}>jeke</h2>
        <p className="description">jekedido</p>
      </div>
   )
}
export default Services