import { useState, useEffect } from "react";
import { Item } from "../types";
import { listItems } from "../api";

export function useItemList(url: string) {
  const [itemList, setItemList] = useState<Item[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const items = await listItems(url);
        setItemList(items);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [url]);

  return itemList;
}
