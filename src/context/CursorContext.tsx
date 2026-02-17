import React, { createContext, useContext, useState, type RefObject } from 'react';

type HoverState = 'default' | 'text' | 'button' | 'card' | 'magnetic';

interface CursorContextType {
  hoverState: HoverState;
  setHoverState: (state: HoverState) => void;
  magneticTarget: RefObject<HTMLElement | null> | null;
  setMagneticTarget: (target: RefObject<HTMLElement | null> | null) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hoverState, setHoverState] = useState<HoverState>('default');
  const [magneticTarget, setMagneticTarget] = useState<RefObject<HTMLElement | null> | null>(null);

  return (
    <CursorContext.Provider value={{ hoverState, setHoverState, magneticTarget, setMagneticTarget }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) throw new Error('useCursor must be used within CursorProvider');
  return context;
};
