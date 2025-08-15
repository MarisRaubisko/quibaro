"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import cn from "classnames";
import { Transition } from "@/components/ui/transition";
import { Listbox } from "@/components/ui/listbox";
import InputLabel from "@/components/ui/input-label";
import { ChevronDown } from "@/components/icons/chevron-down";
import { editingOptions } from "@/constants";
import preview from "@/assets/images/preview.png";
import {
  Description,
  Field,
  Label,
  Input,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import Loader from "@/components/ui/loader";
import axios from "axios";
import toast from "react-hot-toast";
import { downloadImage } from "@/utils/client";
import { useRouter } from "next/navigation";
import FileInput from "@/components/ui/file-input";
import Image from 'next/image';

const formSchema = z.object({
  prompt: z.string().optional(),
  style: z.string(),
  file: z
    .instanceof(File, { message: "Image is required." })
    .refine((file) => file.type.startsWith("image/"), {
      message: "The file must be an image.",
    })
    .refine((file) => file.size <= 10 * 1024 * 1024, {
      message: "The image size should not exceed 10MB.",
    }),
});

export default function ImageEditingScreen() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      style: "3D",
      file: undefined,
    },
  });

  const [photo, setPhoto] = useState<string>("");
  const [imageID, setImageID] = useState<string>("");
  const [sharedImageID, setSharedImageID] = useState<string>("");
  const [generatingImg, setGeneratingImg] = useState<boolean>(false);
  const [sharingImg, setSharingImg] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(6);

  const watchedStyle = form.watch("style");

  useEffect(() => {
    const style = editingOptions.style.find(
      (item) => item.label === watchedStyle
    );
    if (style?.price) {
      setPrice(style.price);
    }
  }, [watchedStyle]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setGeneratingImg(true);
      const formData = new FormData();
      formData.append("prompt", values.prompt || ""); // Добавляем prompt
      formData.append("style", values.style); // Добавляем style
      formData.append("file", values.file); // Добавляем файл (учитывая, что file - это массив)

      // Отправляем POST запрос
      const response = await axios.post("/api/v1/image-editing", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Устанавливаем заголовок
        },
      });

      setPhoto(response.data.image);
      setImageID(response.data.imageId);
      router.refresh();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        toast.error("Not enough generations.");
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setGeneratingImg(false);
    }
  };

  const handleShare = async () => {
    if (imageID === sharedImageID) {
      toast.error("You alreade share this image!");
    } else if (photo && imageID) {
      try {
        setSharingImg(true);
        await axios.put("/api/v1/post", {
          imageID,
        });
        toast.success("Your image shared successfully");
        setSharedImageID(imageID);
      } catch (error) {
        toast.error("Some error, try again later");
      } finally {
        setSharingImg(false);
      }
    } else {
      toast.error("Please generate the image first.");
    }
  };

  return (
    <>
      <div className="mx-auto w-full lg:px-8 xl:px-10 2xl:px-0 max-w-4xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:text-2xl">
            Portrait Editing
          </h2>
        </div>
        <div className="mb-8 mt-6 sm:mt-10">
          <InputLabel title="Edit your portrait image and share it with the community" />
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-8">
            <Field>
              <Label className="block text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
                Image<sup className="text-red-500 ml-1.5">*</sup>
              </Label>
              <Description className="mt-1 block text-xs tracking-tighter text-gray-600 dark:text-gray-400 sm:text-sm">
                Upload the portrait you want to edit.
              </Description>
              <Controller
                name="file"
                control={form.control}
                render={({ field: { onChange } }) => (
                  <FileInput
                    className="mt-3"
                    multiple
                    accept="img"
                    onChange={(files) => {
                      onChange(files);
                    }}
                  />
                )}
              />

              {form.formState.errors.file && (
                <p className="text-red-600 dark:text-red-500 pt-2 text-xs sm:text-sm tracking-tighter">
                  {form.formState.errors.file.message}
                </p>
              )}
            </Field>
          </div>
          <div className="mb-8">
            <Field>
              <div className="flex justify-between items-center">
                <div>
                  <Label className="block text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
                    Prompt
                  </Label>
                  <Description className="mt-1 block text-xs tracking-tighter text-gray-600 dark:text-gray-400 sm:text-sm">
                    Enter a prompt that describes the image you want to
                    generate.
                  </Description>
                </div>
              </div>
              <Input
                {...form.register("prompt")}
                disabled={generatingImg || sharingImg}
                className={cn(
                  "mt-3 block h-10 w-full rounded-md sm:rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm placeholder-gray-400 transition-shadow duration-200 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-input-light-dark dark:bg-light-dark dark:text-gray-100 dark:focus:border-white/60 dark:focus:ring-white/60 sm:h-12"
                )}
                placeholder="A person in a post apocalyptic"
              />
              {form.formState.errors.prompt && (
                <p className="text-red-600 dark:text-red-500 pt-2 text-xs sm:text-sm tracking-tighter">
                  {form.formState.errors.prompt.message}
                </p>
              )}
            </Field>
          </div>
          <div className="mb-8">
            <InputLabel
              title="Style"
              subTitle="Select the style of the image to be generated."
            />
            <div className="relative">
              <Controller
                name="style"
                control={form.control}
                render={({ field: { onChange, value } }) => (
                  <Listbox
                    value={value}
                    onChange={onChange}
                    disabled={generatingImg || sharingImg}
                  >
                    <ListboxButton className="text-case-inherit letter-space-inherit flex h-10 w-full items-center justify-between rounded-md sm:rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none transition-shadow duration-200 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-input-light-dark dark:bg-light-dark dark:text-gray-100 dark:hover:border-white/60 dark:hover:ring-white/60 sm:h-12 sm:px-5">
                      <div className="flex items-center">
                        {value?.toUpperCase()}
                      </div>
                      <ChevronDown />
                    </ListboxButton>
                    <Transition
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <ListboxOptions className="absolute left-0 z-10 mt-1 grid w-full origin-top-right gap-0.5 rounded-md sm:rounded-lg border border-gray-200 bg-white p-1 shadow-large outline-none dark:border-input-light-dark dark:bg-light-dark xs:p-2">
                        {editingOptions.style.map((option) => (
                          <ListboxOption
                            key={option.value}
                            value={option.value}
                          >
                            {({ selected }) => (
                              <div
                                className={`flex cursor-pointer items-center rounded-md sm:rounded-lg px-3 py-2 text-sm text-gray-900 transition dark:text-gray-100 ${
                                  selected
                                    ? "bg-gray-200/70 font-medium dark:bg-gray-400/60"
                                    : "hover:bg-gray-100 dark:hover:bg-gray-400/60"
                                }`}
                              >
                                {option.label}
                              </div>
                            )}
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </Transition>
                  </Listbox>
                )}
              />
            </div>
          </div>
          <div className="relative rounded-md sm:rounded-lg border border-gray-200 bg-white dark:border-input-light-dark dark:bg-light-dark mb-8 flex justify-center align-middle">
            {photo ? (
              <Image
                src={photo}
                alt={"Generated Photo"}
                width={500}
                height={500}
                className="w-full h-full object-contain mx-auto rounded-md sm:rounded-lg border border-gray-200 bg-white dark:border-input-light-dark dark:bg-light-dark"
              />
            ) : (
              <Image
                src={preview.src}
                alt="preview"
                width={500}
                height={500}
                className="w-9/12 h-9/12 object-contain opacity-40 dark:invert"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center rounded-md sm:rounded-lg">
                <Loader />
              </div>
            )}
          </div>
          <div>
            <p className="mt-2">Image generation price: {price} Generations.</p>
            <div className="flex justify-between gap-3  mt-3">
              <Button
                type="submit"
                disabled={generatingImg || sharingImg}
              >
                Generate image
              </Button>
              <Button
                type="button"
                className="mt-3"
                onClick={handleShare}
                disabled={!photo || generatingImg || sharingImg}
              >
                Share with the Community
              </Button>
            </div>
          </div>
          <div className="mt-10">
            <p className="block text-xs tracking-tighter text-white/60 dark:text-gray-400 sm:text-sm">
              ** Once you have created the image you want, you can share it with
              others in the community **
            </p>
            <Button
              type="button"
              className="mt-3"
              onClick={handleShare}
              disabled={!photo || generatingImg || sharingImg}
            >
              Share with the Community
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
