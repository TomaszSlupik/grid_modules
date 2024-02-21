import { styled } from "@mui/system";

const Searchinput = styled("input")(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    width: "100%",
    borderRadius: "8px",
    marginLeft: "7.8em",
    [theme.breakpoints.up("xs")]: {
      width: "12.5ch",
      "&:focus": {
        width: "20ch",
      },
    },
    transition: "0.3s all",
    border: "1px solid #21415b",
    height: "2.5rem",
  },
  [theme.breakpoints.up("sm")]: {
    width: "100%",
    borderRadius: "8px",
    [theme.breakpoints.up("sm")]: {
      width: "40ch",
      "&:focus": {
        width: "50ch",
      },
    },
    transition: "0.3s all",
    border: "1px solid #21415b",
    height: "2.5rem",
  },
  [theme.breakpoints.up("md")]: {
    [theme.breakpoints.up("md")]: {
      width: "40ch",
      "&:focus": {
        width: "60ch",
      },
    },
    transition: "0.3s all",
  },
  [theme.breakpoints.up("lg")]: {
    [theme.breakpoints.up("lg")]: {
      width: "60ch",
      "&:focus": {
        width: "80ch",
      },
    },
    transition: "0.3s all",
  },
}));

export default Searchinput;
