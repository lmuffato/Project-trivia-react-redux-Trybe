import styled from 'styled-components';
import { cssVar, shade } from 'polished';

const SHADOW_DEFAULT = 0.1;
const SHADOW_DISABLED = 0.4;
const COLOR_PRIMARY = cssVar('--color-primary', '#204056').toString();
const COLOR_SECONDARY = cssVar('--color-secondary', '#F65A5B').toString();

const ButtonCustom = styled.button`
  padding: 12px 16px;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  margin-top: 8px;
  width: 100%;
  
  &:hover, &:active {
    background-color: ${shade(SHADOW_DEFAULT, COLOR_PRIMARY)};
    color: var(--color-white);
  }
  
  &.button-primary {
    background-color: var(--color-primary);
    color: var(--color-white);
  }

  &.button-primary:hover {
    background-color: ${shade(SHADOW_DEFAULT, COLOR_PRIMARY)};
  }

  &.button-primary:disabled {
    background-color: ${shade(SHADOW_DISABLED, COLOR_PRIMARY)};
  }

  &.button-outline-primary {
    background: var(--color-primary);
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
  }

  &.button-outline-primary:hover {
    color: ${shade(SHADOW_DEFAULT, COLOR_PRIMARY)};
  }

  &.button-outline-primary:disabled {
    color: ${shade(SHADOW_DISABLED, COLOR_PRIMARY)};
  }

  &.button-secondary {
    background-color: var(--color-secondary);
    color: var(--color-white);
    border: 1px solid var(--color-secondary);
  }

  &.button-secondary:hover {
    background-color: ${shade(SHADOW_DEFAULT, COLOR_SECONDARY)};
  }

  &.button-secondary:disabled {
    background-color: ${shade(SHADOW_DISABLED, COLOR_SECONDARY)};
  }

  &.button-outline-primary {
    background: transparent;
    color: var(--color-primary);
    border: 2px solid var(--color-primary);
  }

  &.button-outline-primary:hover {
    background-color: var(--color-primary);
    color: var(--color-white);
  }

  &.button-outline-primary:disabled {
    color: ${shade(SHADOW_DISABLED, COLOR_PRIMARY)};
  }

  &.button-outline-secondary {
    background: var(--color-primary);
    color: var(--color-secondary);
    border: 2px solid var(--color-secondary);
  }

  &.button-outline-secondary:hover {
    background-color: var(--color-secondary);
    color: var(--color-white);
  }

  &.button-outline-secondary:disabled {
    color: ${shade(SHADOW_DISABLED, COLOR_SECONDARY)};
  }
  
  &.rounded {
    width: initial;
    font-size: 1.25rem;
    margin: 0;
    border-radius: 50%;
  }
  
  &.border-incorrect {
    border: 3px solid red;
  }

  &.border-correct {
    border: 3px solid rgb(6, 240, 15);
  }
`;

export default ButtonCustom;
