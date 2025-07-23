import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FileUploadCardProps {
  title: string;
  description: string;
  onFileUpload: (file: File) => void;
  uploadedFile: File | null;
  className?: string;
}

export function FileUploadCard({ 
  title, 
  description, 
  onFileUpload, 
  uploadedFile,
  className 
}: FileUploadCardProps) {
  const [dragActive, setDragActive] = useState(false);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.csv']
    },
    multiple: false,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  });

  return (
    <Card className={cn("relative overflow-hidden transition-spring hover:shadow-medium", className)}>
      <CardContent className="p-6">
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-smooth",
            "hover:border-primary hover:bg-gradient-subtle",
            dragActive || isDragActive 
              ? "border-primary bg-primary/5 scale-[1.02]" 
              : uploadedFile 
                ? "border-success bg-success/5" 
                : "border-border"
          )}
        >
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center space-y-4">
            {uploadedFile ? (
              <CheckCircle className="h-12 w-12 text-success animate-fade-in" />
            ) : dragActive || isDragActive ? (
              <Upload className="h-12 w-12 text-primary animate-pulse" />
            ) : (
              <FileText className="h-12 w-12 text-muted-foreground" />
            )}
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
              
              {uploadedFile ? (
                <div className="flex items-center justify-center space-x-2 text-success">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">{uploadedFile.name}</span>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Drop your CSV file here or click to browse
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}