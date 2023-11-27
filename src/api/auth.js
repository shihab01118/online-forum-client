import axiosSecure from ".";

// save user info to database
export const saveUser = async (user) => {
  const newUser = {
    badge: "bronze",
    email: user?.email,
    name: user?.displayName,
    role: "admin",
  };
  const { data } = await axiosSecure.put(`/users/${user?.email}`, newUser);
  return data;
};

// get token from server
export const getToken = async (email) => {
  const { data } = await axiosSecure.post("/jwt", { email });
  return data;
};

// get token from server
export const clearCookie = async () => {
  const { data } = await axiosSecure.post("/logout");
  return data;
};

// get user role
export const getRole = async (email) => {
  const { data } = await axiosSecure(`/users/role/${email}`);
  return data;
};
