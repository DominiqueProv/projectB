import { usePlacesWidget } from "react-google-autocomplete";

const GoogleInput = ({ i, noteType, handleLocation }) => {
  const { ref } = usePlacesWidget({
    apiKey: "AIzaSyCWHCoCVNt6ZW4DUKA3wQo6wFFWhUNATtY",
    onPlaceSelected: (place) => {
      console.log(place.formatted_address);
      handleLocation(place.formatted_address);
    },
    options: {
      types: ["(regions)"],
      componentRestrictions: { country: "ca" },
    },
  });

  return (
    <input
      ref={ref}
      key={1000}
      name={noteType}
      placeholder="Enter a location"
    />
  );
};

export default GoogleInput;
