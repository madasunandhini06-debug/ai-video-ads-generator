"use client";

import { Button } from "@/components/ui/button";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { LoaderCircle } from "lucide-react";
import moment from "moment/moment";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

function VideoList() {
  const [videoList, setVideoList] = useState([]);
  const convex = useConvex();

  const context = useContext(UserDetailContext);

  // Temporary demo user because Clerk auth is disabled
  const userDetail = context?.userDetail || {
    _id: "demo-user",
  };

  useEffect(() => {
    if (userDetail?._id) {
      GetUserVideoList();
    }
  }, [userDetail?._id]);

  const GetUserVideoList = async () => {
    try {
      const result = await convex.query(api.videoData.GetUsersVideo, {
        uid: userDetail?._id,
      });

      console.log(result);
      setVideoList(result || []);

      const isPendingVideo = result?.find((item) => item.status == 1);

      if (isPendingVideo) {
        GetPendingVideoStatus(isPendingVideo);
      }
    } catch (error) {
      console.error("Error fetching video list:", error);
    }
  };

  const GetPendingVideoStatus = (pendingVideo) => {
    const intervalId = setInterval(async () => {
      try {
        const result = await convex.query(api.videoData.GetVideoDataById, {
          vid: pendingVideo?._id,
        });

        if (result?.status == 2) {
          clearInterval(intervalId);
          console.log("Completed Video Generation...");
          GetUserVideoList();
        }
      } catch (error) {
        clearInterval(intervalId);
        console.error("Error checking video status:", error);
      }
    }, 5000);
  };

  return (
    <div>
      {videoList?.length == 0 ? (
        <div className="flex items-center justify-center mt-10 flex-col">
          <Image
            src="/advertisement.png"
            alt="ads"
            width={200}
            height={200}
          />

          <h2 className="font-medium text-xl">
            You don't have any video ads created! Create new one
          </h2>

          <Link href="/workspace/create-ad">
            <Button className="mt-5">+ Create New Video Ad</Button>
          </Link>
        </div>
      ) : (
        <div className="flex gap-7 flex-wrap mt-10">
          {videoList?.map(
            (video, index) =>
              video?.status && (
                <Link
                  key={index}
                  className="relative cursor-pointer"
                  href={"/workspace/view-ads/" + video?._id}
                >
                  <div className="absolute bottom-0 p-5 w-full bg-black rounded-b-lg">
                    <h2 className="text-white">{video?.topic}</h2>
                    <h2 className="text-white opacity-55">
                      {moment(video?._creationTime).fromNow()}
                    </h2>
                  </div>

                  {video?.status == 1 ? (
                    <div className="flex gap-4 items-center justify-center h-[450px] w-[300px] bg-gray-400 rounded-lg">
                      <LoaderCircle className="animate-spin" />
                      <h2 className="text-lg">Generating Avatar...</h2>
                    </div>
                  ) : (
                    <Image
                      src={video?.assets?.[0] || "/advertisement.png"}
                      alt={video?.topic || "video ad"}
                      width={300}
                      height={500}
                      className="w-[300px] h-[450px] object-cover rounded-lg"
                    />
                  )}
                </Link>
              )
          )}
        </div>
      )}
    </div>
  );
}

export default VideoList;