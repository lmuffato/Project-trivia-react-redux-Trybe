import React from 'react';
import { useLayer, useHover, Arrow } from 'react-laag';

function ConfigButton() {
  const [isOver, hoverProps] = useHover();

  const {
    triggerProps,
    layerProps,
    arrowProps,
    renderLayer,
  } = useLayer({
    isOpen: isOver,
  });

  return (
    <>
      <span { ...triggerProps } { ...hoverProps }>
        oi
      </span>
      {isOver
        && renderLayer(
          <div className="tooltip" { ...layerProps }>
            oi
            <Arrow { ...arrowProps } />
          </div>,
        )}
    </>
  );
}

export default ConfigButton;
