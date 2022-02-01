import { StarsRating } from "stars-rating-react-hooks";
import { useEffect, useState } from "react";

export default function StarRating(props) {
  const [selecting, setSelecting] = useState(null);
  const [initialRatings, setInitialRatings] = useState(props.ratings);

  useEffect(() => {
    setInitialRatings(props.ratings);
    console.log("rating is: " + initialRatings);
  }, [props, initialRatings]);

  const config = {
    totalStars: 5,
    initialSelectedValue: initialRatings,
    renderFull: (
      <img
        className="h-4 sm:h-8"
        alt="star"
        src="https://img.icons8.com/ios-filled/50/000000/star--v1.png"
      />
    ),
    renderEmpty: (
      <img
        className="h-4 sm:h-8"
        alt="star"
        src="https://img.icons8.com/ios/50/000000/star--v1.png"
      />
    ),
    renderHalf: (
      <img
        className="h-4 sm:h-8"
        alt="star"
        src="https://img.icons8.com/ios-filled/50/000000/star-half-empty.png"
      />
    ),
  };

  return (
    <div className="App">
      <h1 className="font-bold text-sm text-red-900 sm:text-lg sm:hidden lg:block">
        Would you like to rate us..
      </h1>
      <span className="group">
        <h3 className=" font-extrabold text-green-500">
          {selecting?.selectingValue}{" "}
          <span className="visible group-hover:invisible">
            {" "}
            ({props.ratingsCount})
          </span>
        </h3>
        <div>
          <StarsRating
            onStarsRated={(value) => {
              alert(`${value} stars rated`);
            }}
            onSelecting={(isSelecting, selectingValue) => {
              setSelecting({ isSelecting, selectingValue });
            }}
            config={config}
          />
        </div>
      </span>
    </div>
  );
}
