import React from "react";
import "./MSelect.css";

export const Mselect = ({
  children,
  name,
  validation,
}: {
  children: React.ReactNode;
  validation: any;
  name: string;
}) => {
  return <select className="select">{children}</select>;
};
