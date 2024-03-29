/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useCity } from "../context/CityContext";
import BackButton from "./BackButton";
import Loader from "./Loader";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem() {
  const { getCity, currentCity } = useCity();
  const { id } = useParams();
  const { cityName, emoji, date } = currentCity;

  useEffect(() => {
    getCity(id);
  }, [id, getCity]);

  if (!currentCity) return <Loader />;

  return (
    <div className="w-8/12 bg-gray-700 rounded-md p-5 flex flex-col">
      <p className="text-[12px] text-gray-300">CITY NAME</p>
      <p className="mb-8">
        <span className="text-green-500 text-xl">{emoji}</span>
        <span className="text-xl ml-4 font-medium">{cityName}</span>
      </p>
      <p className="text-[12px] text-gray-300">YOU WENT TO {cityName} ON</p>
      {date && <p className="mb-8">{formatDate(date)}</p>}
      <p className="text-[12px] text-gray-300">LEARN MORE</p>
      <Link
        className="underline text-orange-300 mb-8"
        target="_blank"
        to={`https://en.wikipedia.org/wiki/${cityName}`}
      >
        Check out Used on Wikipedia →
      </Link>
      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default CityItem;
