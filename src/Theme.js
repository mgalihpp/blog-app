import { createTheme } from "@mui/material/styles";
import { darkScrollbar } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#fff",
      text: "#1A1A1B",
    },
    hover: "#000",
    toggle: "#ffffff",
    textfield: "#000",
  },
});
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#000",
      form: "#282828",
      text: "#E4E5E4",
    },
    hover: "#fff",
    toggle: "#4a4a4a",
    textfield: "#fff",
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
