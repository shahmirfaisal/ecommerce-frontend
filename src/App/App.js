import { useEffect } from "react";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";
import { Route, Switch, useHistory } from "react-router-dom";
import { setHistory } from "../utils";
import { NotificationContainer } from "react-notifications";
import { appRoutes } from "../routes/appRoutes";
import { Footer } from "../components/Footer/";

export const App = () => {
  const theme = createMuiTheme({
    typography: {
      fontFamily: "Josefin Sans, sans-serif",
    },
    palette: {
      primary: {
        main: "#3399FF",
      },
      secondary: {
        main: "#EF837B",
      },
    },
  });

  const history = useHistory();

  // Initializing the history object so that we can use it in redux
  useEffect(() => setHistory(history), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        {appRoutes.map((route) => (
          <Route {...route} />
        ))}
      </Switch>
      <Footer />
      <NotificationContainer />
    </ThemeProvider>
  );
};
