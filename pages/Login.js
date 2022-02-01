import Router from 'next/router';
import { useState } from "react";

// export const getStaticProps = async () => {
//   const res = await fetch("http://localhost:5500/auth/login");
//   const data = await res.json();

//   return {
//     props: { user: data },
//   };
// };

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const router = useRouter();

  async function onSubmitForm(e) {
    e.preventDefault();
    try {
      const res = await fetch("https://api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        mode: 'cors',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status == 400) {

        alert("Wrong Credentials!");
        return
        
      }
      
      const user = await res.json();
      console.log(user);

      if (email === user.email) {
        console.log("login successfull! ");
        
       Router.push("/SellerPlatform");
      }
    } catch (err) {
      console.log(err);
    }finally{
      setTimeout(() => {
        Router.reload();
      }, 2000);
      
    }
  }

  return (
   
    <div className=" mx-0.5 sm:mx-auto my-5 sm:my-10 w-47/48 max-w-5xl rounded-xl bg-white p-4 sm:p-8 shadow">
        <h2 className="text-2xl font-extrabold text-gray-500 mt-2 mb-8 flex justify-center">
          Login
        </h2>
        <form onSubmit={onSubmitForm} className="grid grid-cols-1 gap-y-6">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="text"
              name="email"
              className="block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-gray-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-gray-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button
              type="Sign in"
              className="inline-flex justify-center py-3 px-6 border border-transparent shadow text-base font-medium rounded-md text-white bg-gray-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
  );
}
