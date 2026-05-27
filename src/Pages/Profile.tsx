// src/Pages/Profile.tsx

import { useAuthContext } from "../Context/AuthContext";

import ProfileUser from "./ProfileUser";
import ProfileAdmin from "./ProfileAdmin";

const Profile = () => {

  const { isAdmin } =
    useAuthContext();

  return isAdmin
    ? <ProfileAdmin />
    : <ProfileUser />;
};

export default Profile;