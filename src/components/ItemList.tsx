import React, { useState, useCallback, ReactElement, MouseEvent } from "react";
import { Collapse, List, ListItem, ListItemText } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

import { Item } from "../types";

// Memoize as the item properties will frequently remain constant while render
// may be called frequently.
export const ItemList = React.memo(({ items }: { items: Item[] }) => {
  const [open, setOpen] = useState<number[]>([]); // Stores the list of "open" listIds

  // A memoized callback is configured to reduce the number of allocations
  // required as we likely don't want to instantiate a new function every time
  // the componenet is rendered.
  const handleClick = useCallback(
    (event: MouseEvent) => {

      // Retrieve the listId stored on the element itself
      // (this allows us to have one function respond to N elements rather than having N fucntion bindings.)
      const listId = parseInt(
        event.currentTarget.getAttribute("data-list-id") || ""
      );

      // Filter out the id if it currently exists in the "open" list, otherwise append it
      if (listId) {
        if (open.includes(listId)) {
          setOpen(open.filter((id) => id !== listId));
        } else {
          setOpen(open.concat(listId));
        }
      }
    },
    [open]
  );

  // ListItem ReactElements for each item are grouped together by corresponding
  // listId following the natural order they appear in.
  const listItems: { [key: number]: ReactElement[] } = {};
  items.forEach((item: Item, index: number) => {
    if (!(item.listId in listItems)) {
      listItems[item.listId] = [];
    }
    listItems[item.listId].push(
      <ListItem button key={index}>
        <ListItemText
          primary={`List ID: ${item.listId} - ${item.name}`}
          secondary={`Item ID: ${item.id}`}
        />
      </ListItem>
    );
  });

  // Create the final nested list structure
  const groupedListItems: ReactElement[] = [];
  for (const key in listItems) {
    const listId = parseInt(key);

    // The list ids form the "outer" list to make jumping around the results
    // a bit more intuitive.
    groupedListItems.push(
      <ListItem
        button
        key={`list-item-${listId}`}
        data-list-id={listId}
        onClick={handleClick}
      >
        <ListItemText
          primary={`List ${listId} - ${listItems[key].length} Items`}
        />
        {open.includes(listId) ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
    );

    // The Collapse elements remain hidden until the user clicks on the
    // listId to expand it. These contain the sorted listItems.
    groupedListItems.push(
      <Collapse
        in={open.includes(listId)}
        key={`collapse-${listId}`}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" disablePadding>
          {listItems[key]}
        </List>
      </Collapse>
    );
  }

  return <List component="nav">{groupedListItems}</List>;
});
