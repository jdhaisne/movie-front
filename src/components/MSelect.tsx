import React from "react";

export const Mselect = ({
  children,
  name,
  validation,
}: {
  children: React.ReactNode;
  validation: any;
  name: string;
}) => {
  return <select>{children}</select>;
};
