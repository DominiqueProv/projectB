import { usePlacesWidget } from "react-google-autocomplete";

const GoogleInput = ({ noteType, handleLocation }) => {
  const { ref } = usePlacesWidget({
    apiKey: "AIzaSyCWHCoCVNt6ZW4DUKA3wQo6wFFWhUNATtY",
    onPlaceSelected: (place) => {
      handleLocation(place.formatted_address);
    },
    options: {
      types: ["(regions)"],
      componentRestrictions: { country: "ca" },
    },
  });

  return (
    <input
      className="w-full lg:w-[170px]"
      ref={ref}
      key={1000}
      name={noteType}
      placeholder="Enter a location"
    />
  );
};

export default GoogleInput;
