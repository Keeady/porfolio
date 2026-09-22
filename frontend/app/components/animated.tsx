import {Lottie} from "lottie-react";

export const ShowHappyDogAnimation = () => (
  <Lottie
    src={"/happydog.json"}
    autoplay={true}
    loop={true}
    style={{ width: 220, height: 220 }}
  />
);
