import styled, { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonContainerProps {
  variant: ButtonVariant
}

const buttonVariants = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  success: 'green',
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  background-color: ${(props) => props.theme['green-500']};
  border: 0;
  border-radius: 4px;
  color: ${(props) => props.theme.white};
  height: 2.5rem;
  margin: 0.5rem;
  width: 6.25rem;

  /* ${(props) =>
    css`
      background-color: ${buttonVariants[props.variant]};
    `} */
`
