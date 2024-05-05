"use client";
import { useForm } from "react-hook-form";

const AddComment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="mt-5 md:mt-10">
      <p>
        Leave a comment <span role="img">💬</span>
      </p>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <input {...register("firstName")} />
        <input {...register("lastName", { required: true })} />
        {errors.lastName && <p>Last name is required.</p>}
        <input {...register("age", { pattern: /\d+/ })} />
        {errors.age && <p>Please enter number for age.</p>}
        <input type="submit" />
      </form>
    </div>
  );
};

export default AddComment;
