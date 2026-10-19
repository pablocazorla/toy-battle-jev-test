import React from "react";

const Table = ({
  reference,
}: {
  reference: React.RefObject<HTMLDivElement>;
}) => {
  return <div ref={reference} className="max-w-5xl min-h-52 mx-auto"></div>;
};

export default Table;
