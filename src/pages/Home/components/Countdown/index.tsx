import { differenceInSeconds } from "date-fns";
import { useEffect, useState, useContext } from "react";
import { CountdownContainer, SeparatorContainer } from "./styles";
import { CyclesContext } from "../../index";

export function Countdown() {
  const { activeCycle, activeCycleId, markCurrentCycleAsFinished } =
    useContext(CyclesContext);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const totalTimeAmountInSeconds = activeCycle
    ? activeCycle.minutesAmount * 60
    : 0;

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );
        if (secondsDifference >= totalTimeAmountInSeconds) {
          markCurrentCycleAsFinished();
          setAmountSecondsPassed(totalTimeAmountInSeconds);
          clearInterval(interval);
        } else {
          setAmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    activeCycle,
    totalTimeAmountInSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
  ]);

  const currentTimeInSeconds = activeCycle
    ? totalTimeAmountInSeconds - amountSecondsPassed
    : 0;

  const calculateMinutesAmount = Math.floor(currentTimeInSeconds / 60);
  const calculateSecondsAmount = currentTimeInSeconds % 60;

  const minutesToShowInScreen = String(calculateMinutesAmount).padStart(2, "0");
  const secondsToShowInScreen = String(calculateSecondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutesToShowInScreen}:${secondsToShowInScreen}`;
    }
  }, [minutesToShowInScreen, secondsToShowInScreen, activeCycle]);

  return (
    <CountdownContainer>
      <span>{minutesToShowInScreen[0]}</span>
      <span>{minutesToShowInScreen[1]}</span>
      <SeparatorContainer>:</SeparatorContainer>
      <span>{secondsToShowInScreen[0]}</span>
      <span>{secondsToShowInScreen[1]}</span>
    </CountdownContainer>
  );
}
