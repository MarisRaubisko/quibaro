"use client";

import Button from "@/components/ui/button/index";
import { useModal } from "@/components/modal-views/context";

export default function DeleteImage({deleteFunction}: any) {
  const { closeModal } = useModal();

  const deleteButton = () =>{
    deleteFunction()
    closeModal()
  }

  return (
    <div className="relative z-50 mx-auto w-[500px] max-w-full rounded-lg bg-white px-8 py-8 dark:bg-light-dark">
      <h2 className="mb-4 text-center text-2xl font-medium uppercase text-gray-900 dark:text-white">
        Image Deleting
      </h2>
      <p className="text-center text-sm leading-loose tracking-tight text-gray-600 dark:text-gray-400">
      Are you sure you want to delete the generated image? <br className="hidden md:block"/>This action cannot be undone.
      </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            className="w-full"
            shape="rounded"
            onClick={deleteButton}
          >
            Delete Image
          </Button>
          <Button
            className="w-full"
            shape="rounded"
            onClick={closeModal}
          >
            Close
          </Button>
      </div>
    </div>
  );
}
