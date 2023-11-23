import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "../../components/shared/Container";
import { Link } from "react-router-dom";
import avater from "../../assets/images/placeholder.jpg";

const defaultTheme = createTheme();

const Signup = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0].name;
    console.log({ name, email, password, image });
  };

  return (
    <Container>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://img.freepik.com/free-vector/copywriter-online-service-platform-writing-designing-texts-creativity-promotion-idea-online-forum-vector-flat-illustration_613284-820.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={3}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" fontWeight={600} variant="h5">
                Sign Up
              </Typography>
              <form onSubmit={handleSubmit}>
                <div className="w-fit mx-auto mt-6">
                  <label htmlFor="fileInput" style={{ display: "block" }}>
                    <img
                      src={avater} // Replace with the path to your placeholder image
                      alt="Upload Image"
                      style={{
                        width: "100px",
                        height: "100px",
                        border: "1px solid #ccc",
                        cursor: "pointer",
                        borderRadius: "50%",
                      }}
                    />
                    <TextField
                      type="file"
                      id="fileInput"
                      name="image"
                      accept="image/*"
                      required
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Your Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid>
                  <Link className="font-semibold" to="/signup">
                    Already have an account?{" "}
                    <span className="text-[#1E88E5]">Sign In</span>
                  </Link>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Container>
  );
};
export default Signup;
