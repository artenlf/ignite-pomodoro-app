import { differenceInSeconds } from "date-fns";
import { useEffect, useContext } from "react";
import { CountdownContainer, SeparatorContainer } from "./styles";
import { CyclesContext } from "../../../../contexts/CyclesContext";

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  } = useContext(CyclesContext);

  const totalTimeAmountInSeconds = activeCycle
    ? activeCycle.minutesAmount * 60
    : 0;

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startedDate)
        );
        if (secondsDifference >= totalTimeAmountInSeconds) {
          markCurrentCycleAsFinished();
          setSecondsPassed(totalTimeAmountInSeconds);
          clearInterval(interval);
        } else {
          setSecondsPassed(secondsDifference);
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
    setSecondsPassed,
  ]);

  const currentTimeInSeconds = activeCycle
    ? totalTimeAmountInSeconds - amountSecondsPassed
    : 0;

  const calculateMinutesAmount = Math.floor(currentTimeInSeconds / 60);
  const calculateSecondsAmount = currentTimeInSeconds % 60;

  const minutes = String(calculateMinutesAmount).padStart(2, "0");
  const seconds = String(calculateSecondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <SeparatorContainer>:</SeparatorContainer>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}
