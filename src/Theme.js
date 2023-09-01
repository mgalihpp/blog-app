import { createTheme } from "@mui/material/styles";
import { darkScrollbar } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#fff",
    },
    hover: "#000",
    toggle: "#ffffff",
  },
});
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#000",
      form: "#282828",
    },
    hover: "#fff",
    toggle: "#4a4a4a",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: themeParam.palette.mode === "dark" ? darkScrollbar() : null,
      }),
    },
  },
});

export { lightTheme, darkTheme };
