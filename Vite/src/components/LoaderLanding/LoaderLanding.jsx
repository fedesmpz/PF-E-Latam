import styles from "./LoaderLanding.module.css"

const LoaderLanding = () => {
  return (
    <div className={styles.videoContainer}>
      <video autoPlay muted loop className={styles.video}>
        <source src="videos/loaderLanding.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default LoaderLanding;
