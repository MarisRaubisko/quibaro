'use client';

import { Fragment, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { usePathname, useSearchParams } from 'next/navigation';
import { Dialog } from '@/components/ui/dialog';
import { Transition } from '@/components/ui/transition';
import { Button } from '@/components/ui/button';
import { Close } from '@/components/icons/close';
import { useModal, MODAL_VIEW } from '@/components/modal-views/context';
import { DialogPanel, TransitionChild } from '@headlessui/react';
// dynamic imports

const TopUpcontent = dynamic(() => import('@/components/modal-views/modal-content/top-up'));
const DeleteImage = dynamic(() => import('@/components/modal-views//modal-content/delete-image'));
const ShareImage = dynamic(() => import('@/components/modal-views/modal-content/share-image'));
const UnhareImage = dynamic(() => import('@/components/modal-views/modal-content/unshare-image'));
const WatchImage = dynamic(() => import('@/components/modal-views/modal-content/watch-image'));

function renderModalContent(view: MODAL_VIEW | string, data:any) {
  switch (view) {
    case 'TOPUP_VIEW':
      return <TopUpcontent/>;
    case 'DELETE_IMAGE_VIEW':
      return <DeleteImage deleteFunction={data}/>;
    case 'SHARE_IMAGE_VIEW':
      return <ShareImage shareFunction={data}/>;
    case 'UNSHARE_IMAGE_VIEW':
      return <UnhareImage shareFunction={data}/>;
    case 'GALLERY_IMAGE_VIEW':
      return <WatchImage image={data}/>;
    default:
      return null;
  }
}

export default function ModalContainer() {
  const { view, isOpen, closeModal, data } = useModal();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    closeModal();
  }, [pathname, searchParams, closeModal]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        className="fixed inset-0 z-50 h-full w-full overflow-y-auto overflow-x-hidden p-4 text-center sm:p-6 lg:p-8 xl:p-10 3xl:p-12"
        onClose={closeModal}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-40 cursor-pointer bg-gray-700 bg-opacity-60 backdrop-blur" />
        </TransitionChild>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="inline-block h-full align-middle" aria-hidden="true">
          &#8203;
        </span>

        {/* This element is need to fix FocusTap headless-ui warning issue */}
        <div className="sr-only">
          <Button
            size="sm"
            variant="ghost"
            onClick={closeModal}
            className="opacity-50 hover:opacity-80 rounded-full p-2"
          >
            <Close className="h-auto w-[13px]" />
          </Button>
        </div>

        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-105"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-105"
        >
          <DialogPanel
            className={'relative z-50 inline-block w-full text-left align-middle sm:w-auto'}
          >
            {view && renderModalContent(view, data)}
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
