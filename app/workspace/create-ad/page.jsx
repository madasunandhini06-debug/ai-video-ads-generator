"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import axios from "axios";
import { useMutation } from "convex/react";
import { LoaderCircle, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "sonner";

function CreateAd() {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { userDetail } = useContext(UserDetailContext);
  const router = useRouter();

  const CreateNewVideoData = useMutation(api.videoData.CreateNewVideoData);

  const GenerateAIVideoScript = async () => {
    try {
      if (!userInput || userInput.trim() === "") {
        toast("Please enter a topic");
        return;
      }

      if (userDetail?.credits < 10) {
        toast("Please add more credits!");
        return;
      }

      setLoading(true);

      const result = await axios.post("/api/generate-script", {
        topic: userInput,
      });

      console.log("Script API result:", result.data);

      const RAWResult = result?.data
        ?.replace("```json", "")
        ?.replace("```", "")
        ?.trim();

      const JSONResult = JSON.parse(RAWResult);

      const resp = await CreateNewVideoData({
        uid: userDetail?._id || "demo-user",
        topic: userInput,
        scriptVariant: JSONResult,
      });

      console.log("Created video id:", resp);

      if (!resp) {
        toast("Video data not created");
        setLoading(false);
        return;
      }

      setLoading(false);

      router.push("/workspace/create-ad/" + resp);
    } catch (error) {
      console.error("Generate video script error:", error);
      toast("Something went wrong. Check terminal.");
      setLoading(false);
    }
  };

  return (
    <div className="mt-20 flex flex-col items-center justify-center w-full">
      <div>
        <Image src="/advertisement.png" alt="icon" width={150} height={150} />
      </div>

      <h2 className="font-bold text-2xl text-center">
        🎥 Create AI Video Ads in Just One Click!
      </h2>

      <p className="mt-3 text-lg text-gray-500">
        🚀 Turn your ideas into stunning, scroll-stopping videos — instantly,
        effortlessly, and without editing skills!
      </p>

      <Input
        placeholder="Enter the topic or product info"
        className="w-lg text-lg mt-5"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />

      <Button className="mt-5 w-md" onClick={GenerateAIVideoScript} disabled={loading}>
        {loading ? <LoaderCircle className="animate-spin" /> : <Sparkles />}
        Generate
      </Button>
    </div>
  );
}

export default CreateAd;