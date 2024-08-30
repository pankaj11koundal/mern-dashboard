import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { useGetListQuery } from "state/api";

const List = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetListQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    { field: "insight", headerName: "Title", width: 250 },
    { field: "topic", headerName: "Topics", width: 100 },
    { field: "region", headerName: "Region", width: 110 },
    { field: "country", headerName: "Country", width: 160 },
    { field: "published", headerName: "Year", width: 200 },
    { field: "intensity", headerName: "Intensity", width: 100 },
    { field: "relevance", headerName: "Relevance", width: 100 },
    { field: "likelihood", headerName: "Likelihood", width: 100 },
  ];

  return (
    <Box m="1.5rem 0.5rem">
      <Header title="List" subTitle="Entire list of news" />
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.list) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          pageSizeOptions={[25, 50, 100]}
          pagination
          paginationMode="server"
          sortingMode="server"
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={(newPaginationModel) => {
            setPage(newPaginationModel.page);
            setPageSize(newPaginationModel.pageSize);
          }}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          slots={{ toolbar: DataGridCustomToolbar }}
          slotProps={{
            toolbar: { searchInput, setSearch, setSearchInput },
          }}
        />
      </Box>
    </Box>
  );
};

export default List;
