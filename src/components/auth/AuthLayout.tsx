
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LottieAnimation from "../ui/lottie-animation";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  footer?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  description,
  footer,
  isLoading = false,
  className,
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 py-12">
      <Card className={cn("w-full max-w-md shadow-lg", className)}>
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <LottieAnimation
                src="https://lottie.host/5db57ffb-cce4-49d2-8c93-13932048b244/qctRbXqBj1.lottie" 
                width={200}
                height={200}
                speed={1}
                loop={true}
                autoplay={true}
              />
              <p className="mt-4 text-sm text-muted-foreground">Please wait...</p>
            </div>
          ) : (
            children
          )}
        </CardContent>
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    </div>
  );
};

export default AuthLayout;
