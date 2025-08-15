"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import UploaderTwo from "@/components/ui/forms/uploader-two";
import { Close } from "../icons/close";

export default function FileInput({
  className,
  label,
  accept,
  onChange, // Добавляем onChange
}: {
  className?: string;
  label?: React.ReactNode;
  multiple?: boolean;
  accept?: any;
  onChange: (file: File | null) => void; // Добавляем тип для onChange
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = (event.target as HTMLInputElement).files;
    if (uploadedFiles && uploadedFiles.length > 0) {
      const file = uploadedFiles[0];
      setImage(file);
      onChange(file); // Вызываем onChange и передаем файл
    }
  };

  const handleImageDelete = () => {
    setImage(null);
    onChange(null); // Передаем null, если изображение удалено
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Очищаем поле ввода
    }
  };

  return (
    <div className={className}>
      {!image && (
        <UploaderTwo
          label={label}
          ref={fileInputRef}
          accept={accept}
          onChange={handleImageUpload}
        />
      )}
      {image && (
        <div className="flex items-center relative">
          <Image
            src={URL.createObjectURL(image)}
            alt={"Generated Photo"}
            width={100}
            height={100}
            className="w-full h-full object-contain mx-auto rounded-md sm:rounded-lg border border-gray-200 bg-white dark:border-input-light-dark dark:bg-light-dark"
          />
          <div className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center bg-brand text-white">
            <Close
              onClick={handleImageDelete}
              className="h-2 w-2 cursor-pointer transition duration-75"
            />
          </div>
        </div>
      )}
    </div>
  );
}
