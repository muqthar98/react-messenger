import React, { useEffect, useState } from "react";
import { app } from "../../firebase/firebase";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  useQuery,
  useQueryClient,
  QueryCache,
  useMutation,
} from "@tanstack/react-query";
import { useUserContext } from "../userContext";
import { Modal } from "../modal/Modal";
import axios from "axios";
import {
  addUserInterest,
  getInterest,
  searchUserInterest,
} from "../../constants/constants";

const fetchUserInt = async (userId) => {
  return await axios.get(
    "https://messenger-backend-1rb8.onrender.com/getUserInterest",
    { userId }
  );
};

const Home = () => {
  const db = getDatabase(app);
  const [interests, setInterests] = useState([]);
  const [selected, setSelected] = useState("");
  const [userInterest, setUserInterest] = useState("");

  const auth = getAuth(app);
  const navigate = useNavigate();

  function writeUserData() {
    const db = getDatabase();
    set(ref(db, "Interests/"), {
      userId: auth.currentUser.uid,
      interest: selected,
    });
  }

  const queryClient = useQueryClient();

  const { userData } = useUserContext();

  const userId = userData?.data?._id;

  console.log(userId, "uuuuuuuuuuuuuuuuuuuuuuuuu");

  const onLogout = () => {
    sessionStorage.clear();
    queryClient.clear();
    navigate("/signin");
  };

  const { data } = useQuery({
    queryKey: ["user-interest"],
    queryFn: getInterest,
  });

  const result = data?.data?.data;
  // console.log(result)

  const { isLoading, data: data1 } = useQuery({
    queryKey: ["get-user-interest"],
    queryFn: () => {
      return axios.get(
        `https://messenger-backend-1rb8.onrender.com/getUserInterest`,
        {
          params: { userId: userId },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["search-interest"]);
    },
  });

  // const {mutate} = useMutation({
  //   mutateKey: ["add-interest"],
  //   mutationFn: addUserInterest,
  //   onSuccess : () => {
  //     queryClient.invalidateQueries("get-user-interest")
  //   }
  // })

  // const {mutate,data:data2} = useMutation({
  //   mutateKey: ["search-interest"],
  //   mutationFn: searchUserInterest
  // })

  const InterestData = data1?.data?.data;

  console.log(InterestData, "innnnnnnnn");
  const { data: data2 } = useQuery({
    queryKey: ["search-interest"],
    queryFn: () => {
      return axios.get(
        `https://messenger-backend-1rb8.onrender.com/searchInterest`,
        {
          params: { interests: InterestData?.Interests },
        }
      );
    },
  });

  const InterestData1 = data2?.data?.data;

  const dummy = InterestData1?.filter((value) => {
    if (!userInterest) {
      return value;
    }
    if (value.firstName.toLowerCase().startsWith(userInterest)) {
      return value;
    }
  });

  // console.log(dummy)

  if (isLoading) {
    return <p>Loading...........</p>;
  }

  return (
    <>
      {!data1?.data?.data?.Interests.length > 0 && (
        <Modal defaultIsOpen={true}>
          <Modal.Window>
            <h1 style={{ textAlign: "center", padding: "1rem" }}>
              Add Your Interest
            </h1>
            <p style={{ textAlign: "center" }}>Select one Interest</p>
            <select
              style={{ padding: ".6rem" }}
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              {result?.map((interest) => {
                return <option key={interest._id}>{interest.Interest}</option>;
              })}
            </select>
            {selected && <h3>{`Your Selected ${selected}`}</h3>}
            <button
              onClick={() => mutate({ userId: userId, Interests: [selected] })}
            >
              Submit
            </button>
          </Modal.Window>
        </Modal>
      )}

      <div style={{ padding: ".5rem", marginLeft: "1310px" }}>
        <button onClick={onLogout}>Logout</button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search Interests..."
          style={{ textAlign: "center", padding: ".5rem" }}
          value={userInterest}
          onChange={(e) => setUserInterest(e.target.value)}
        />
        {/* <button onClick={() => mutate({interests:[userInterest]})}>Search</button> */}
      </div>
      <h2 style={{ textAlign: "center", padding: "1rem" }}>Interest</h2>
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {dummy?.map((val) => {
          return (
            <div
              key={val._id}
              style={{
                boxShadow: "0 0 1.6rem #dddddd",
                borderRadius: ".8rem",
                padding: "2.4rem",
              }}
            >
              <h1>{val.firstName}</h1>
            </div>
          );
        })}
      </ul>
    </>
  );
};

export default Home;
