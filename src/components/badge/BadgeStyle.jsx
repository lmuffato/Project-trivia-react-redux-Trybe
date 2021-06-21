import styled from 'styled-components';

const BadgeCustom = styled.div`
  color: var(--color-white);
  padding: 8px 0 8px 0;
  border-radius: 8px;
  display: flex;
  flex-flow: row;
  align-items: center;
  
  &.badge-primary > span:first-child {
    background-color: var(--color-primary);
  }

  &.badge-primary > span:last-child {
    background-color: var(--color-secondaryy);
  }

  &.badge-secondary > span:first-child {
    background-color: var(--color-secondary);
  }

  &.badge-secondary > span:last-child {
    background-color: var(--color-primary);
  }

  &.badge-primary-white > span:first-child {
    background-color: var(--color-primary);
  }
  
  &.badge-primary-white > span:last-child {
    background-color: var(--color-white);
    color: var(--color-primary);
  }
  
  span {
    padding: 8px 12px;
  }
  
  span:first-child {
    font-weight: 700;
    border-radius: 8px 0 0 8px;
    flex-basis: 130px;
    flex-grow: 0;
  }
  
  span:last-child {
    border-radius: 0 8px 8px 0;
    flex-grow: 1;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  
  i {
    margin-right: 8px;
  }

  &.exact {
    padding: 0;
  }
  
  &.exact > span {
    flex-basis: initial;
    flex-grow: 0;
  }
  
  &.small > span {
    font-size: 12px;
  }
  
  &.no-icon i {
    margin: 0;
  }
`;

export default BadgeCustom;
