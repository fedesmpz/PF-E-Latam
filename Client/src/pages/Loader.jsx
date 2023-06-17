import Image from "next/image";
import style from "./styles/Loader/Loader.module.css";

const Loader = () => {
  return (
    <div>
      <div class={style.container}>
        <Image
          class={style.logoe}
          src="/assets/e-world.png"
          width={100}
          height={100}
          alt="Animación1"
        />
      </div>
      <div class={style.container2}>
        <Image
          class={style.logolam}
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
