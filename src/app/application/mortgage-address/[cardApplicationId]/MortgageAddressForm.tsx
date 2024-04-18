"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Autocomplete from "react-google-autocomplete";
import { useForm, Controller, set } from "react-hook-form";

interface MortgageFormProps {
  cardApplicationId: string;
  apiSecretKey: string;
  googleApiKey: string;
}

interface AddressFormData {
  address: string;
  unit?: string;
  city: string;
  state: string;
  zipCode: string;
}

export default function MortgageForm({
  cardApplicationId,
  apiSecretKey,
  googleApiKey,
}: MortgageFormProps) {
  const [displayAutoComplete, setDisplayAutoComplete] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState("currentAddress");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [message, setMessage] = useState<string>("");

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAddress(event.target.value);
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<AddressFormData>({
    defaultValues: {
      address: "",
      unit: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });
  async function onSubmit(data: AddressFormData) {
    setLoading(true);
    const response = await fetch("/api/application/current-address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        secretKey: apiSecretKey,
      },
      body: JSON.stringify({
        ...data,
        cardApplicationId,
      }),
    });
    const resData = await response.json();
    if (resData.status === 200) {
      setLoading(false);
      router.push(`/application/employment/${cardApplicationId}`);
    } else {
      setLoading(false);
      setMessage("Error. Please Try Again");
    }
  }
  useEffect(() => {
    async function fetchApplication() {
      const response = await fetch(
        `/api/application/fetch-application/${cardApplicationId}`,
        {
          headers: {
            secretKey: apiSecretKey,
          },
        },
      );
      const resData = await response.json();
      if (resData.status === 200) {
        const { cardApplication } = resData;
        if (
          cardApplication.mortgageAddress &&
          cardApplication.mortgageAddressId !== cardApplication.currentAddressId
        ) {
          setSelectedAddress("differentProperty");
          setValue("address", cardApplication.mortgageAddress.address);
          setValue("unit", cardApplication.mortgageAddress.unit);
          setValue("city", cardApplication.mortgageAddress.city);
          setValue("state", cardApplication.mortgageAddress.state);
          setValue("zipCode", cardApplication.mortgageAddress.zipCode);
          setDisplayAutoComplete(false);
        }
      }
    }
    fetchApplication();
  }, [apiSecretKey, cardApplicationId, setValue]);
  async function handleContinue() {
    setLoading(true);
    const response = await fetch("/api/application/same-address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        secretKey: apiSecretKey,
      },
      body: JSON.stringify({
        cardApplicationId,
      }),
    });
    const resData = await response.json();
    if (resData.status === 200) {
      setLoading(false);
      router.push(`/application/employment/${cardApplicationId}`);
    } else {
      setLoading(false);
      setMessage("Error. Please Try Again");
    }
  }
  return (
    <>
      <fieldset className="mb-4">
        <legend className="sr-only">Mortgage address selection</legend>
        <div className="mb-2 flex items-center">
          <input
            type="radio"
            id="currentAddress"
            name="mortgageAddress"
            value="currentAddress"
            checked={selectedAddress === "currentAddress"}
            onChange={handleAddressChange}
            className="mr-2"
          />
          <label htmlFor="currentAddress" className="flex-1">
            Use Current Address
          </label>
        </div>
        <div className="mb-2 flex items-center">
          <input
            type="radio"
            id="differentProperty"
            name="mortgageAddress"
            value="differentProperty"
            checked={selectedAddress === "differentProperty"}
            onChange={handleAddressChange}
            className="mr-2"
          />
          <label htmlFor="differentProperty" className="flex-1">
            Mortgage is For Different Property
          </label>
        </div>
      </fieldset>
      {selectedAddress === "currentAddress" && (
        <button
          onClick={handleContinue}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Continue
        </button>
      )}
      {selectedAddress === "differentProperty" && (
        <div className="flex w-full flex-col items-center">
          <h1 className="my-3 text-xl font-semibold">Mortgage Address</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col  gap-4"
          >
            {displayAutoComplete && (
              <Autocomplete
                apiKey={googleApiKey}
                options={{
                  types: ["address"],
                  componentRestrictions: { country: "us" },
                }}
                defaultValue=""
                placeholder={"Address"}
                className="input input-bordered w-96"
                onPlaceSelected={(place, inputRef, autocomplete) => {
                  if (place.address_components) {
                    const addressComponents = place.address_components;
                    const streetNumber = addressComponents.find(
                      (component: google.maps.GeocoderAddressComponent) =>
                        component.types.includes("street_number"),
                    );
                    const streetName = addressComponents.find(
                      (component: google.maps.GeocoderAddressComponent) =>
                        component.types.includes("route"),
                    );
                    const city = addressComponents.find(
                      (component: google.maps.GeocoderAddressComponent) =>
                        component.types.includes("locality"),
                    );
                    const state = addressComponents.find(
                      (component: google.maps.GeocoderAddressComponent) =>
                        component.types.includes("administrative_area_level_1"),
                    );
                    const zipCode = addressComponents.find(
                      (component: google.maps.GeocoderAddressComponent) =>
                        component.types.includes("postal_code"),
                    );
                    const unit = addressComponents.find(
                      (component: google.maps.GeocoderAddressComponent) =>
                        component.types.includes("subpremise"),
                    );
                    if (streetNumber && streetName) {
                      setValue(
                        "address",
                        `${streetNumber.long_name} ${streetName.long_name}`,
                      );
                    }
                    if (city) {
                      setValue("city", city.long_name);
                    }
                    if (state) {
                      setValue("state", state.long_name);
                    }
                    if (zipCode) {
                      setValue("zipCode", zipCode.long_name);
                    }
                    if (unit) {
                      setValue("unit", unit.long_name);
                    }
                    setDisplayAutoComplete(false);
                  }
                }}
              />
            )}
            {!displayAutoComplete && (
              <>
                <div className="mb-5">
                  <Controller
                    name="address"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Address is required",
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="input input-bordered w-full max-w-xs"
                        placeholder="Address"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                </div>
                <div className="mb-5">
                  <Controller
                    name="unit"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="input input-bordered w-full max-w-xs"
                        placeholder="Unit"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                </div>
                <div className="mb-5">
                  <Controller
                    name="city"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "City is required",
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="input input-bordered w-full max-w-xs"
                        placeholder="City"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                </div>
                <div className="mb-5">
                  <Controller
                    name="state"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "State is required",
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="input input-bordered w-full max-w-xs"
                        placeholder="State"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                </div>
                <div className="mb-5">
                  <Controller
                    name="zipCode"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Zip Code is required",
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="input input-bordered w-full max-w-xs"
                        placeholder="Zip Code"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                </div>

                <div className="flex flex-row gap-2 self-center">
                  <button className="btn btn-outline btn-primary" type="submit">
                    Continue
                  </button>
                  <button
                    className="btn btn-outline btn-primary"
                    onClick={() => {
                      setDisplayAutoComplete(true);
                      setValue("address", "");
                      setValue("unit", "");
                      setValue("city", "");
                      setValue("state", "");
                      setValue("zipCode", "");
                    }}
                  >
                    Reset
                  </button>
                </div>
                {message && (
                  <div
                    className={`alert ${
                      message.includes("Success")
                        ? "alert-success"
                        : "alert-error"
                    }`}
                  >
                    {message}
                  </div>
                )}
              </>
            )}
          </form>
        </div>
      )}
    </>
  );
}
