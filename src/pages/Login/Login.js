import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setAuthToken } from "../../api/auth";
import img from "../../assets/images/login/login.svg";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

const Login = () => {
  const { signInUser, userSignInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);

        const currentUser = {
          email: user.email,
        };

        //get jwt token
        fetch("https://genius-car-server-psi-one.vercel.app/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            // local storage is the easiest but not the best way jwt token
            localStorage.setItem("genius-token", data.token);
            form.reset();
            navigate(from, { replace: true });
          });
      })
      .catch((err) => console.error(err));
  };

  const signInWithGoogle = () => {
    userSignInWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);

        setAuthToken(user);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="hero w-full my-20 ">
      <div className="hero-content grid gap-20 md:grid-cols-2 flex-col ">
        <div className="text-center lg:text-left">
          <img className="w-3/4" src={img} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 ">
          <h1 className="text-5xl font-bold text-center mt-4">Login</h1>
          <div className="card-body">
            <form onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  required
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  required
                  className="input input-bordered"
                />
                <label className="label">
                  <Link href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
            <p className="text-center mt-3">
              New to Genius Car{" "}
              <Link className="text-orange-600" to="/signup">
                Sign up
              </Link>
            </p>
            <span className="text-center">
              <button className=" btn btn-ghost" onClick={signInWithGoogle}>
                Google
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
