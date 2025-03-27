import { Input } from "antd";
import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete/dist/utils";

export function PlacesAutocompleteWrapper({ address, setAddress, className }) {
  function handlePlacesChange(address) {
    setAddress((prev) => ({
      // ...prev, // remove the previous state so that we can invalidate the wrong address
      address,
    }));
  }

  const onAddressSelect = (address) => {
    const addressObj = {};
    addressObj.address = address;
    geocodeByAddress(address)
      .then((results) => {
        for (let address_component of results[0]["address_components"]) {
          if (address_component["types"][0] == "administrative_area_level_2") {
            addressObj.city = address_component["long_name"];
          }
          if (address_component["types"][0] == "administrative_area_level_1") {
            addressObj.state = address_component["long_name"];
          }
          if (address_component["types"][0] == "country") {
            addressObj.country = address_component["long_name"];
          }
          if (address_component["types"][0] == "postal_code") {
            addressObj.postalCode = address_component["long_name"];
          }
        }
        return getLatLng(results[0]);
      })
      .then(({ lat, lng }) => {
        addressObj.coordinates = [lng, lat];
        // setLngLat([lng, lat]);
        setAddress(addressObj);
      })
      .catch((error) => console.error("Error", error));
  };

  return (
    <PlacesAutocomplete
      onChange={handlePlacesChange}
      onSelect={onAddressSelect}
      value={address}
    >
      {({ getInputProps, getSuggestionItemProps, suggestions, loading }) => (
        <React.Fragment>
          <div className={className}>
            <Input
              {...getInputProps({
                id: "address-input",
              })}
              placeholder="* Location (city, state)"
            />
            <div className="autocomplete-dropdown-container">
              {loading ? <div>Loading...</div> : null}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                const style = suggestion.active
                  ? {
                      backgroundColor: "#fafafa",
                      cursor: "pointer",
                    }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                const spread = {
                  ...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  }),
                };
                return (
                  <div {...spread} key={suggestion.id}>
                    <div>{suggestion.description}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </React.Fragment>
      )}
    </PlacesAutocomplete>
  );
}
