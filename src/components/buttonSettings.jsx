import * as React from 'react';
import { useLayer, Arrow } from 'react-laag';
import Settings from '../services/Settings';

export default function Tooltip() {
  const [isOpen, setOpen] = React.useState(false);

  const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
    isOpen,
    placement: 'right-start',
    triggerOffset: 50,
    arrowOffset: 8,
    containerOffset: 5,
    onOutsideClick: () => setOpen(false),
  });

  return (
    <>
      <button
        type="button"
        display="none"
        className="btnSettings"
        data-testid="btn-settings"
        { ...triggerProps }
        onClick={ () => setOpen(!isOpen) }
      >
        <img src="https://icongr.am/fontawesome/cog.svg?size=40&color=427d6c" alt="Settings" />
      </button>
      {isOpen
        && renderLayer(
          <div
            { ...layerProps }
            className="tooltip"
          >
            <div>
              <h1 data-testid="settings-title">Configurações</h1>
              <Settings />
            </div>
            <Arrow { ...arrowProps } size={ 15 } roundness={ 0 } />
          </div>,
        )}
    </>
  );
}
