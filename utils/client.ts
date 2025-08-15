import FileSaver from "file-saver";
import { generationOptions, surpriseMePrompts } from "@/constants/index";
import axios from "axios";
import toast from "react-hot-toast";

export function getRandomPrompt(prompt: any) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

export async function downloadImage(id: any, photo: any) {
  FileSaver.saveAs(photo, `${id}.jpg`);
}

export async function deleteImage(id: string, onDelete: (id: string) => void) {
  try {
    await axios.delete("/api/v1/post", {
      data: { id },
    });
    onDelete(id);
    toast.success("Your image was deleted successfully");
  } catch (err) {
    toast.error("Error deleting, try again later");
  }
}

export const shareImage = async (imageID: string, onShare: (id: string) => void) => {
  try {
    await axios.put("/api/v1/post", {
      imageID,
    });
    onShare(imageID)
    toast.success("Your image shared successfully");
  } catch (error) {
    toast.error("Some error, try again later");
  }
};

export const unshareImage = async (imageID: string, onUnshare: (id: string) => void) => {
  try {
    await axios.put("/api/v1/post", {
      imageID,
    });
    onUnshare(imageID)
    toast.success("Your image unshared successfully");
  } catch (error) {
    toast.error("Some error, try again later");
  }
};

export const calculateGenerationsPrice = (
  model: string,
  size: string,
  quality: string = "standard",
  style: string = "vivid"
) => {
  const modelOption = generationOptions.models.find((m) => m.value === model);
  const resolutionOption = generationOptions.resolutions[model].find(
    (r) => r.value === size
  );
  const qualityOption = generationOptions.qualities.find(
    (q) => q.value === quality
  );
  const styleOption = generationOptions.styles.find((s) => s.value === style);

  let basePrice = 0;

  if (modelOption) basePrice += modelOption.price;
  if (resolutionOption) basePrice += resolutionOption.price;
  if (model === "dall-e-3") {
    if (qualityOption) basePrice += qualityOption.price;
    if (styleOption) basePrice += styleOption.price;
  }

  return basePrice;
};
