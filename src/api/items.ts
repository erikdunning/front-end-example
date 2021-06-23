import { Item } from "../types";

// Fetches the item url and processes the results.
export async function listItems(url: string): Promise<Item[]> {
  const resp = await fetch(url);
  const items = await resp.json();
  const filteredItems = filterItemsByName(items);
  const filteredAndSortedItems = sortItemsByListIdThenName(filteredItems);
  return filteredAndSortedItems;
}

// Sorts the list if items by listId and then their name using a memory inefficient, but
// simple to follow sorting mechanism.
function sortItemsByListIdThenName(items: Item[]) {
  // A temporary object structure to represent the unique set of listIds and items.
  const sortedLists: { [key: number]: Item[] } = [];

  // Compute the properties for the object.
  for (const item of items) {
    if (sortedLists[item.listId]) {
      sortedLists[item.listId].push(item);
    } else {
      sortedLists[item.listId] = [item];
    }
  }

  // Sort the array of objects using the computedName to give a natural sorting order
  // while respecting both values, in order.
  let sortedItems: Item[] = [];
  const listIds: string[] = Object.keys(sortedLists).sort();
  listIds.forEach((listId) => {
    const sortedList = sortedLists[parseInt(listId)];
    sortedItems = sortedItems.concat(
      sortedList.sort((a, b) => {
        return (a.id < b.id)
          ? -1
          : (a.id > b.id)
          ? 1
          : 0
      })
    );
  });

  return sortedItems;
}

// Removes items by examining the name field and excluding those with "" or null values.
function filterItemsByName(items: Item[], nameFilters = ["", null]) {
  return items.filter((item: Item) => !nameFilters.includes(item.name));
}
