import styled, { css } from 'styled-components';
import { cssVar, shade } from 'polished';

const SHADOW_DEFAULT = 0.1;
const COLOR_SECONDARY = cssVar('--color-secondary', '#F65A5B').toString();

const InputCustom = styled.div`
  background-color: var(--color-white);
  border: 2px solid var(--color-white);
  border-radius: 8px;
  width: 100%;
  padding-left: 16px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  i {
    font-size: 1.25rem;
    color: var(--color-primary);
  }
  
  input {
    background-color: transparent;
    color: var(--color-primary);
    flex: 1;
    border: 0;
    box-shadow: none;
    outline: none;
    padding: 16px;
  }
  
  input::placeholder {
    text-transform: capitalize;
  }

  ${(props) => props.isFocused && css`
    border: 2px solid var(--color-primary);

    i {
      color: ${shade(SHADOW_DEFAULT, COLOR_SECONDARY)};
    }
  `}
`;

export default InputCustom;
