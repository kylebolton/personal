import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function GithubIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4M9 18c-4.51 2-5-2-7-2" />
    </Icon>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="3" width="18" height="18" />
      <path d="M8 11v5M8 8v.01M12 16v-5M12 13c0-1.500 1-2 2-2s2 .5 2 2v3" />
    </Icon>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="5" width="18" height="14" />
      <path d="M3 6l9 7 9-7" />
    </Icon>
  );
}

export function BlogIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 3h14v18H5zM9 8h6M9 12h6M9 16h3" />
    </Icon>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 17L17 7M8 7h9v9" />
    </Icon>
  );
}

/** Bauhaus mark: circle, square, triangle in the three primaries. */
export function Logo({ colour = true, ...props }: IconProps & { colour?: boolean }) {
  return (
    <svg
      viewBox="0 0 48 16"
      width="48"
      height="16"
      aria-hidden="true"
      {...props}
    >
      <circle cx="8" cy="8" r="7" fill={colour ? "#e10600" : "currentColor"} />
      <rect x="18" y="1" width="14" height="14" fill={colour ? "#0033a0" : "currentColor"} />
      <path d="M34 15H47L40.500 1z" fill={colour ? "#ffc800" : "currentColor"} />
    </svg>
  );
}
