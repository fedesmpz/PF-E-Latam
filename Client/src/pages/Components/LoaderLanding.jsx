import styles from "./Styles/LoaderLanding.module.css"
const LoaderLanding = () => {
  return (
    <div className={styles.videoContainer}>
    <video autoPlay muted loop className={styles.video}>
      <source src="/video/loaderLanding.mp4" type="video/mp4" />
    </video>
  </div>
  );
};

export default LoaderLanding;
