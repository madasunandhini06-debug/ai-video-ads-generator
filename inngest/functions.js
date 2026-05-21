import axios from "axios";
import { inngest } from "./client";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";



export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

//680c130f3cd1e391551f2cbb
export const CreateAvatar = inngest.createFunction(
  { id: 'create-avatar' },
  { event: 'create-avatar' },
  async ({ event, step }) => {
    const { avatarId, voiceUrl, videoRecordId } = event.data;
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL)
    const CreateAvatarId = await step.run(
      "GenerateAvatarId",
      async () => {
        // Get Avatar Generated ID
        const result = await axios.post('https://openapi.akool.com/api/open/v3/talkingavatar/create', {
          "width": 3840,
          "height": 2160,
          "avatar_from": 2,
          "elements": [
            {
              "type": "image",
              "url": '#ffffff00',
              "width": 3840,
              "height": 2160,
              "scale_x": 1,
              "scale_y": 1,
              "offset_x": 1920,
              "offset_y": 1080
            },
            {
              "type": "avatar",
              "scale_x": 1,
              "scale_y": 1,
              "width": 1920,
              "height": 1080,
              "offset_x": 1920,
              "offset_y": 1080,
              avatar_id: avatarId,
            },
            {
              "type": "audio",
              "url": voiceUrl
            }
          ],
        },
          {
            headers: {
              Authorization: 'Bearer ' + process.env.AKOOL_API_TOKEN
            }
          })
        const generatedAvatarId = result.data?.data?._id
        return generatedAvatarId
        //  return "680e733ea38d9dd6115b296c"
        // return "680c0b1c3cd1e391551f1050"
        //return "680ce73ba38d9dd611549dc5"

      }
    )

    const GenerateAvatar = await step.run(
      "GenerateAvatar",
      async () => {
        const poll = async (retries = 80, interval = 5000) => {
          for (let i = 0; i < retries; i++) {
            const pollRes = await axios.get('https://openapi.akool.com/api/open/v3/content/video/infobymodelid?video_model_id=' + CreateAvatarId,
              {
                headers: {
                  Authorization: 'Bearer ' + process.env.AKOOL_API_TOKEN
                }
              }
            );
            const status = pollRes?.data?.data?.video_status
            if (status === 3) {
              return pollRes.data.data.video;// Audio is Ready
            }
            else if (status == 4) {
              throw new Error("Audio processing failed");
            }

            await new Promise(resolve => setTimeout(resolve, interval))

          }


        }
        const avatarVideoUrl = await poll();
        return avatarVideoUrl;
      }
    )

    // Save/ Update to Our DB

    const UpdateToDb = await step.run(
      "UpdateToDb",
      async () => {
        const result = await convex.mutation(api.videoData.UpdateAvatarUrl, {
          vId: videoRecordId,
          avatarUrl: GenerateAvatar,
          status: 2
        })
      }
    )
  }
)
