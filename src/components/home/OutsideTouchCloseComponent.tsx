import React, { useEffect, useRef, ReactNode } from "react";

interface OutsideTouchCloseComponentProps {
  children: ReactNode;
  toggleVisibility: () => void;
  style: string;
}

const OutsideTouchCloseComponent: React.FC<OutsideTouchCloseComponentProps> = ({
  children,
  toggleVisibility,
  style
}) => {
  const refForReference = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        refForReference.current &&
        !refForReference.current.contains(event.target as Node)
      ) {
        toggleVisibility();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleVisibility]);

  return (
    <div ref={refForReference} className={style}>
      {children}
    </div>
  );
};

export default OutsideTouchCloseComponent;
