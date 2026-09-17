"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type Props = ButtonAsLink | ButtonAsButton;

const variantClasses = {
  solid: "bg-brand-orange text-white",
  outline: "border border-brand-orange text-brand-orange bg-transparent",
};

export default function Button({
  children,
  variant = "solid",
  className = "",
  ...props
}: Props) {
  const classes = `${variantClasses[variant]} px-4 py-2 rounded-2xl hover:cursor-pointer hover:opacity-90 transition inline-block text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link
        href={props.href}
        target={props.target}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button {...buttonProps} className={classes}>
      {children}
    </button>
  );
}
