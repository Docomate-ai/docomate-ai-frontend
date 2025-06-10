import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { useEffect } from "react";
import LoadingSpinner from "@/components/loader";
import { toast } from "sonner";

// Zod schema
const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  groqApi: z.string().optional(),
  jinaApi: z.string().optional(),
  urls: z
    .array(
      z.object({
        value: z
          .string()
          .min(1, "URL is required")
          .url("Please enter a valid URL"),
      })
    )
    .min(1, "At least one URL is required")
    .max(5, "At most 5 urls can be added"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function Profile() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "Gitanshu sankhla",
      email: "example@mail.com",
      groqApi: "",
      jinaApi: "",
      urls: [{ value: "https://github.com/Gitax18" }],
    },
  });

  const {
    data,
    isError,
    isFetched,
    error: queryErr,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await axios.post("/users/user");
      return user;
    },
  });

  const mutation = useMutation({
    mutationKey: ["user"],
    mutationFn: async (data: ProfileFormData) => {
      const newUrls = data.urls.map((urlObj) => urlObj.value);
      const postBody = { ...data, urls: newUrls };
      const updateUser = await axios.patch("/users/update-user", postBody);
      return updateUser;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
    onError: (err) => {
      console.log("Error updating user:", err);
      toast.error(`Error updating user: ${err.message}`);
    },
  });

  const { fields, append, remove } = useFieldArray<ProfileFormData>({
    control,
    name: "urls",
  });

  const onSubmit = (data: ProfileFormData) => {
    mutation.mutate(data);
    reset(data);
  };

  useEffect(() => {
    if (isError) {
      toast.error(queryErr.message);
    }
  }, [isError, queryErr]);

  // useEffect(() => {
  //   if (isFetched && !isError && data?.data?.data?.user) {
  //     reset(data.data.data.user);
  //   }
  // }, [isFetched, isError, data, reset]);

  useEffect(() => {
    if (isFetched && !isError && data?.data?.data?.user) {
      const user = data.data.data.user;
      reset({
        ...user,
        groqApi: user.groqApi || "",
        jinaApi: user.jinaApi || "",
        urls: Array.isArray(user.urls)
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            user.urls.map((u: any) =>
              typeof u === "string" ? { value: u } : u
            )
          : [{ value: "" }],
      });
    }
  }, [isFetched, isError, data, reset]);

  if (isLoading) {
    return <LoadingSpinner messages={["Loading profile..."]} />;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-zinc-900 shadow rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            {...register("name")}
            type="text"
            className={`w-full px-4 py-2 border rounded-md bg-white dark:bg-zinc-800 ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email (Disabled) */}
        <div>
          <label className="block font-medium mb-1">Email (read-only)</label>
          <input
            {...register("email")}
            type="email"
            disabled
            className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-zinc-700 text-gray-500"
          />
        </div>

        {/* Groq API */}
        <div>
          <label className="block font-medium mb-1">Groq API</label>
          <input
            {...register("groqApi")}
            type="text"
            className={`w-full px-4 py-2 border rounded-md bg-white dark:bg-zinc-800 ${
              errors.groqApi ? "border-red-500" : ""
            }`}
            placeholder="Enter your Groq API key"
          />
          {errors.groqApi && (
            <p className="text-red-500 text-sm mt-1">
              {errors.groqApi.message}
            </p>
          )}
        </div>

        {/* Jina API */}
        <div>
          <label className="block font-medium mb-1">Jina API</label>
          <input
            {...register("jinaApi")}
            type="text"
            className={`w-full px-4 py-2 border rounded-md bg-white dark:bg-zinc-800 ${
              errors.jinaApi ? "border-red-500" : ""
            }`}
            placeholder="Enter your Jina API key"
          />
          {errors.jinaApi && (
            <p className="text-red-500 text-sm mt-1">
              {errors.jinaApi.message}
            </p>
          )}
        </div>

        {/* URLs */}
        <div>
          <label className="block font-medium mb-2">URLs</label>
          {fields.map((field, index) => (
            <div key={field.id} className="mb-3">
              <div className="flex items-center gap-2">
                <input
                  {...register(`urls.${index}.value`)}
                  placeholder="https://yourlink.com"
                  className="flex-1 px-4 py-2 border rounded-md"
                />
                <button type="button" onClick={() => remove(index)}>
                  Remove
                </button>
              </div>
              {errors.urls?.[index]?.value && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.urls[index]?.value?.message}
                </p>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ value: "" })}
            disabled={fields.length >= 5} // Disable button if length is 5
            className={`mt-2 text-sm transition ${
              fields.length >= 5
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:underline"
            }`}
          >
            + Add URL
          </button>
          {typeof errors.urls?.message === "string" && (
            <p className="text-red-500 text-sm mt-1">{errors.urls.message}</p>
          )}
        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={!isDirty}
          className={`w-full mt-4 py-2 rounded-md text-white transition ${
            isDirty
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
