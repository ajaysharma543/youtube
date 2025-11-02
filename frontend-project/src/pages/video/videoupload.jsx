import React, { useState } from "react";

function VideoUpload() {
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 flex items-start justify-center">
      <div className="w-full max-w-6xl flex gap-8">
        
        <div className="w-1/2 space-y-6">
          <h1 className="text-2xl font-bold mb-4">Upload Video</h1>

          <div>
            <label className="block mb-2 text-sm font-semibold">Title</label>
            <input
              type="text"
              placeholder="Enter video title"
              className="w-full p-3 rounded-lg bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">Description</label>
            <textarea
              rows="6"
              placeholder="Enter video description"
              className="w-full p-3 rounded-lg bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
        </div>

        <div className="w-1/2 flex flex-col items-center justify-center bg-gray-900 rounded-lg p-6">
          {!preview ? (
            <label className="border-2 border-dashed border-gray-600 p-10 rounded-lg cursor-pointer hover:border-blue-500 transition text-center">
              <p className="text-gray-400">Click to upload video</p>
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleVideoChange}
              />
            </label>
          ) : (
            <div className="w-full flex flex-col items-center">
              <div className="w-full aspect-video max-h-[400px] overflow-hidden rounded-lg border border-gray-700">
                <video
                  src={preview}
                  controls
                  className="w-full h-full object-cover"
                ></video>
              </div>

              <button
                className="mt-3 text-red-400 underline hover:text-red-300"
                onClick={() => {
                  setPreview(null);
                  setVideo(null);
                }}
              >
                Remove video
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default VideoUpload;
