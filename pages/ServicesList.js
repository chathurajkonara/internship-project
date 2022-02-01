import { useEffect, useState } from "react";
import service from "../images/service.jpg";
import Image from "next/dist/client/image";

const ServicesList = () => {
 

  return (
    <div className="bg-gray-50 gap-10 shadow-md rounded-md pb-10">
      <div className="m-4">
              <h3 className=" text-7xl text-gray-400 text-opacity-80 flex justify-around">About The Project</h3>
              <br></br>
              <br></br>
              <h3 className="text-5xl text-gray-500 text-opacity-80 flex justify-start">Introduction</h3>
              <br></br>
              <p className="text-2xl text-gray-900 text-opacity-80">Pupose of this project is to Demonstrate developing skills of the author of this application. This project was started as an Internship project at <strong>Career Calling International</strong>  which is a company that assits their clients
                  with recruitment process. OMS (Online Media Solutions) is one of their child companies where they focus on providing customized 
                  technological solutions for individual clients. This project was proceeded under the supervision of <b>Mr Vijay Patel ( Sn. Manager Online Media Solutions)</b>.
              </p>
              <br></br>
              <h3 className="text-5xl text-gray-500 text-opacity-80 flex justify-start">Technical Discription</h3>
              <br></br>
              <p className="text-2xl text-gray-900 text-opacity-80">
                This application is a collection of <strong>Micro Services</strong> and was initially started as a 
                 <strong> React js</strong> project.
                 Then it was migrated to Next js due to several advantages
                that Next js can provide such as server side rendering, Effective SEO and Image Optimization. Server was built using
                <strong> Express js</strong> which is a <strong>Node js</strong> framwork. <strong>MongoDB</strong> was used for the database which is recognized as
                a NoSQL database program. <strong>Mongoose</strong> was used for creating <em>data models</em>. Media files are stored in
                 an <strong>AWS</strong> <strong>S3 bucket</strong>. <strong>Google ReCAPTCHA</strong> and <strong> Jason Web Token </strong>
                 were used for user authentication and better security of the website.
              </p>
            </div>
    </div>
  );
};

export default ServicesList;
