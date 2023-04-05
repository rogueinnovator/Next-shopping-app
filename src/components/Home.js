import jwtDecode from "jwt-decode";
import Notes from "./Notes";
import { useEffect, useState } from "react";
const Home = () => {
  const [username, setusername] = useState(null);
  const authtoken = localStorage.getItem("token");
  useEffect(() => {
    // if (authtoken) {
    const decode = jwtDecode(authtoken);
    setusername(decode.user.name);

    console.log(username);
    // console.log(decode.user.id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container my-3 mb-4 bg-light rounded-4">
      {/* Show the user's name if available */} <Notes />{" "}
    </div>
  );
};
export default Home;
