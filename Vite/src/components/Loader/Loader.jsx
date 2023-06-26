import style from "./Loader.module.css";

const Loader = () => {
  return (
    <div className="d-flex items-center justify-center">
      <div className={style.container}>
        <img
          className={style.logoe}
          src="/assets/e-world.png"
          width={100}
          height={100}
          alt="Animación1"
        />
      </div>
      <div className={style.container2}>
        <img
          className={style.logolam}
          src="/assets/latam-store.png"
          width={100}
          height={100}
          alt="Animación2"
        />
      </div>
    </div>
  );
};

export default Loader;
