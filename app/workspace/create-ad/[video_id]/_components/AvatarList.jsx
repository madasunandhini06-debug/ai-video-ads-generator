import axios from "axios";
import { Upload, User } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function AvatarList({ videoData, onHandleInputChange }) {
  const [avatarList, setAvatarList] = useState([]);
  const [uploadedAvatar, setUploadedAvatar] = useState(null);

  useEffect(() => {
    GetAvatarList();
  }, []);

  const GetAvatarList = async () => {
    const result = await axios.get("/api/get-avatar-list");
    console.log("Avatar list:", result.data);

    setAvatarList([
      {
        _id: "demo-avatar-1",
        avatar_id: "demo-avatar-1",
        name: "Demo Avatar",
        thumbnailUrl: "/advertisement.png",
      },
    ]);
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setUploadedAvatar(previewUrl);

    const customAvatar = {
      _id: "uploaded-avatar",
      avatar_id: "uploaded-avatar",
      name: file.name,
      thumbnailUrl: previewUrl,
      file: file,
    };

    onHandleInputChange("avatar", customAvatar);
  };

  return (
    <div className="p-5 mt-5 shadow rounded-xl">
      <h2 className="font-bold text-lg flex gap-2 items-center">
        <User className="p-2 bg-red-600 text-white h-10 w-10 rounded-md" />
        Select Avatar
      </h2>

      <hr className="my-3" />

      <div>
        <label>Select Your Fav Avatar for video ad</label>

        <div className="mt-3">
          <label className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer">
            <Upload size={18} />
            Upload Avatar
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />
          </label>
        </div>

        {uploadedAvatar && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Uploaded Avatar</p>
            <Image
              src={uploadedAvatar}
              alt="Uploaded Avatar"
              width={100}
              height={100}
              className="rounded-lg bg-black border border-primary"
            />
          </div>
        )}

        <div className="flex flex-wrap gap-5 h-[200px] overflow-auto mt-3">
          {avatarList?.length > 0 ? (
            avatarList.map(
              (avatar, index) =>
                index <= 70 && (
                  <div
                    key={index}
                    onClick={() => onHandleInputChange("avatar", avatar)}
                    className={`${
                      videoData?.avatar?._id == avatar?._id &&
                      "border border-primary bg-blue-100 text-primary"
                    } p-1 rounded-lg cursor-pointer`}
                  >
                    <Image
                      src={
                        avatar?.thumbnailUrl ||
                        avatar?.previewUrl ||
                        avatar?.image ||
                        "/advertisement.png"
                      }
                      alt={avatar?.name || "avatar"}
                      width={100}
                      height={100}
                      className="rounded-lg bg-black"
                    />

                    <h2 className="text-center text-sm">
                      {avatar?.name || "Avatar"}
                    </h2>
                  </div>
                )
            )
          ) : (
            <p className="text-gray-500">Loading avatars...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AvatarList;