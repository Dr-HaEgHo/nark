import { cn } from "@/utils/cn";
import React, { FC, ReactNode } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface buttonProps {
  text: string;
  type: "fill" | "outline" | "white";
  theme: "dark" | "light" | "disabled";
  size?: "normal" | "medium" | "semibold" | "bold" | "black";
  disabled?: boolean;
  icon?: ReactNode;
  weight?: string;
  className: ButtonProps["className"];
  cta?: () => void;
  children?: ReactNode;
}

const Button: FC<buttonProps> = (props) => {
  return (
    <>
      {props.type === "fill" && (
        <button
          disabled={props.disabled}
          onClick={props.cta}
          className={cn(
            "flex items-center gap-2 rounded-full p-1 pr-6 hoverActiveScale cursor-pointer",
            props.className,
            {
              "bg-foreground text-background": props.theme === "dark",
              "bg-background text-foreground": props.theme === "light",
              "bg-disableBg text-disabledTextDark": props.theme === "disabled",
            }
          )}
        >
          {props.children ? (
            <>{props.children}</>
          ) : (
            <>
              {props.icon && (
                <div
                  className={cn(
                    `flex h-7 w-7 items-center justify-center rounded-full text-white`
                  )}
                >
                  {props.icon ? props.icon : null}
                </div>
              )}
              <p
                className={cn("whitespace-nowrap", {
                  "font-normal": props.size === "normal",
                  "font-medium": props.size === "medium",
                  "font-semibold": props.size === "semibold",
                  "font-bold": props.size === "bold",
                  "font-black": props.size === "black",
                })}
              >
                {props.text}
              </p>
            </>
          )}
        </button>
      )}
    </>
  );
};

export default Button;
