import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Home from "./pages/Home";
import DonorPage from "./pages/DonorPage";
import HelpPage from './pages/HelpPage'; 
import StorageVolunteerPage from "./pages/StorageVolunteerPage";
import RewardsPage from './pages/RewardsPage';
import VolunteerPage from "./pages/VolunteerPage";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Layout from "./layouts/Layout";
import JoinPage from "./parts/register/JoinPage";
import LoginPage from "./parts/register/LoginPage";




// extending the Palette interface to include a custom color green in the theme
declare module '@mui/material/styles' {
  interface Palette {
    green: {
      "100": string;
      "200": string;
      "300": string;
      "400": string;
      "500": string;
    };
  }
  interface PaletteOptions {
    green?: {
      "100"?: string;
      "200"?: string;
      "300"?: string;
      "400"?: string;
      "500"?: string;
    };
  }
}

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["Montserrat","Roboto","Arial","sans-serif"].join(","),
      allVariants: {
        color: "#ffffff",
      },
    },
    palette: {
      mode: "dark",
      background: {
        default: "#000000",
        paper: "#121212",
      },
      primary: {
        main: "#77dd77",
      },
      secondary: {
        main: "#ffb347",
      },
      text: {
        primary: "#ffffff",
        secondary: "#b0b0b0",
      },
      green: {  // Add custom color here
        "100": "#eafaf4",
        "200":"#90CFB8",
        "300":"#57A588",
        "400":"#2C7A5E",
        "500":"#0F5038"
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: "#000000",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            color: "#77dd77",
            border: "1px solid #77dd77",
          },
          outlined: {
            borderColor: "#77dd77",
          },
        },
      },
    },
  });

  dayjs.extend(utc);
  dayjs.extend(timezone);

  dayjs.tz.setDefault("Asia/Singapore");

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="App">
          <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/storagevolunteer"
                  element={<StorageVolunteerPage />}
                />
                <Route
                  path="/donor"
                  element={<DonorPage donorId="Bread Talk" />}
                />
                <Route
                  path="/volunteer"
                  element={<VolunteerPage volunteerId="Bob" />}
                />
                <Route path="/rewards" element={<RewardsPage />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="/join" element={<JoinPage />} />
                <Route path="/login" element={<LoginPage />} /> 
            </Routes>
          </Router>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
