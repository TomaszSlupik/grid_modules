import { styled } from "@mui/system";

const Mycard = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    minWidth: "220px",
    minHeight: "200px",
    marginTop: "0.8em",
  },
  [theme.breakpoints.up("sm")]: {
    minWidth: "220px",
    minHeight: "200px",
    marginTop: "0.8em",
  },
  [theme.breakpoints.up("md")]: {
    minWidth: "220px",
    minHeight: "200px",
    marginTop: "0.8em",
    // margin: "0.8em 0.8em",
  },
  [theme.breakpoints.up("lg")]: {
    minWidth: "220px",
    minHeight: "200px",
    marginTop: "0.8em",
    // margin: "0.8em 0.8em",
  },
}));

export default Mycard;
