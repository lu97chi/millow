import Image from "next/image";
import { cn } from "@/lib/utils";
import { FC, useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface PropertyImageProps {
  src: string | undefined;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export const PropertyImage: FC<PropertyImageProps> = ({
  src,
  alt,
  fill = false,
  width,
  height,
  className,
  priority = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  
  // Default placeholder for properties when there's an error
  const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Cpath d='M30 40 L50 20 L70 40 L70 70 L30 70 Z' fill='%23d1d5db'/%3E%3C/svg%3E";

  // Reset states when src changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setRetryCount(0);
  }, [src]);

  const handleError = () => {
    if (retryCount < maxRetries) {
      // Wait a bit longer between each retry
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setIsLoading(true);
      }, 1000 * (retryCount + 1));
    } else {
      setIsLoading(false);
      setHasError(true);
    }
  };

  // If we've hit max retries, show placeholder
  if (hasError) {
    return (
      <div className={cn("relative bg-muted", className)}>
        <Image
          src={placeholderImage}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          className="object-cover"
          priority={priority}
        />
      </div>
    );
  }

  return (
    <div className={cn("relative bg-muted", className)}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            {retryCount > 0 && (
              <p className="text-xs text-muted-foreground">
                Reintentando... ({retryCount}/{maxRetries})
              </p>
            )}
          </div>
        </div>
      )}
      <Image
        key={`${src}-${retryCount}`} // Force remount on retry
        src={src || placeholderImage}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={cn("object-cover duration-700 ease-in-out", 
          isLoading ? "scale-105 blur-lg grayscale" : "scale-100 blur-0 grayscale-0"
        )}
        priority={priority}
        unoptimized={src?.includes('naventcdn')}
        onLoadingComplete={() => setIsLoading(false)}
        onError={handleError}
      />
    </div>
  );
}; 