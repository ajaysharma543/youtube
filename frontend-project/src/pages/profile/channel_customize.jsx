import React, { useState } from "react";
import { Upload } from "lucide-react";

function CustomizeChannel() {
  const [coverImage, setCoverImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemove = () => {
    setCoverImage(null);
    setPreview(null);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header Section */}
      <div className="h-[30%] flex items-center justify-between px-10 border-b border-gray-800">
        <h1 className="text-3xl font-bold">Customize Channel</h1>
        <div className="flex gap-4">
          <button className="bg-gray-800 hover:bg-gray-700 px-5 py-2 rounded-full font-semibold">
            View Your Channel
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-full font-semibold">
            Cancel
          </button>
          <button className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-full font-semibold">
            Publish
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 flex flex-col gap-6">
        {/* Cover Upload Section */}
        <div className="w-[60%] bg-gray-900 rounded-xl p-6 flex flex-col gap-6">
          <div className="flex items-center gap-6">
            {/* Preview or Upload Icon */}
            <div className="w-[90%] h-[180px] rounded-xl bg-gray-800 flex items-center justify-center overflow-hidden">
              {preview ? (
                <img
                  src={preview}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Upload className="w-40 h-40 text-gray-500" />
              )}
            </div>

            {/* Right Side - Description + Buttons */}
            <div className="flex flex-col justify-start gap-3">
              <p className="text-gray-400 text-base max-w-[90%]">
                Upload a custom cover image for your channel. Recommended size:
                2048x1152px. This image will appear at the top of your channel page.
              </p>

              {/* Buttons directly below paragraph */}
              {!preview ? (
                <label className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-full cursor-pointer font-semibold w-fit">
                  Upload Cover
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleCoverChange}
                  />
                </label>
              ) : (
                <div className="flex gap-3">
                  <label className="bg-gray-800 hover:bg-gray-700 px-5 py-2 rounded-full cursor-pointer font-semibold w-fit">
                    Change
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleCoverChange}
                    />
                  </label>
                  <button
                    onClick={handleRemove}
                    className="bg-gray-800 hover:bg-red-600 px-5 py-2 rounded-full font-semibold w-fit"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomizeChannel;
