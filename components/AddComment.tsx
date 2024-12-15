"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AddComment = ({ postId }: { postId: string }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data: any) => {
    const { name, email, comment } = data;

    const res = await fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, comment, postId }),
    });

    if (res.ok) {
      toast.success("Comment added successfully!");
      // alert("Comment added successfully!");
      reset();
      router.refresh();
    } else {
      console.log("Failed to add a comment");
      toast.error("Failed to add a comment we will fix it later!");
      // console.log("Failed to add a comment");
      return;
    }
  };

  return (
    <div className="mt-5 md:mt-10 text-dark1 dark:text-white1">
      <p>
        Leave a comment <span role="img">💬</span>
      </p>
      <form
        className="flex flex-col border dark:border-white1 shadow-sm rounded-md md:px-8 px-2 md:py-6 py-3 mb-10"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <label>Name</label>
        <input
          className="mb-4 px-2 py-2 rounded-md bg-[#EAEEF1] dark:bg-dark2"
          {...register("name", { required: true, maxLength: 100 })}
        />
        {errors.name && (
          <p className="text-xs text-red-600">
            Name is required and max 100 characters
          </p>
        )}
        <label>Email</label>
        <input
          className="mb-4 px-2 py-2 rounded-md bg-[#EAEEF1] dark:bg-dark2"
          {...register("email", {
            required: true,
            maxLength: 100,
            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          })}
        />
        {errors.email && (
          <p className="text-xs text-red-600">
            Please enter a valid email address.
          </p>
        )}
        <label>
          Comment{" "}
          <span className="text-xs">(Your email will not published!)</span>
        </label>
        <textarea
          rows={4}
          className="mb-4 px-2 py-2 rounded-md bg-[#EAEEF1] dark:bg-dark2"
          {...register("comment", {
            required: true,
            minLength: 10,
            maxLength: 1000,
          })}
        />
        {errors.comment && (
          <p className="text-xs text-red-600">comment at least 10 characters</p>
        )}
        <input
          className={`text-center cursor-pointer text-white font-semibold bg-gradient-to-r from-gray-800 to-black px-3 py-1 md:px-5 md:py-2 rounded-md border border-gray-600 hover:scale-105 duration-200 hover:text-gray-500 hover:border-gray-800 hover:from-black hover:to-gray-900 ${
            isSubmitting ? "opacity-65" : ""
          }`}
          type="submit"
          value={isSubmitting ? "Submitting..." : "Submit"}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

export default AddComment;
