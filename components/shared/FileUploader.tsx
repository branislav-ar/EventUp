'use client'

import { useCallback, Dispatch, SetStateAction } from 'react'
import { useDropzone } from '@uploadthing/react/hooks'
import { generateClientDropzoneAccept } from 'uploadthing/client'

import { Button } from '@/components/ui/button'
import { convertFileToUrl } from '@/lib/utils'

type FileUploadProps = {
    onFieldChange: (value: string) => void
    imageUrl: string
    setFiles: Dispatch<SetStateAction<File[]>>
}
 
const FileUploader = ({imageUrl, onFieldChange, setFiles }: FileUploadProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles),
    onFieldChange(convertFileToUrl(acceptedFiles[0]))
  }, []);

  const handleRemoveImage = useCallback(() => {
    onFieldChange('');
    setFiles([]);
  }, [onFieldChange, setFiles]);
 
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });
 
  return (
    <div 
    {...getRootProps()} 
    className="flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50"
    >
      <input
      {...getInputProps()} 
      className="cursor-pointer"/>

      { imageUrl ? (
        <div className="relative flex h-full w-full flex-1 justify-center">
          <img
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />
          <Button type="button"
                  className="text-[#395E6F] bg-[#F6F8FD] hover:bg-[#f3fbff] rounded-full absolute left-3 top-3"
                  onClick={() => handleRemoveImage()}>
            Ukloni sliku
          </Button>  
        </div>
      ) : (
        <div className="flex-center flex-col py-5 text-grey-500">
          <img src="/assets/icons/upload.svg" width={77} height={77} alt="file upload" />
          <h3 className="mb-2 mt-2">Prevuci sliku ovde</h3>
          <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
          <Button type="button" className="bg-[#395E6F] hover:bg-[#4b6977] rounded-full">
            Izaberite sa uređaja
          </Button>
        </div>
      )}
    </div>
  );
}

export default FileUploader