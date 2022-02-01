import headBanner from "../images/headBanner.jpg";
import Image from "next/dist/client/image";

const HeadBanner = () => {
  return (
    <div className="bg-gray-200">
      <Image
        src={headBanner}
        alt="Head Banner"
        height={300}
        className="w-full h-36 sm:h-56 object-cover rounded-md my-2 sm:my-4"
      />
    </div>
  );
};

export default HeadBanner;
