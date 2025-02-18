import Image from "next/image";
import { cn } from "@/lib/utils";

interface PropertyImageProps {
  src: string | undefined;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function PropertyImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className,
  priority = false,
}: PropertyImageProps) {
  // Default placeholder for properties when there's an error
  const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Cpath d='M30 40 L50 20 L70 40 L70 70 L30 70 Z' fill='%23d1d5db'/%3E%3C/svg%3E";

  return (
    <div className={cn("relative bg-muted overflow-hidden", className)}>
      <Image
        src={src || placeholderImage}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={cn(
          "object-cover duration-700 ease-in-out",
          "group-hover:scale-105"
        )}
        priority={priority}
        unoptimized={src?.includes('naventcdn')}
        loading={priority ? "eager" : "lazy"}
        sizes={fill ? "100vw" : undefined}
        quality={90}
      />
    </div>
  );
} 