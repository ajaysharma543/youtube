import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ImageUploader from "./imageuploader";
import authApi from "../../api/userapi";
import { Loader2 } from "lucide-react"; 

function CustomizeChannel() {
  const {
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      banner: null,
      avatar: null,
    },
  });

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  const banner = watch("banner");
  const avatar = watch("avatar");
  const isPublishDisabled = !banner && !avatar || loading;

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setServerError(null);
      clearErrors();

      let avatarResponse = null;
      let bannerResponse = null;

      if (data.avatar) {
        const avatarData = new FormData();
        avatarData.append("avatar", data.avatar);
        avatarResponse = await authApi.changeavatar(avatarData);
      }

      if (data.banner) {
        const bannerData = new FormData();
        bannerData.append("coverImage", data.banner);
        bannerResponse = await authApi.coverimage(bannerData);
      }

      console.log("✅ Avatar Response:", avatarResponse?.data);
      console.log("✅ Banner Response:", bannerResponse?.data);
    } catch (error) {
      console.error("❌ Upload error:", error);
      setServerError("Failed to upload images. Please try again.");
      setError("api", { message: "Upload failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="h-[30%] flex items-center justify-between px-10 pb-4 border-b border-gray-800">
        <h1 className="text-3xl font-bold">Customize Channel</h1>
        <div className="flex gap-4">
          <button
            type="button"
            className="bg-gray-800 hover:bg-gray-700 px-5 py-2 rounded-full font-semibold"
          >
            View Your Channel
          </button>
          <button
            type="button"
            className="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-full font-semibold"
          >
            Cancel
          </button>

          <button
            form="channelForm"
            type="submit"
            disabled={isPublishDisabled}
            className={`px-5 py-2 rounded-full font-semibold flex items-center justify-center gap-2 transition-all ${
              isPublishDisabled
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 cursor-pointer"
            }`}
          >
            {loading && <Loader2 className="animate-spin w-5 h-5" />}
            {loading ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>

      <form
        id="channelForm"
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 p-10 flex flex-col gap-10"
      >
        <Controller
          name="banner"
          control={control}
          render={({ field: { onChange, value } }) => (
            <ImageUploader
              title="Banner Image"
              description="This image will appear at the top of your channel page."
              value={value}
              onChange={onChange}
              des="For best results, use an image at least 2048 x 1152 pixels and 6MB or less."
              recommendedSize="2048x1152px"
            />
          )}
        />
         {serverError && (
          <p className="text-red-500 text-sm font-medium mt-4">
            {serverError}
          </p>
        )}
        {errors.api && (
          <p className="text-red-500 text-sm font-medium">
            {errors.api.message}
          </p>
        )}

        <Controller
          name="avatar"
          control={control}
          render={({ field: { onChange, value } }) => (
            <ImageUploader
              title="Avatar Image"
              description="This image represents your channel profile picture."
              value={value}
              onChange={onChange}
              des="Use a 98 x 98 pixel PNG or GIF (no animations), 4MB or less."
              recommendedSize="800x800px"
            />
          )}
        />

        {serverError && (
          <p className="text-red-500 text-sm font-medium mt-4">
            {serverError}
          </p>
        )}
        {errors.api && (
          <p className="text-red-500 text-sm font-medium">
            {errors.api.message}
          </p>
        )}
      </form>
    </div>
  );
}

export default CustomizeChannel;
