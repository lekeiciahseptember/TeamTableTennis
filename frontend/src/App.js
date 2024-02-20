import React, { useEffect, useState } from "react";
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import TextFilter from "@cloudscape-design/components/text-filter";
import Header from "@cloudscape-design/components/header";
import Pagination from "@cloudscape-design/components/pagination";
import { useCollection } from "@cloudscape-design/collection-hooks";

export default function App() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        let res = await fetch("http://localhost:5000/api");
        let data = await res.json();
        console.log("Fetched players:", data);
        setPlayers(data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, []);

  console.log(players);

  const [selectedItems, setSelectedItems] = React.useState([]);

  const columnDefinitions = [
    {
      id: "name",
      header: "Name",
      cell: (item) => item.name,
      sortingField: "name",
      isRowHeader: true,
    },
    {
      id: "points",
      header: "Points",
      cell: (item) => item.points,
      sortingField: "alt",
    },
    {
      id: "wins",
      header: "Wins",
      cell: (item) => item.wins,
    },
    {
      id: "loses",
      header: "Loses",
      cell: (item) => item.loses,
    },
  ];

  const { items, actions, collectionProps, filterProps, paginationProps } =
    useCollection(players, {
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
        { id: "points", visible: true },
        { id: "wins", visible: true },
        { id: "loses", visible: true },
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
            selectedItems.length ? `(${selectedItems.length}/10)` : "(10)"
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
