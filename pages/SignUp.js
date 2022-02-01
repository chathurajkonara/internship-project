import { useRouter } from "next/router";
import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function SignUp() {
  //const toast = useToast();
  const [name, setName] = useState("");
  const [usertype, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const reCaptcha = useRef();

  const router = useRouter();

  //onChange method for google reCAPTCHA

  function onChange(value) {
    setToken(value);
  }

  async function onSubmitForm(e) {
    e.preventDefault();
    if (password.length<6) {

      alert("Password must be at least 6 charactors long!");
      return;
      
    }


    const captchaData = { token };
    let captchaSuccess = false;

    console.log(`content of captcha form data is: ${captchaData.token}`);

    try {
      const response = await fetch(
        "https://api/products/verify_cpatcha",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(captchaData),
        }
      );

      const returnMsg = await response.json();

      alert(returnMsg.msg);
      console.log(returnMsg);
      captchaSuccess = returnMsg.success;
    } catch (error) {
      console.log(error);
    }




    const user = { name, usertype, email, password };
    // console.log(user);



    if (captchaSuccess) {

      try {
        const response = await fetch(
          "https://api/auth/register",
          {
            method: "POST",
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        if (response.status == 200) {
          console.log("success" + data);
          router.push("/SellerPlatform");
        }
        if(response.status == 500){
  
        alert(data)
        }
      } catch (err) {
        console.log(err);
      }finally{
        setTimeout(() => {
          router.reload();
        }, 2000);
        
      }
      
    } else {
      alert("ReCAPTCHA verification failed!");
    }





    
  }

  return (
    <div className=" mx-0.5 sm:mx-auto my-5 sm:my-10 w-47/48 max-w-5xl rounded-xl bg-white p-4 sm:p-8 shadow">
        <h2 className="text-2xl font-extrabold text-gray-500 mt-2 mb-8 flex justify-center">
          Sign Up
        </h2>
        <form onSubmit={onSubmitForm} className="grid grid-cols-1 gap-y-6">
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-gray-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

      

          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              name="email"
              type="text"
              className="block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-gray-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
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
              placeholder="Password (6 or more charactors)"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <ReCAPTCHA
              className = "mr-2 pr-2"
              ref={reCaptcha}
              sitekey="xxxxxxxxxxxxxxxxx"
              onChange={onChange}
              onExpired={(e) => setToken("")}
            />
          </div>

          <div>
            <button
              type="Sign up"
              className="inline-flex justify-center py-3 px-6 border border-transparent shadow text-base font-medium rounded-md text-white bg-gray-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
  );
}
