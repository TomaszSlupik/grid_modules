import React, { useEffect } from "react";
import "./Loginuser.scss";
import { Button, Paper, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import { FormattedMessage } from "react-intl";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Loginuser() {
  const [userStatus, setUserStatus] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [typedLogin, setTypedLogin] = useState("");
  const [addError, setAddError] = useState(false);
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Przekierowanie użytkownika
  const navigate = useNavigate("/");

  const goToMain = async () => {
    setLogin(typedLogin);
    await checkUserInDatabase(typedLogin, password);
  };

  const goToUserInDatabase = () => {
    navigate("/module");
  };

  const goToFreeUser = () => {
    setLogin("gość");
    localStorage.setItem("email", "gość");
    localStorage.setItem("token", "gość");
    navigate("/module");
  };

  // Pobranie danych  o uzytkowniku
  const checkUserInDatabase = async (login, password) => {
    try {
      const response = await fetch("http://localhost:5000/user");
      if (response.ok) {
        const data = await response.json();
        const user = data.find(
          (user) => user.name_email === login && user.value === password,
        );
        if (user) {
          console.log("Użytkownik istnieje w bazie danych.");
          updateUserStatus(user.id, login, password, user.token, userStatus); // Aktualizacja statusu użytkownika
          goToUserInDatabase(); // Przekieruj do strony głównej
        } else {
          setLogin("");
          setTypedLogin("");
          console.log("Użytkownik nie istnieje w bazie danych.");
          setAddError(true);
          setTimeout(() => {
            setAddError(false);
          }, 1500);
        }
      } else {
        console.error("Odpowiedź serwera nie jest OK.");
      }
    } catch (error) {
      console.error("Wystąpił błąd podczas żądania do serwera.", error);
    }
  };

  // Czy użytkownik zalogowany - zmiana statusu
  const updateUserStatus = async (
    userId,
    login,
    password,
    token,
    userStatus,
  ) => {
    try {
      const res = await fetch(`http://localhost:5000/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
          name_email: login,
          value: password,
          token: token,
          login_status: userStatus,
        }),
      });
      if (res.ok) {
        console.log("Edycja nastąpiła poprawnie do bazy");
        localStorage.setItem("email", login);
        localStorage.setItem("token", token);
        console.log(login);
      } else {
        console.log("Błąd edycji danych do bazy");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const style = {
    paper: { width: "100%", height: "100%" },
  };

  return (
    <div>
      <div className="loginuser">
        <div className="loginuser__card">
          <div className="loginuser__card-wrapper">
            <Paper style={style.paper} elevation={3}>
              <div className="loginuser__card-wrapper--title">Zaloguj się</div>
              <div className="loginuser__card-wrapper--login">
                <TextField
                  sx={{ m: 1, width: "25ch" }}
                  value={typedLogin}
                  onChange={(e) => setTypedLogin(e.target.value)}
                  id="outlined-basic"
                  label="Login"
                  variant="outlined"
                />
              </div>
              <div className="loginuser__card-wrapper--password">
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Hasło
                  </InputLabel>
                  <OutlinedInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {password ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </div>

              <div className="loginuser__card-wrapper--btnlogin">
                <Button
                  onClick={goToMain}
                  sx={{ m: 1, width: { xs: "16ch", sm: "25ch" } }}
                  variant="contained"
                >
                  Zaloguj się
                </Button>
                <Button
                  onClick={goToFreeUser}
                  style={{ backgroundColor: "#459cb6" }}
                  sx={{ m: 1, width: { xs: "16ch", sm: "25ch" } }}
                  variant="contained"
                >
                  Jako gość
                  <PeopleIcon />
                </Button>
              </div>
            </Paper>
          </div>
        </div>
      </div>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={addError} autoHideDuration={6000}>
          <Alert severity="error" sx={{ width: "100%" }}>
            Wypełnij poprawnie formularz
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}
