import styles from './footer.module.css'

const Footer = () => {
    return (
      <div className={styles.footer}>
    
        <p>made by <a href="https://andrame.be" className={styles.link}>andrame.be</a></p>
      </div>
    );
  };
  
  export default Footer;