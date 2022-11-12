import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'

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

export function Home() {

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>(
    {
      defaultValues: {
        task: '',
        minutesAmount: 0
      }
    }
)

  function handleCreateNewCycle(data: NewCycleFormData) {
    reset()
  }

  const task = watch('task')
  const isSubmitDiabled = !task

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
          <span>0</span>
          <span>0</span>
          <SeparatorContainer>:</SeparatorContainer>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDiabled} type="submit" >
          <Play size={24} /> 
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
