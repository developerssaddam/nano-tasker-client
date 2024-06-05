import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { loginWithGoogle } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  // Login with google
  const handleGoogleLogin = () => {
    loginWithGoogle().then(async (result) => {
      const userInfo = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        photo: result?.user?.photoURL,
        role: "Worker",
        totalCoin: parseInt(10),
      };

      // Now save user info to db.
      await axiosPublic.post("/users", userInfo);

      Swal.fire({
        icon: "success",
        text: "Login successfull!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/dashboard/worker");
    });
  };

  return (
    <div className="flex justify-center space-x-4">
      <button
        onClick={handleGoogleLogin}
        type="button"
        className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-primary_color text-primary_color hover:bg-primary_color hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-5 h-5 fill-current"
        >
          <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
        </svg>
        <p>Contunue with Google</p>
      </button>
    </div>
  );
};

export default SocialLogin;
