import axios from "axios";

export const loginUser = async (data) => {
  const getUser = await axios.post(
    "https://messenger-backend-1rb8.onrender.com/login",
    data
  );
  return getUser;
};

export const getInterest = async () => {
  const getUser = await axios.get(
    "https://messenger-backend-1rb8.onrender.com/getInterest"
  );
  return getUser;
};

export const getUserInterest = async (data) => {
  const getUser = await axios.post(
    "https://messenger-backend-1rb8.onrender.com/getUserInterest"
  );
  return getUser;
};

export const addUserInterest = async (data) => {
  const addUser = await axios.post(
    "https://messenger-backend-1rb8.onrender.com/addUserInterest",
    data
  );
  return addUser;
};

export const searchUserInterest = async (data) => {
  const InterestData = await axios.post(
    "https://messenger-backend-1rb8.onrender.com/searchInterest",
    data
  );
  return InterestData;
};
