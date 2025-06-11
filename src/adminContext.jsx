// import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import api from "./utils/axios"

// import { useNavigate } from "react-router-dom";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminData, setAdminData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
    otp: "",
    mailOtp: "",
    uid: "",
  });


  


  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setAdmin(currentUser);
    });
    return () => unsubscribe();
  }, [admin]);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     if (admin) {
  //       try {


  //         const response = await api.post(
  //           "/admin/check-admin",
  //           {
  //             email: adminData.email,
  //           }
  //         );

  //         console.log(response.data.data);

  //         if (response.data?.data) {
  //           setAdminData((prev) => ({
  //             ...prev,
  //             ...response.data.data,
  //             uid: admin.uid
  //           }));
  //         }
  //       } catch (error) {
  //         console.error("Error fetching user data:", error);
  //       }
  //     }
  //   };

  //   fetchUser();
  // }, [admin]);

   useEffect(() => {
    const fetchUser = async () => {
      if (admin) {
        try {


          const response = await api.post(
            "/admin/check-admin",
            {
              email: adminData.email,
            }
          );

          console.log(response.data.data);

          if (response.data?.data) {
            setAdminData((prev) => ({
              ...prev,
              ...response.data.data,
              uid: admin.uid
            }));
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUser();
  }, [admin,adminData.email]);


  return (
    <AdminContext.Provider value={{ admin, setAdmin, adminData, setAdminData }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  return useContext(AdminContext);
};
