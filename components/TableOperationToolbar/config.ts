export const predefinedOperationsOptions = [
  {
    label: "Add Column: Total",
    value: {
      id: 1,
      operationName: "columnSum",
      column1: "Price",
      column2: "Tax",
      newColumnName: "Total",
    },
  },
  {
    label: "Filter: Price > 127000",
    value: {
      id: 2,
      operationName: "filterRows",
      filterKey: "Price",
      filterValue: 127000,
      filterOperation: "gt",
    },
  },
  {
    label: "Filter rows where Tax > 32",
    value: {
      id: 3,
      operationName: "filterRows",
      filterKey: "Tax",
      filterValue: 32,
      filterOperation: "gt",
    },
  },
  {
    label: "Combine First and last name Columns into Full Name",
    value: {
      id: 4,
      operationName: "combineColumns",
      column1: "First Name",
      column2: "Last Name",
      newColumnName: "Full Name",
    },
  },
];

export const examplePreviews = {
  columnSum: {
    before: [{ Price: 100, Tax: 20 }],
    after: [{ Price: 100, Tax: 20, Total: 120 }],
  },
  filterRows: {
    before: [{ Price: 125000 }, { Price: 128000 }, { Price: 126000 }],
    after: [{ Price: 128000 }],
  },
  combineColumns: {
    before: [{ "First Name": "John", "Last Name": "Doe" }],
    after: [{ "Full Name": "John Doe" }],
  },
};
