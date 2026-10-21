import {Lottie} from "lottie-react";

export const ShowHappyDogAnimation = () => (
  <Lottie
    src={"/happydog.json"}
    autoplay={true}
    loop={false}
    style={{ width: 220, height: 220 }}
  />
);
