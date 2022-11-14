import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { differenceInSeconds } from 'date-fns'

import { HandPalm, Play } from 'phosphor-react'

import 
{ 
  CountdownContainer, 
  FormContainer, 
  HomeContainer, 
  MinutesAmountInput, 
  SeparatorContainer, 
  StartCountdownButton,
  StopCountdownButton,
  TaskInput
} 
  from './styles'

  interface NewCycleFormData {
    task: string;
    minutesAmount: number;
  }

  interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    stopDate?: Date;
    finishedDate?: Date;
  }

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>(
    {
      defaultValues: {
        task: '',
        minutesAmount: 0
      }
    }
)

const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

const totalTimeAmountInSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

useEffect(() => {
  let interval: number;

  if (activeCycle) {
   interval = setInterval(() => {
    const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)
      if (secondsDifference >= totalTimeAmountInSeconds) {
        setCycles((state) => state.map(cycle => {
          if (cycle.id === activeCycleId) {
            return {...cycle, finishedDate: new Date()}
          } else {
            return cycle
          }
        }),
        )
        setAmountSecondsPassed(totalTimeAmountInSeconds)
        clearInterval(interval)
      } else {
      setAmountSecondsPassed(secondsDifference)
      }

    }, 1000)
  }

  return () => {
    clearInterval(interval);
  }
}, [activeCycle, totalTimeAmountInSeconds, activeCycleId])


  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())
    
    const newCycle: Cycle = {
      id: id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }
    setCycles((state) => [...cycles, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    reset()
  }

  function handleStopCycle () {
    setCycles((state) => state.map(cycle => {
      if (cycle.id === activeCycleId) {
        return {...cycle, stopDate: new Date()}
      } else {
        return cycle
      }
    }),
    )
    setActiveCycleId(null)
  }


  const currentTimeInSeconds = activeCycle ? totalTimeAmountInSeconds - amountSecondsPassed : 0;

  const calculateMinutesAmount = Math.floor(currentTimeInSeconds / 60);
  const calculateSecondsAmount = currentTimeInSeconds % 60;

  const minutesToShowInScreen = String(calculateMinutesAmount).padStart(2, '0');
  const secondsToShowInScreen = String(calculateSecondsAmount).padStart(2, '0');

  useEffect(() => {
    if(activeCycle){
    document.title = `${minutesToShowInScreen}:${secondsToShowInScreen}`
    }
  }, [minutesToShowInScreen, secondsToShowInScreen, activeCycle])

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">I'll be working in</label>
          <TaskInput 
            id="task" 
            list="task-suggestions" 
            placeholder="Name your project"
            disabled={!!activeCycle}
            {... register('task')}
          />

          <datalist id='task-suggestions'>
            <option value="Project 1" />
            <option value="Project 2" />
            <option value="Project 3" />
            <option value="Project 4" />
          </datalist>

          <label htmlFor="minutesAmount">during</label>
          <MinutesAmountInput 
            type="number" 
            id="minutesAmount" 
            placeholder="00" 
            step={5} 
            min={1} 
            max={60} 
            disabled={!!activeCycle}
            {...register('minutesAmount', {valueAsNumber: true})}
          />

          <span>minutes.</span>
        </FormContainer>
        <CountdownContainer>
          <span>{minutesToShowInScreen[0]}</span>
          <span>{minutesToShowInScreen[1]}</span>
          <SeparatorContainer>:</SeparatorContainer>
          <span>{secondsToShowInScreen[0]}</span>
          <span>{secondsToShowInScreen[1]}</span>
        </CountdownContainer>

        { activeCycle ? (
          <StopCountdownButton onClick={handleStopCycle} type="button" >
          <HandPalm size={24} /> 
          Stop
        </StopCountdownButton>
        ) :
        <StartCountdownButton disabled={isSubmitDisabled} type="submit" >
          <Play size={24} /> 
          Start
        </StartCountdownButton>
         }
      </form>
    </HomeContainer>
  )
}
