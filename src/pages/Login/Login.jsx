import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "../../components/shared/Container";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { getToken, saveUser } from "../../api/auth";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import { Helmet } from "react-helmet-async";

const defaultTheme = createTheme();

const Login = () => {
  const { signInWithGoogle, signIn, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // login a user
      const result = await signIn(data?.email, data?.password);

      // get token
      await getToken(result?.user?.email);

      // navigate user after successfull sign up and show a toast
      navigate(from, { replace: true });
      toast.success("Login Successful!");
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // user registration with google
      const result = await signInWithGoogle();

      // save userInfo to database
      const dbResponse = await saveUser(result?.user);
      console.log(dbResponse);

      // get token
      await getToken(result?.user?.email);

      // navigate user after successfull sign up and show a toast
      navigate(from, { replace: true });
      toast.success("Login Successful!");
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>DiscussHub | Login</title>
      </Helmet>
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
                  "url(https://img.freepik.com/free-vector/professional-consulting-online-service-platform-sales-strategy-recomendation-help-clients-with-business-problem-online-forum-flat-vector-illustration_613284-2427.jpg)",
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
                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" fontWeight={600} variant="h5">
                  Sign In
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    margin="normal"
                    fullWidth
                    type="email"
                    label="Email Address"
                    autoFocus
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <p className="text-red-600 mt-2">Email must be required</p>
                  )}
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <p className="text-red-600 mt-2">
                      Password must be required
                    </p>
                  )}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {loading ? (
                      <ImSpinner9 className="animate-spin m-auto" size={24} />
                    ) : (
                      "Sign in"
                    )}
                  </Button>
                  <Grid style={{ textAlign: "center" }}>
                    <Link className="font-semibold" to="/signup">
                      Don{"'"}t have an account?{" "}
                      <span className="text-[#1E88E5]">Sign Up</span>
                    </Link>
                  </Grid>
                </form>
                <Button
                  style={{ marginTop: "16px", fontWeight: 600 }}
                  fullWidth
                  variant="outlined"
                  startIcon={<FcGoogle />}
                  onClick={handleGoogleSignIn}
                >
                  Sign in with google
                </Button>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      </Container>
    </>
  );
};
export default Login;
