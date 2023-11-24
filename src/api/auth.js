import axiosSecure from ".";

// save user info to database
export const saveUser = async (user) => {
  const currentUser = {
    name: user?.displayName,
    email: user?.email,
    badge: "bronze",
  };
  const { data } = await axiosSecure.put(`/users/${user?.email}`, currentUser);
  return data;
};

// get token from server
export const getToken = async (email) => {
  const { data } = await axiosSecure.post("/jwt", { email });

  return data;
};
