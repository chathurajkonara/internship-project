import { useState, useRef, useEffect } from "react";
import { useRouter, Router } from "next/router";
import ReCAPTCHA from "react-google-recaptcha";

const SellerPlatform = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [files, setFiles] = useState([]);
  const [token, setToken] = useState("");
  const reCaptcha = useRef();
  const didMount = useRef(false);

  const router = useRouter();


 

  useEffect(() => {
    try {
      console.log(router.pathname);
      confLoginStat();
    } catch (error) {
      console.log(error);
    }
  }, [router]);

  const confLoginStat = async () => {
    const res = await fetch("https://api/jwt/",{credentials: 'include',});
    console.log("the response is: " + res);
    const user = await res.json();
    console.log("the jason of response is: " + user);

    console.log(user);
    setName(user.name);
    if(user.name){
      console.log("User Logged In");
    }else{
      console.log("User Not Logged In");
      router.push("/ProductsList");
    }
    
  };




  //onChange method for google reCAPTCHA

  function onChange(value) {
    setToken(value);
  }

  const onChangeFile = (e) => {
    setFiles(e.target.files[0]);
  };

  async function onSubmitForm(e) {
    e.preventDefault();
   // console.log(`token is: ${token}`);

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

    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("qty", qty);
    formData.append("file", files);

    console.log(`captch success is: ${captchaSuccess}`);

    if (captchaSuccess) {
      try {
        const response = await fetch("https://api/products/add", {
          method: "POST",
          body: formData,
          credentials: 'include',
        });

        const returnMsg = await response.json();

        alert(returnMsg.msg);
        console.log(returnMsg);
        if (returnMsg.success) {
          console.log("successfully added");
          router.push("/ProductsList");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("ReCAPTCHA verification failed!");
    }
  }

  return (
    <div className=" mx-0.5 sm:mx-auto my-5 sm:my-10 w-47/48 max-w-5xl rounded-xl bg-white p-4 sm:p-8 shadow">
        <h2 className="text-2xl font-extrabold text-gray-500 mt-2 mb-8 flex justify-center">
          Add A Product
        </h2>
        <form
          // action="/add"
          method="post"
          // encType="multipart/form-data"
          onSubmit={onSubmitForm}
          className="grid grid-cols-1 gap-y-6"
        >
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
            <label htmlFor="price" className="sr-only">
              Unit Price
            </label>
            <input
              name="price"
              type="text"
              className="block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-gray-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2"
              placeholder="Unit Price"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="qty" className="sr-only">
              Current Stock (Qty)
            </label>
            <input
              type="qty"
              name="qty"
              className="block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-gray-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2"
              placeholder="Current Stock (Qty)"
              onChange={(e) => setQty(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="file" className="sr-only">
              product image
            </label>
            <input
              type="file"
              name="file"
              className="block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-gray-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2"
              placeholder="Product Image"
              onChange={onChangeFile}
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
              type="submit"
              className="inline-flex justify-center py-3 px-6 border border-transparent shadow text-base font-medium rounded-md text-white bg-gray-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
  );
};

export default SellerPlatform;
