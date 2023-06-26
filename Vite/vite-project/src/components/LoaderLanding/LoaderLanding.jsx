import styles from "../LoaderLanding/LoaderLanding.module.css"

const LoaderLanding = () => {
  return (
    <div className={styles.videoContainer}>
    <video autoPlay muted loop className={styles.video}>
      <source src="components/multimedia/video/loaderLanding.mp4" type="video/mp4" />
    </video>
  </div>
  );
};

export default LoaderLanding;
