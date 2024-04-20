"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Autocomplete from "react-google-autocomplete";
import { useForm, Controller, set } from "react-hook-form";
import Image from "next/image";
import barFill from "@/app/assets/Onboarding/barFill.png";
import barNoFill from "@/app/assets/Onboarding/barNoFill.png";

const styles = {
  bar: {
    width: "50px", // Default width for non-mobile devices
    height: "3px",
  },
  barMobile: {
    width: "15px", // Width for mobile devices
    height: "3px",
  },
};

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
    const response = await fetch("/api/application/mortgage-address", {
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
          setValue("address", cardApplication.mortgageAddress.address1);
          setValue("unit", cardApplication.mortgageAddress.address2);
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
    <div className="flex w-full flex-col items-center">
      <h1 className="text-5xl font-bold capitalize leading-[62.4px] text-zinc-800 max-md:max-w-full max-md:text-4xl">
        <span className="text-slate-600">Mortgage</span> Details
      </h1>
      <p className="my-5 text-base leading-6 text-zinc-800 max-md:max-w-full">
        Is your mortgage for this address?
      </p>
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
        <div className="mt-12 flex w-1/2 flex-col gap-5 max-md:mt-10 max-md:max-w-full max-md:flex-wrap">
          <div className="flex flex-col justify-between gap-5 whitespace-nowrap text-base font-semibold leading-6">
            <button
              type="submit"
              onClick={handleContinue}
              className="w-full rounded-md bg-primary px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
          <div className="mt-2 flex w-fit shrink-0 grow basis-0 flex-col self-start">
            <div className="text-lg font-medium leading-7 text-black">3/6</div>
            <div className="mt-2.5 flex gap-2 p-1.5">
              <Image
                src={barFill}
                alt="Progress bar"
                style={window.innerWidth < 640 ? styles.barMobile : styles.bar}
              />
              <Image
                src={barFill}
                alt="Progress bar"
                style={window.innerWidth < 640 ? styles.barMobile : styles.bar}
              />
              <Image
                src={barFill}
                alt="Progress bar"
                style={window.innerWidth < 640 ? styles.barMobile : styles.bar}
              />
              <Image
                src={barNoFill}
                alt="Progress bar"
                style={window.innerWidth < 640 ? styles.barMobile : styles.bar}
              />
              <Image
                src={barNoFill}
                alt="Progress bar"
                style={window.innerWidth < 640 ? styles.barMobile : styles.bar}
              />
              <Image
                src={barNoFill}
                alt="Progress bar"
                style={window.innerWidth < 640 ? styles.barMobile : styles.bar}
              />
            </div>
          </div>
        </div>
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
                        className="input input-bordered w-full "
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
                        className="input input-bordered w-full"
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
                        className="input input-bordered w-full "
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
                        className="input input-bordered w-full"
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
                        className="input input-bordered w-full "
                        placeholder="Zip Code"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                </div>
                <div className="mt-12 flex w-full flex-col gap-5 max-md:mt-10 max-md:max-w-full max-md:flex-wrap">
                  <div className="flex flex-col justify-between gap-5 whitespace-nowrap text-base font-semibold leading-6">
                    <button
                      type="submit"
                      className="w-full rounded-md bg-primary px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                    >
                      {loading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        "Submit"
                      )}
                    </button>
                    <button
                      className="w-full rounded-md bg-primary px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
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
                  <div className="mt-2 flex w-fit shrink-0 grow basis-0 flex-col self-start">
                    <div className="text-lg font-medium leading-7 text-black">
                      3/6
                    </div>
                    <div className="mt-2.5 flex gap-2 p-1.5">
                      <Image
                        src={barFill}
                        alt="Progress bar"
                        style={
                          window.innerWidth < 640
                            ? styles.barMobile
                            : styles.bar
                        }
                      />
                      <Image
                        src={barFill}
                        alt="Progress bar"
                        style={
                          window.innerWidth < 640
                            ? styles.barMobile
                            : styles.bar
                        }
                      />
                      <Image
                        src={barFill}
                        alt="Progress bar"
                        style={
                          window.innerWidth < 640
                            ? styles.barMobile
                            : styles.bar
                        }
                      />
                      <Image
                        src={barNoFill}
                        alt="Progress bar"
                        style={
                          window.innerWidth < 640
                            ? styles.barMobile
                            : styles.bar
                        }
                      />
                      <Image
                        src={barNoFill}
                        alt="Progress bar"
                        style={
                          window.innerWidth < 640
                            ? styles.barMobile
                            : styles.bar
                        }
                      />
                      <Image
                        src={barNoFill}
                        alt="Progress bar"
                        style={
                          window.innerWidth < 640
                            ? styles.barMobile
                            : styles.bar
                        }
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
