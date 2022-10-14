import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const login = async (data: any) => {
    const response = await fetch("http://localhost:8080/api/franchise/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataResponse = await response.json();

    return dataResponse;
  };

  const mutation = useMutation(login, {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data, {
      onSuccess(data, variables, context) {
        navigate("/");
      },
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-1/3" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">Email is required.</p>
          )}

          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">Password is required.</p>
          )}

          <input
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 cursor-pointer w-full"
            type="submit"
          />

          <p className="text-center text-gray-500 text-xs mt-4">
            &copy;2021 Acme Corp. All rights reserved.
          </p>

          <p className="text-center text-gray-500 text-xs">
            <a className="text-blue-500 hover:text-blue-800" href="#">
              Forgot Password?
            </a>
          </p>

          <p className="text-center text-gray-500 text-xs">
            <a className="text-blue-500 hover:text-blue-800" href="/register">
              Create an Account.
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
