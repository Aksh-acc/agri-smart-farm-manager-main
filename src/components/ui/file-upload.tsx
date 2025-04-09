
import { useState, useRef, ChangeEvent } from 'react';
import { UploadCloud, X, Image as ImageIcon, Check } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
  label?: string;
}

const FileUpload = ({
  onFileSelect,
  accept = "image/*",
  maxSize = 5, // 5MB default
  className = "",
  label = "Upload Image",
}: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!file.type.match(accept.replace('*', '.*'))) {
      setError(`Invalid file type. Please upload ${accept} files.`);
      return false;
    }
    
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File is too large. Maximum size is ${maxSize}MB.`);
      return false;
    }

    return true;
  };

  const handleFile = (file: File) => {
    setError(null);
    
    if (!validateFile(file)) return;
    
    setFile(file);
    onFileSelect(file);
    
    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={`w-full ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept={accept}
        className="sr-only"
      />
      
      <div 
        className={`border-2 border-dashed rounded-lg p-6 transition-all duration-200 ${
          isDragging 
            ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-900/10' 
            : error 
              ? 'border-destructive/50 bg-destructive/10' 
              : file 
                ? 'border-primary-500/50 bg-primary-50/30 dark:bg-primary-900/10' 
                : 'border-border bg-background hover:border-primary-300 hover:bg-primary-50/30 dark:hover:bg-primary-900/5'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {!file ? (
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="rounded-full bg-primary-50 dark:bg-primary-900/20 p-3">
              <UploadCloud className="h-8 w-8 text-primary-600" />
            </div>
            <div>
              <p className="text-base font-medium">{label}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Drag & drop or <button type="button" className="text-primary-600 hover:underline" onClick={handleButtonClick}>browse</button>
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {accept.replace('*', 'any')} up to {maxSize}MB
              </p>
            </div>
          </div>
        ) : preview ? (
          <div className="space-y-4">
            <div className="relative mx-auto max-w-xs">
              <img 
                src={preview} 
                alt="Preview" 
                className="max-h-64 max-w-full mx-auto rounded-md object-contain" 
              />
              <button 
                type="button"
                onClick={handleRemove}
                className="absolute -top-2 -right-2 bg-white dark:bg-card rounded-full p-1 shadow-md hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            <div className="text-center text-sm text-muted-foreground flex items-center justify-center">
              <Check className="h-4 w-4 mr-1 text-green-500" />
              {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-3">
            <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded">
              <ImageIcon className="h-6 w-6 text-primary-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium flex items-center">
                <Check className="h-4 w-4 mr-1 text-green-500" />
                {file.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
            <button 
              type="button"
              onClick={handleRemove}
              className="p-1 hover:bg-muted rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        )}
      </div>
      
      {error && (
        <div className="mt-2 text-sm text-destructive flex items-center">
          <X className="h-4 w-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
