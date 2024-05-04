export const tokens = {
    grey: {
      300: "#000000", //text
      700: "#ced3dc", // menu-text
    },
    primary: {
      500: "#4e8098", //plus
      900: "#043028", //menu
    },
    secondary: {
      500: "#4e8098", //items found
    },
    tertiary: {
      500: "#8884d8",
    },
    background: {
      light: "#ced3dc",
      main: "#4e8098", //table-header
    },
  };
  
  // mui theme settings
  export const themeSettings = {
    palette: {
      primary: {
        ...tokens.primary,
        main: tokens.primary[500],
        light: tokens.primary[900],
      },
      secondary: {
        ...tokens.secondary,
        main: tokens.secondary[500],
      },
      tertiary: {
        ...tokens.tertiary,
      },
      grey: {
        ...tokens.grey,
        main: tokens.grey[300],
      },
      background: {
        default: tokens.background.main,
        light: tokens.background.light,
      },
    },
    typography: {
      fontFamily: ["Red Hat Display", "sans-serif"].join(","),
      fontSize: 14,
      h1: {
        fontFamily: ["Red Hat Display", "sans-serif"].join(","),
        fontSize: 32,
      },
      h2: {
        fontFamily: ["Red Hat Display", "sans-serif"].join(","),
        fontSize: 24,
      },
      h3: {
        fontFamily: ["Red Hat Display", "sans-serif"].join(","),
        fontSize: 20,
        fontWeight: 800,
        color: tokens.grey[300],
      },
      h4: {
        fontFamily: ["Red Hat Display", "sans-serif"].join(","),
        fontSize: 14,
        fontWeight: 600,
        color: tokens.grey[300],
      },
      h5: {
        fontFamily: ["Red Hat Display", "sans-serif"].join(","),
        fontSize: 14,
        fontWeight: 400,
        color: tokens.grey[300],
      },
      h6: {
        fontFamily: ["Red Hat Display", "sans-serif"].join(","),
        fontSize: 12,
        color: tokens.grey[700],
      },
    },
  };