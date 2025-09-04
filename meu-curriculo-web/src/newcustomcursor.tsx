
import React, { useReducer, useEffect } from 'react';

interface Ripple {
  id: string;
  x: number;
  y: number;
}

interface ClickRipple {
  id: string;
  x: number;
  y: number;
}

interface RippleCursorProps {
  maxSize?: number;
  duration?: number;
  blur?: boolean;
}

type RippleState = Ripple[];
type ClickRippleState = ClickRipple[];

type RippleAction =
  | { type: 'ADD_RIPPLE'; payload: Ripple }
  | { type: 'REMOVE_RIPPLE'; payload: string };

type ClickRippleAction =
  | { type: 'ADD_CLICK_RIPPLE'; payload: ClickRipple }
  | { type: 'REMOVE_CLICK_RIPPLE'; payload: string };

const rippleReducer = (
  state: RippleState,
  action: RippleAction
): RippleState => {
  switch (action.type) {
    case 'ADD_RIPPLE':
      return [...state, action.payload].slice(-30);
    case 'REMOVE_RIPPLE':
      return state.filter((ripple) => ripple.id !== action.payload);
    default:
      return state;
  }
};

const clickRippleReducer = (
  state: ClickRippleState,
  action: ClickRippleAction
): ClickRippleState => {
  switch (action.type) {
    case 'ADD_CLICK_RIPPLE':
      return [...state, action.payload].slice(-10);
    case 'REMOVE_CLICK_RIPPLE':
      return state.filter((ripple) => ripple.id !== action.payload);
    default:
      return state;
  }
};

export const Novocursorv2: React.FC<RippleCursorProps> = ({
  maxSize = 50,
  duration = 1000,
  blur = true,
}) => {
  const [ripples, dispatch] = useReducer(rippleReducer, []);
  const [clickRipples, dispatchClick] = useReducer(clickRippleReducer, []);

  const handleMouseMove = (e: MouseEvent): void => {
    const ripple: Ripple = {
      id: `${Date.now()}-${Math.random()}`,
      x: e.clientX,
      y: e.clientY,
    };

    dispatch({ type: 'ADD_RIPPLE', payload: ripple });

    setTimeout(() => {
      dispatch({ type: 'REMOVE_RIPPLE', payload: ripple.id });
    }, duration);
  };

  const handleClick = (e: MouseEvent): void => {
    const clickRipple: ClickRipple = {
      id: `click-${Date.now()}-${Math.random()}`,
      x: e.clientX,
      y: e.clientY,
    };

    dispatchClick({ type: 'ADD_CLICK_RIPPLE', payload: clickRipple });

    setTimeout(() => {
      dispatchClick({ type: 'REMOVE_CLICK_RIPPLE', payload: clickRipple.id });
    }, duration * 1.5);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [duration]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: 50,
      overflow: 'hidden'
    }}>
      {/* Ripples de movimento do mouse */}
      {ripples.map((ripple, index) => (
        <div
          key={ripple.id}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 229, 255, 0.8)',
            boxShadow: '0 0 15px rgba(0, 229, 255, 0.9), 0 0 30px rgba(0, 229, 255, 0.6)',
            left: `${ripple.x - maxSize/2}px`,
            top: `${ripple.y - maxSize/2}px`,
            width: `${maxSize}px`,
            height: `${maxSize}px`,
            filter: blur ? 'blur(2px)' : 'none',
            transform: 'scale(0)',
            opacity: 1,
            transition: `all ${duration}ms ease-out`,
            animation: `rippleExpand ${duration}ms ease-out forwards`
          }}
        />
      ))}

      {/* Ripples de clique - maiores e mais dramáticos */}
      {clickRipples.map((clickRipple, index) => (
        <div
          key={clickRipple.id}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0 0 25px rgba(255, 255, 255, 1), 0 0 50px rgba(0, 229, 255, 0.8), 0 0 75px rgba(0, 229, 255, 0.4)',
            left: `${clickRipple.x - maxSize * 1.5}px`,
            top: `${clickRipple.y - maxSize * 1.5}px`,
            width: `${maxSize * 3}px`,
            height: `${maxSize * 3}px`,
            filter: blur ? 'blur(1px)' : 'none',
            transform: 'scale(0)',
            opacity: 1,
            transition: `all ${duration * 1.5}ms ease-out`,
            animation: `clickRippleExpand ${duration * 1}ms ease-out forwards`
          }}
        />
      ))}

      <style>
        {`
          @keyframes rippleExpand {
            0% {
              transform: scale(0);
              opacity: 1;
            }
            100% {
              transform: scale(1);
              opacity: 0;
            }
          }
          
          @keyframes clickRippleExpand {
            0% {
              transform: scale(0);
              opacity: 1;
            }
            50% {
              opacity: 0.8;
            }
            100% {
              transform: scale(1.5);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};
