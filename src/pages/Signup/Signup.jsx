import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "../../components/shared/Container";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import avater from "../../assets/images/placeholder.jpg";
import { uploadImage } from "../../api/utils";
import useAuth from "../../hooks/useAuth";
import { getToken, saveUser } from "../../api/auth";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { Helmet } from "react-helmet-async";

const defaultTheme = createTheme();

const Signup = () => {
  const navigate = useNavigate();
  const { createUser, updateUserProfile, signInWithGoogle, loading } =
    useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      // upload user image to imgbb
      const imageData = await uploadImage(data?.image[0]);

      // create a user
      const result = await createUser(data?.email, data?.password);

      // update user profile
      await updateUserProfile(data?.name, imageData?.data?.display_url);
      console.log(result.user);

      // save userInfo to database
      const dbResponse = await saveUser(result?.user);
      console.log(dbResponse);

      // get token
      await getToken(result?.user?.email);

      // navigate user after successfull sign up and show a toast
      navigate("/");
      toast.success("Registration Successful!");
    } catch (error) {
      // console.log(error);
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
      navigate("/");
      toast.success("Registration Successful!");
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>DiscussHub | Sign up</title>
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
                  my: 5,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" fontWeight={600} variant="h5">
                  Sign Up
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="w-fit mx-auto mt-6">
                    <label htmlFor="fileInput" style={{ display: "block" }}>
                      <img
                        src={avater} // Replace with the path to your placeholder image
                        alt="Upload Image"
                        style={{
                          width: "80px",
                          height: "80px",
                          border: "1px solid #ccc",
                          cursor: "pointer",
                          borderRadius: "50%",
                        }}
                      />
                      <TextField
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        style={{ display: "none" }}
                        {...register("image", { required: true })}
                      />
                    </label>
                  </div>
                  {errors.image && (
                    <p className="text-red-600 text-center mt-2">
                      Image must be required
                    </p>
                  )}
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Your Name"
                    type="text"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <p className="text-red-600 mt-2">Name must be required</p>
                  )}
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Email Address"
                    type="email"
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
                    sx={{ mt: 3, mb: 2, fontWeight: 600 }}
                  >
                    {loading ? (
                      <ImSpinner9 className="animate-spin m-auto" size={24} />
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                  <Grid style={{ textAlign: "center" }}>
                    <Link className="font-semibold" to="/signup">
                      Already have an account?{" "}
                      <span className="text-[#1E88E5]">Sign In</span>
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
export default Signup;
