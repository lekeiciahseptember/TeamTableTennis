import * as React from "react";
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import TextFilter from "@cloudscape-design/components/text-filter";
import Header from "@cloudscape-design/components/header";
import Pagination from "@cloudscape-design/components/pagination";
import CollectionPreferences from "@cloudscape-design/components/collection-preferences";
import { useCollection } from "@cloudscape-design/collection-hooks";

export default function App() {
  const [selectedItems, setSelectedItems] = React.useState([{}]);
  const players = [
    {
      id: 0,
      name: "Liam",
      score: 11,
      wins: 1,
      losses: 1,
    },
    {
      id: 1,
      name: "Sivuyile",
      score: 5,
      wins: 0,
      losses: 0,
    },
    {
      id: 2,
      name: "Jarrod",
      score: "11",
      wins: 2,
      losses: 1,
    },
  ];
  const columnDefinitions = [
    {
      id: "name",
      header: "Name",
      cell: (item) => item.name,
      sortingField: "name",
      isRowHeader: true,
    },
    {
      id: "score",
      header: "Score",
      cell: (item) => item.score,
      sortingField: "alt",
    },
    {
      id: "wins",
      header: "Wins",
      cell: (item) => item.wins,
    },
    {
      id: "losses",
      header: "Losses",
      cell: (item) => item.losses,
    },
  ];
  const {
    items,
    actions,
    filteredItemsCount,
    collectionProps,
    filterProps,
    paginationProps,
  } = useCollection(players, {
    filtering: {
      empty: "No players at the moment.",
      noMatch: (
        <Button onClick={() => actions.setFiltering("")}>Clear Filter</Button>
      ),
    },
    pagination: { pageSize: players.length },
    sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
    selection: {},
  });
  return (
    <Table
      {...collectionProps}
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      selectedItems={selectedItems}
      ariaLabels={{
        selectionGroupLabel: "Items selection",
        allItemsSelectionLabel: ({ selectedItems }) =>
          `${selectedItems.length} ${
            selectedItems.length === 1 ? "item" : "items"
          } selected`,
        itemSelectionLabel: ({ selectedItems }, item) => item.name,
      }}
      columnDefinitions={columnDefinitions}
      columnDisplay={[
        { id: "name", visible: true },
        { id: "score", visible: true },
        { id: "wins", visible: true },
        { id: "losses", visible: true },
      ]}
      items={items}
      loadingText="Loading resources"
      selectionType="multi"
      trackBy="name"
      empty={
        <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No players by that name</b>
            <Button>Create resource</Button>
          </SpaceBetween>
        </Box>
      }
      filter={
        <TextFilter {...filterProps} filteringPlaceholder="Find resources" />
      }
      header={
        <Header
          counter={
            selectedItems.length ? "(" + selectedItems.length + "/10)" : "(10)"
          }
        >
          Table Tennis Leaderboard
        </Header>
      }
      pagination={
        <Pagination {...paginationProps} currentPageIndex={1} pagesCount={2} />
      }
    />
  );
}
