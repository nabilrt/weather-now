import { FadeLoader } from "react-spinners";
const WeatherCard = ({ state }) => {
  function formatDateTime(inputDateString) {
    const dateObject = new Date(inputDateString);

    const dateOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };

    const timeOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", dateOptions).format(
      dateObject
    );
    const formattedTime = new Intl.DateTimeFormat("en-US", timeOptions).format(
      dateObject
    );

    return {
      date: formattedDate,
      time: formattedTime,
    };
  }
  return (
    <div>
      {Object.keys(state.weatherCondition).length === 0 && !state.loading && (
        <div className="flex flex-row justify-center w-1/2 m-auto mt-4">
          <h2 className="font-semibold text-base text-white">
            Select Country or both Country and City to get started
          </h2>
        </div>
      )}

      {state.loading ? (
        <div className="flex flex-row justify-center w-1/2 m-auto mt-6">
          <FadeLoader color="#37388D" />
        </div>
      ) : (
        <div>
          {Object.keys(state.weatherCondition).length !== 0 && (
            <div className="flex flex-row justify-center w-1/2 m-auto mt-5">
              <div
                className={`border-solid border-[#41738d] border shadow-md w-1/2 mr-4  text-white bg-transparent`}
              >
                <div className="flex text-left pl-3 pt-2">
                  <img
                    src="clock.png"
                    height="20px"
                    width="25px"
                    className="mr-2"
                  ></img>
                  <h2 className="font-semibold text-sm">
                    {formatDateTime(state.weatherLocation.localtime).time}
                  </h2>
                  <h2 className="m-auto mr-3 items-right font-semibold text-sm">
                    {formatDateTime(state.weatherLocation.localtime).date}
                  </h2>
                </div>
                <div className="inline-flex m-auto">
                  <img
                    src={state.weatherCondition.condition.icon}
                    className=""
                    height="50px"
                    width="100px"
                    alt="Weather Icon"
                  />
                  <div className="text-center">
                    <h4 className="mt-7 text-lg font-semibold">
                      {state.city
                        ? state.city.label + ", " + state.country.iso2
                        : state.country.label}
                    </h4>
                    <h4 className="mb-2 text-left text-sm">
                      {state.weatherCondition.condition.text}
                    </h4>
                  </div>
                </div>
                <h4 className="mb-2 text-sm">
                  Feels Like {state.weatherCondition.feelslike_c}°
                </h4>
                <h4 className="mb-9 ml-6 text-7xl font-bold">
                  {state.weatherCondition.temp_c}°
                </h4>
                <div className="flex text-left pl-3 pt-2">
                  <img
                    src="wind.png"
                    height="20px"
                    width="25px"
                    className="mr-2 mb-2"
                    alt="Wind Icon"
                  />
                  <h2 className="font-semibold text-sm mt-1">
                    {state.weatherCondition.wind_dir}{" "}
                    {state.weatherCondition.wind_kph} KPH
                  </h2>
                  <div className="flex items-center ml-auto">
                    <img
                      src="drop.png"
                      height="20px"
                      width="25px"
                      className="mb-2 mr-2"
                      alt="Drop Icon"
                    />
                    <h2 className="font-semibold text-sm mr-3">
                      {state.weatherCondition.humidity} %
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
