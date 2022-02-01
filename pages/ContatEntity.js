const ContatEntity = () => {
  return (
    <div className="bg-gray-50 gap-10 shadow-md rounded-md pb-10">
      
          
            <div className="m-4">
              <h3 className=" text-7xl text-gray-400 text-opacity-80 flex justify-around">How</h3>
              <br></br>
              <br></br><h3 className="text-5xl text-gray-500 text-opacity-80 flex justify-start">How to fetch data in React Js :</h3>
              <br></br>
              <p className="text-2xl text-gray-900 text-opacity-80">The fetching of data can be recognized as the process of retriving 
              data from an external source (API). The source could be a publicly available API or a custom API which is created by ourselves
              to retrive data from data bases and provide them to frontend. In React Js most commonly used method to fetch data is <strong>fetch API</strong> which provides 
              a global method to fetch data asynchronously. This method will return a promise of a HTTP response. We can use <strong> json()</strong> method to convert that response 
              into a JSON object. We also can customize the request using an optional object which this fetch method take as an optional parameter. If we intend to send cross 
              origin cookies we should set credentials as include in this optional object.
              </p>
              <br></br>
              <h3 className="text-5xl text-gray-500 text-opacity-80 flex justify-start">Fetching data in Next Js:</h3>
              <br></br>
              <p className="text-2xl text-gray-900 text-opacity-80"> In <strong>Next js</strong> there is a function called
               <strong> getServerSideProps </strong> which will allow you to get data directly from the database without an API. This fuction will load data 
               every time the database is updated. <strong> getServerSideProps </strong> 
               can be recognized as a good choice for fetching data if you do not have third pary applications making requests to your APIs.
               Another method in Next Js for fetching data is using <strong> getInitialProps </strong>, which we can use to fetch data using an API. This particular 
               method will only be executed when the correspoding page is loading. Another method for fetching data in Next Js is <strong>getStaticProps </strong> which will
               fetch data at build time. This method also can be used to fetch data directly from database. One of the great advantage of all above mentioned methods is <strong>Server Side Rendering</strong>
               which will improve <strong>Search Engine Optimization</strong> of the web application.
              </p>
              <br></br>
              <h3 className="text-5xl text-gray-500 text-opacity-80 flex justify-start">How user authentication is done:</h3>
              <p className="text-2xl text-gray-900 text-opacity-80">
                <br></br> <em>To Be Continued . . .</em>
              </p>
            </div>
          
        
    </div>
  );
};

export default ContatEntity;
