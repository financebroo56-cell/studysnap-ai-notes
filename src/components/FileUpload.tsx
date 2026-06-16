import { useDropzone } from 'react-dropzone'
import { Upload, File } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void
  isLoading?: boolean
}

export default function FileUpload({ onFilesSelected, isLoading = false }: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])

  const onDrop = (acceptedFiles: File[]) => {
    const supportedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'image/jpeg', 'image/png']

    const validFiles = acceptedFiles.filter(file => {
      if (!supportedTypes.includes(file.type)) {
        toast.error(`${file.name} is not supported`)
        return false
      }
      if (file.size > 50 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 50MB)`)
        return false
      }
      return true
    })

    setFiles([...files, ...validFiles])
    onFilesSelected([...files, ...validFiles])
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: isLoading,
  })

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    onFilesSelected(newFiles)
  }

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          isDragActive
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
            : 'border-slate-300 dark:border-slate-700 hover:border-blue-400'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto mb-4 text-blue-600 dark:text-blue-400" size={32} />
        <p className="text-lg font-semibold mb-2">Drop files here or click to select</p>
        <p className="text-sm text-slate-600 dark:text-slate-400">Supported: PDF, DOCX, PPT, Images (Max 50MB)</p>
      </div>

      {files.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-4">Selected Files ({files.length})</h3>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <div className="flex items-center gap-2">
                  <File size={20} className="text-blue-600" />
                  <span className="text-sm truncate">{file.name}</span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
