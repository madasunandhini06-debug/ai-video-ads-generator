import axios from "axios";
import { Mars, Mic, PlayCircleIcon, Upload, Venus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

function VoiceList({ videoData, onHandleInputChange }) {
  const [voiceList, setVoiceList] = useState([]);
  const [playAudio, setPlayAudio] = useState();
  const [uploadedVoiceName, setUploadedVoiceName] = useState("");
  const audioRef = useRef(null);

  useEffect(() => {
    GetVoiceList();
  }, []);

  const GetVoiceList = async () => {
    const result = await axios.get("/api/get-voice-list");
    console.log("Voice list:", result.data);

    setVoiceList([
      {
        _id: "voice-1",
        voice_id: "voice-1",
        name: "Emma",
        accent: "English",
        description: "Soft female voice",
        gender: "Female",
      },
      {
        _id: "voice-2",
        voice_id: "voice-2",
        name: "Sophia",
        accent: "American",
        description: "Professional female voice",
        gender: "Female",
      },
      {
        _id: "voice-3",
        voice_id: "voice-3",
        name: "James",
        accent: "British",
        description: "Deep male voice",
        gender: "Male",
      },
      {
        _id: "voice-4",
        voice_id: "voice-4",
        name: "David",
        accent: "English",
        description: "Friendly male voice",
        gender: "Male",
      },
    ]);
  };

  const handleVoiceUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const audioUrl = URL.createObjectURL(file);
    setUploadedVoiceName(file.name);
    setPlayAudio(audioUrl);

    const customVoice = {
      _id: "uploaded-voice",
      voice_id: "uploaded-voice",
      name: file.name,
      accent: "Custom",
      description: "Uploaded voice file",
      gender: "Female",
      preview: audioUrl,
      file: file,
    };

    onHandleInputChange("voice", customVoice);
  };

  useEffect(() => {
    if (audioRef?.current && playAudio) {
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [playAudio]);

  return (
    <div className="p-5 shadow rounded-xl mt-6">
      <h2 className="font-bold text-lg flex gap-2 items-center">
        <Mic className="p-2 bg-purple-500 text-white h-10 w-10 rounded-md" />
        Select Voice
      </h2>

      <hr className="my-3" />

      <audio controls ref={audioRef} className="hidden">
        <source src={playAudio} type="audio/mp3" />
      </audio>

      <div>
        <label>Select Voice for your video ad</label>

        <div className="mt-3">
          <label className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md cursor-pointer">
            <Upload size={18} />
            Upload Voice
            <input
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleVoiceUpload}
            />
          </label>
        </div>

        {uploadedVoiceName && (
          <p className="mt-3 text-sm text-primary">
            Uploaded Voice: {uploadedVoiceName}
          </p>
        )}

        <div className="grid grid-cols-2 gap-5 w-full h-[200px] overflow-auto mt-3">
          {voiceList?.length > 0 ? (
            voiceList.map((voice, index) => (
              <div
                key={index}
                className={`flex justify-between items-center border rounded-md p-4 w-full cursor-pointer ${
                  videoData?.voice?._id == voice?._id &&
                  "bg-blue-100 text-primary border-primary"
                }`}
                onClick={() => onHandleInputChange("voice", voice)}
              >
                <div className="flex gap-3 items-center">
                  <PlayCircleIcon
                    className="text-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPlayAudio(
                        voice?.preview ||
                          voice?.preview_url ||
                          voice?.audioUrl ||
                          voice?.url
                      );
                    }}
                  />

                  <div>
                    <h2 className="font-medium">{voice?.name || "Voice"}</h2>

                    <h2 className="text-xs text-gray-500">
                      {voice?.accent || "English"}{" "}
                      {voice?.description ? `(${voice.description})` : ""}
                    </h2>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  {voice?.gender === "Male" ||
                  voice?.gender === "male" ? (
                    <Mars className="text-blue-600" />
                  ) : (
                    <Venus className="text-pink-600" />
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Loading voices...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default VoiceList;