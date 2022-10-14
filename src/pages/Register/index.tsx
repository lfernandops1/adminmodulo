import "./style.css";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Geocode from "react-geocode";

import { Marker, Popup, TileLayer, MapContainer, useMap } from "react-leaflet";
import { useNavigate } from "react-router-dom";

// CNPJ, RAZAO SOCIAL, EMAIL, NÚMERO PARA CONTATO, ENDEREÇO (CEP, RUA, BAIRRO, COMPLEMENTO...)
// SENHA, CONFIRMAR SENHA, FRANQUIA
// LATITUDE E LONGITUDE (MAPA)

Geocode.setApiKey("AIzaSyCLCokNnTaCGSgpLlV33WPA9i5ZXU-H5vQ");
Geocode.setLanguage("pt-BR");
Geocode.setRegion("br");

type FetchZipData = {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      cnpj: "",
      companyName: "",
      email: "",
      password: "",
      number: "",
      address: {
        zip: "",
        street: "",
        city: "",
        uf: "",
        state: "",
        district: "",
        complement: "",
      },
    },
  });

  const createFranchise = async (data: any) => {
    const response = await fetch("http://localhost:8080/api/franchise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataResponse = await response.json();

    return dataResponse;
  };

  const navigate = useNavigate();
  const mutation = useMutation(createFranchise, {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const fetchCep = async () => {
    const response = await fetch(
      `https://viacep.com.br/ws/${watch("address.zip")}/json/`
    );
    const data = (await response.json()) as FetchZipData;
    const address = {
      city: data.localidade,
      complement: data.complemento,
      district: data.bairro,
      state: data.uf,
      street: data.logradouro,
      uf: data.uf,
      zip: data.cep,
    };

    setValue("address", address);

    reset({
      ...watch(),
      address,
    });
  };

  const onSubmit = async (data: any) => {
    const { results } = await Geocode.fromAddress(
      `${data.address.street}, ${data.number}`
    );

    const { lat, lng } = results[0].geometry.location;

    mutation.mutate(
      {
        ...data,
        address: {
          ...data.address,
          coordinates: {
            latitude: lat,
            longitude: lng,
          },
        },
      },
      {
        onSuccess(data, variables, context) {
          navigate("/login");
        },
      }
    );
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="rounded-md border p-4 w-2/6">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <p className="text-2xl text-black font-bold text-center">LOGO</p> */}
          <div className="flex flex-row">
            {/* <label className="text-black font-bold">CNPJ </label> */}
            <input
              className="w-full rounded-md border p-2"
              type="text"
              placeholder="CNPJ"
              {...register("cnpj")}
            />

            {/* <label className="text-black font-bold">RAZÃO SOCIAL</label> */}
            <input
              className="w-full rounded-md border p-2 ml-2"
              type="text"
              placeholder="RAZÃO SOCIAL"
              {...register("companyName")}
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-md p-2 mt-4"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          <div className="flex justify-between">
            <input
              type="text"
              placeholder="Senha"
              className="w-full border rounded-md p-2 mt-4"
              {...register("password")}
            />
            {/* <input
              type="text"
              placeholder="Confirmar senha"
              className="w-full border rounded-md p-2 mt-4 ml-2"
              {...register("confirmarSenha")}
            /> */}
          </div>

          <input
            type="text"
            placeholder="CEP"
            className="w-full border rounded-md p-2 mt-4"
            {...register("address.zip")}
            onBlur={fetchCep}
          />

          <input
            type="text"
            disabled
            placeholder="Rua"
            className="w-full border rounded-md p-2 mt-4"
            value={watch("address.street") || ""}
          />
          <input
            type="text"
            placeholder="Número"
            className="w-full border rounded-md p-2 mt-4"
            {...register("number")}
          />
          <input
            type="text"
            disabled
            placeholder="Bairro"
            className="w-full border rounded-md p-2 mt-4"
            value={watch("address.district") || ""}
          />
          <input
            type="text"
            disabled
            placeholder="Complemento"
            className="w-full border rounded-md p-2 mt-4"
            value={watch("address.complement") || ""}
          />
          <input
            type="text"
            disabled
            placeholder="UF"
            className="w-full border rounded-md p-2 mt-4"
            value={watch("address.uf") || ""}
          />

          <input type="submit" className="w-full mt-4" />
        </form>

        {/* <input type="text" placeholder="CNPJ" className="w-full border rounded-md p-2 mt-4" />
        <input type="text" placeholder="Razão Social" className="w-full border rounded-md p-2 mt-4" />
        <input type="text" placeholder="Número para contato" className="w-full border rounded-md p-2 mt-4" />
        <input type="text" placeholder="CEP" className="w-full border rounded-md p-2 mt-4" />
        <input type="text" placeholder="Rua" className="w-full border rounded-md p-2 mt-4" />
        <input type="text" placeholder="Bairro" className="w-full border rounded-md p-2 mt-4" />
        <input type="text" placeholder="Complemento" className="w-full border rounded-md p-2 mt-4" />
        <input type="text" placeholder="Franquia" className="w-full border rounded-md p-2 mt-4" /> */}
      </div>
    </div>
  );
}
