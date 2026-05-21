"use client";

import { api } from "@/convex/_generated/api";
import { useConvex, useMutation } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Script from "./_components/Script";
import UploadFiles from "./_components/UploadFiles";
import AvatarList from "./_components/AvatarList";
import VoiceList from "./_components/VoiceList";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Sparkles } from "lucide-react";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";
import { toast } from "sonner";

function CreateVideo() {
  const { video_id } = useParams();

  const [videoData, setVideoData] = useState();
  const [loading, setLoading] = useState(false);

  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const convex = useConvex();
  const router = useRouter();

  const createVideoDataEntry = useMutation(api.videoData.updateInitialVideoData);
  const UpdateUserCredits = useMutation(api.users.updateUserCredits);

  useEffect(() => {
    GetVideoData();
  }, []);

  const GetVideoData = async () => {
    try {
      const result = await convex.query(api.videoData.GetVideoDataById, {
        vid: video_id,
      });

      console.log(result);
      setVideoData(result);
    } catch (error) {
      console.log(error);
    }
  };

  const onHandleInputChange = (field, value) => {
    setVideoData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const GenerateVideo = async () => {
    try {
      if (!videoData?.script || !videoData?.avatar || !videoData?.voice) {
        toast("Please select all fields");
        return;
      }

      setLoading(true);

      // Demo asset instead of ImageKit upload
      const demoAssets = [
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
      ];

      onHandleInputChange("assets", demoAssets);

      // Generate Voice
      const voiceResult = await axios.post("/api/create-voice", {
        script: videoData?.script,
        voiceId: videoData?.voice?.voice_id,
      });

      console.log(voiceResult.data);

      onHandleInputChange("voiceUrl", voiceResult.data?.audioUrl);

      // Generate Avatar
      const avatarResult = await axios.post("/api/create-avatar", {
        voiceUrl: voiceResult.data?.audioUrl,
        avatarId: videoData?.avatar?.avatar_id,
        videoRecordId: video_id,
      });

      console.log(avatarResult.data);

      // Save data to Convex
      await createVideoDataEntry({
        topic: videoData?.topic,
        scriptVariant: videoData?.scriptVariant,
        videoDataRecordId: video_id,
        assets: demoAssets,
        avatar: videoData?.avatar,
        script: videoData?.script,
        voice: videoData?.voice,
        voiceUrl: voiceResult.data?.audioUrl,
      });

      // Update local credits
      setUserDetail((prev) => ({
        ...prev,
        credits: Number(userDetail?.credits || 100) - 10,
      }));

      // Update credits in Convex
      await UpdateUserCredits({
        credits: Number(userDetail?.credits || 100) - 10,
        uid: userDetail?._id || "demo-user",
      });

      setLoading(false);
      toast("Video generation started");
      router.replace("/workspace");
    } catch (error) {
      console.log(error);
      toast("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="font-bold text-2xl">Create Video Ad</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-5">
        <div className="md:col-span-2">
          <Script
            videoData={videoData}
            onHandleInputChange={onHandleInputChange}
          />

          <UploadFiles
            videoData={videoData}
            onHandleInputChange={onHandleInputChange}
          />

          <AvatarList
            videoData={videoData}
            onHandleInputChange={onHandleInputChange}
          />

          <VoiceList
            videoData={videoData}
            onHandleInputChange={onHandleInputChange}
          />

          <Button
            className="mt-5 w-full"
            onClick={GenerateVideo}
            disabled={loading}
          >
            {loading ? <LoaderCircle className="animate-spin" /> : <Sparkles />}
            Generate
          </Button>
        </div>

        <div>
          <h2 className="font-bold text-lg">Preview</h2>
        </div>
      </div>
    </div>
  );
}

export default CreateVideo;