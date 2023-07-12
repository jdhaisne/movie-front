import React from "react";

export const MButton = ({
  children,
  onClick,
  className,
}: {
  children?: React.ReactNode;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <>
      <button className={`mbutton ${className}`} onClick={onClick}>
        {children}
      </button>
    </>
  );
};
