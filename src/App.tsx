import React from "react";
import { Container, Typography, CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { ItemList } from "./components";
import { useItemList } from "./hooks";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  // Loads the item list using a React hook from an arbitrary location using an async fetch request.
  const items = useItemList(
    "https://fetch-hiring.s3.amazonaws.com/hiring.json"
  );

  // Some simple formatting boilerplate to make it look nicer.
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography
          variant="h4"
          color="textPrimary"
          component="h1"
          gutterBottom
        >
          Front-End Example
        </Typography>
        <ItemList items={items} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
