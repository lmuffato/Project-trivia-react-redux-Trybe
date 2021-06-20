import styled from 'styled-components';

const BadgeCustom = styled.div`
  color: var(--color-white);
  margin: 4px 0;
  padding: 8px 12px;
  border-radius: 8px;
  
  &.badge-primary {
    background-color: var(--color-primary);
  }

  &.badge-secondary {
    background-color: var(--color-secondary);
  }
  
  span:first-child {
    font-weight: 700;
  }
  
  span:last-child {
    margin-left: 6px;
  }
  
  i {
    margin-right: 6px;
  }
`;

export default BadgeCustom;
