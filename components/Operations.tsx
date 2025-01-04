"use client";
import React from "react";
import { Button, ButtonGroup } from "@mui/material";

interface OperationsProps {
  onAddTotal: () => void;
  onFilter: () => void;
  onCombineColumns: () => void;
}

const Operations = ({
  onAddTotal,
  onFilter,
  onCombineColumns,
}: OperationsProps) => {
  return (
    <ButtonGroup variant="contained" className="space-x-2 mb-4">
      <Button onClick={onAddTotal}>Add Total Column</Button>
      <Button onClick={onFilter}>Filter Rows</Button>
      <Button onClick={onCombineColumns}>Combine Columns</Button>
    </ButtonGroup>
  );
};

export default Operations;
