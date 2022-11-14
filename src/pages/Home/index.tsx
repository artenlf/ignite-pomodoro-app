import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { differenceInSeconds } from 'date-fns'

import { Play } from 'phosphor-react'

import 
{ 
  CountdownContainer, 
  FormContainer, 
  HomeContainer, 
  MinutesAmountInput, 
  SeparatorContainer, 
  StartCountdownButton,
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

useEffect(() => {
  let interval: number;

  if (activeCycle) {
   interval = setInterval(() => {
      setAmountSecondsPassed(differenceInSeconds
        (new Date(), activeCycle.startDate),
      )
    }, 1000)
  }

  return () => {
    clearInterval(interval);
  }
}, [activeCycle])

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


  const timeAmountInSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentTimeInSeconds = activeCycle ? timeAmountInSeconds - amountSecondsPassed : 0;

  const calculateMinutesAmount = Math.floor(currentTimeInSeconds / 60);
  const calculateSecondsAmount = currentTimeInSeconds % 60;

  const minutesToShowInScreen = String(calculateMinutesAmount).padStart(2, '0');
  const secondsToShowInScreen = String(calculateSecondsAmount).padStart(2, '0');


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
            min={5} 
            max={60} 
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

        <StartCountdownButton disabled={isSubmitDisabled} type="submit" >
          <Play size={24} /> 
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
