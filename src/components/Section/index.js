import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  TreeDataState,
  CustomTreeData,
  SearchState,
   FilteringState,
     IntegratedFiltering,
       PagingState,
  IntegratedPaging,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableTreeColumn,
    TableFilterRow,
  ColumnChooser,
  SearchPanel,
  TableColumnVisibility,
  Toolbar,
    PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';


import {
  generateRows,
  defaultColumnValues,
} from './demo-data/generator';
// import { Sec } from './style';

const getChildRows = (row, rootRows) => (row ? row.items : rootRows);

export default function Section() {
  const [columns] = useState([
    { name: 'name', title: 'Name' },
    { name: 'gender', title: 'Gender' },
    { name: 'city', title: 'City' },
    { name: 'car', title: 'Car' },
    {name:'position',title:'Position'},
    {name:'usState',title:'USState'}
  ]);
  const [data] = useState(generateRows({
    columnValues: {
      ...defaultColumnValues,
      items: ({ random }) => (random() > 0.5
        ? generateRows({
          columnValues: {
            ...defaultColumnValues,
            items: () => (random() > 0.5
              ? generateRows({
                columnValues: {
                  ...defaultColumnValues,
                },
                length: Math.trunc(random() * 5) + 1,
                random,
              })
              : null),
          },
          length: Math.trunc(random() * 3) + 1,
          random,
        })
        : null),
    },
    length: 3,
  }));
  const [tableColumnExtensions] = useState([
    { columnName: 'name', width: 300 },
  ]);
  const [hiddenColumnNames, setHiddenColumnNames] = useState(['car']);
const [searchValue, setSearchState] = useState('');
const [pageSizes] = useState([5, 10, 15, 0]);  
return (
  <div>
    <Paper>
      <Grid
        rows={data}
        columns={columns}
      >
        <PagingState
          defaultCurrentPage={0}
          defaultPageSize={5}
        />
        <IntegratedPaging />
        <TreeDataState />
        <CustomTreeData
          getChildRows={getChildRows}
        />
        <SearchState
          value={searchValue}
          onValueChange={setSearchState}
        />
        <FilteringState defaultFilters={[]} />
        <IntegratedFiltering />
        <Table
          columnExtensions={tableColumnExtensions}
        />
        <TableHeaderRow />
        <TableFilterRow />
                <TableColumnVisibility
          hiddenColumnNames={hiddenColumnNames}
          onHiddenColumnNamesChange={setHiddenColumnNames}
        />
        <Toolbar />
        <SearchPanel />
        <ColumnChooser />
        <TableTreeColumn
          for="name"
        />
        <PagingPanel
          pageSizes={pageSizes}
        />
      </Grid>
    </Paper>
    </div>
  );
};
