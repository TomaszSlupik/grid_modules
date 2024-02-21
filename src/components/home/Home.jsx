import React, { useState, useEffect } from "react";
import themeColor from "../../theme/themeColor";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Card, ThemeProvider } from "@mui/material";
import Mycard from "../../style/mymuistyle/mycard";
import Searchinput from "../../style/mymuistyle/searchinput";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import Nomenclature from "../../data/Nomenclature.json";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import './Home.scss'

export default function Home() {
  // Stany
  const [inputState, setInputState] = useState("");
  const [nomenclature, setNomenclature] = useState([]);
  const [originalNomenclature, setOriginalNomenclature] = useState([]);

  useEffect(() => {
    setNomenclature(Nomenclature);
    setOriginalNomenclature(Nomenclature);
  }, []);

  // Wyszkuiwarka
  const handlerInputSearch = (e) => {
    setInputState(e.target.value);
    searchData(e.target.value);
  };

  const resetSearch = () => {
    setInputState("");
    setNomenclature(Nomenclature);
  };

  const backToAllData = (e) => {
    if (e.key === "Backspace") {
      resetSearch();
    }
  };

  const searchData = (input) => {
    const filterData = nomenclature.filter((el) =>
      el.title.toLowerCase().includes(input.toLowerCase()),
    );
    setNomenclature(filterData);
  };

  const style = {
    grid: { alignItems: "center", display: "flex", justifyContent: "center" },
    card: { height: "150px", position: "relative" },
    label: { color: "#fff" },
    radioGroup: { color: "#7c5fe9" },
    trophy: { marginLeft: "0.2em", color: "#faaf00" },
    filter: {
      color: "#7c5fe9",
      cursor: "pointer",
      fontSize: "2rem",
      marginLeft: "0.4em",
    },
    sort: { textAlign: "left" },
  };

  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: "relative",
    height: 150,
    [theme.breakpoints.down("sm")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &.Mui-focusVisible": {
      zIndex: 1,
      "& .MuiImageBackdrop-root": {
        opacity: 0.15,
      },
      "& .MuiImageMarked-root": {
        opacity: 0,
      },
      "& .MuiTypography-root": {
        border: "4px solid currentColor",
      },
    },
  }));

  const ImageSrc = styled("span")({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  });

  const Image = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  }));

  const ImageBackdrop = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  }));

  const ImageMarked = styled("span")(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  }));

  return (
    <div className="home">
       <div>
         Wybierz moduł, 
         <br />
         który Cię interesuje
         
       </div>
       
      <div>
        <ThemeProvider theme={themeColor}>
          <Searchinput
            onKeyDown={backToAllData}
            value={inputState}
            onChange={handlerInputSearch}
            placeholder="Szukaj modułu"
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </ThemeProvider>
      </div>
      <div className="home__box">
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            style={style.grid}
          >
            <ThemeProvider theme={{ themeColor }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                style={style.grid}
              >
                {nomenclature.map((image) => (
                  <Grid key={image.id} item xs={12} sm={6} md={4}>
                    <Mycard>
                      <Card style={style.card}>
                        <Link to={image.path}>
                          <ImageButton
                            focusRipple
                            key={image.title}
                            style={{
                              width: image.width,
                            }}
                          >
                            <ImageSrc
                              style={{ backgroundImage: `url(${image.url})` }}
                            />
                            <ImageBackdrop className="MuiImageBackdrop-root" />
                            <Image>
                              <Typography
                                component="span"
                                variant="subtitle1"
                                color="inherit"
                                sx={{
                                  position: "relative",
                                  p: 4,
                                  pt: 2,
                                  pb: (theme) =>
                                    `calc(${theme.spacing(1)} + 6px)`,
                                }}
                              >
                                {image.title}
                                <ImageMarked className="MuiImageMarked-root" />
                              </Typography>
                            </Image>
                          </ImageButton>
                        </Link>
                      </Card>
                    </Mycard>
                  </Grid>
                ))}
              </Grid>
            </ThemeProvider>
          </Grid>
        </Box>
      </div>
    </div>
  );
}
