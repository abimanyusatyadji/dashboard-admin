import React from "react";

export default function AdminLogo({
  variant = "full",
  size = 32,
  title = "Admin App",
  className = "text-white", // ikon utama putih
  accentClassName = "text-blue-300", // gear accent biru muda
}) {
  const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={className}
    >
      <title>{title}</title>
      {/* Person (uses currentColor) */}
      <g fill="currentColor">
        {/* Head */}
        <circle cx="22" cy="20" r="10" />
        {/* Torso */}
        <path d="M8 44c0-8.284 6.716-15 15-15h-2c8.284 0 15 6.716 15 15v6a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4v-6z" />
      </g>

      {/* Gear (accent color) */}
      <g
        transform="translate(36,38)"
        className={accentClassName}
        fill="currentColor"
      >
        {/* center */}
        <circle cx="0" cy="0" r="5" />
        {/* teeth: 8 rectangles rotated around center */}
        <rect x="-2" y="-14" width="4" height="6" rx="1" />
        <rect x="-2" y="8" width="4" height="6" rx="1" />
        <rect x="8" y="-2" width="6" height="4" rx="1" />
        <rect x="-14" y="-2" width="6" height="4" rx="1" />
        <rect
          x="-2"
          y="-14"
          width="4"
          height="6"
          rx="1"
          transform="rotate(45)"
        />
        <rect
          x="-2"
          y="-14"
          width="4"
          height="6"
          rx="1"
          transform="rotate(90)"
        />
        <rect
          x="-2"
          y="-14"
          width="4"
          height="6"
          rx="1"
          transform="rotate(135)"
        />
        <rect
          x="-2"
          y="-14"
          width="4"
          height="6"
          rx="1"
          transform="rotate(180)"
        />
      </g>
    </svg>
  );

  if (variant === "icon") return icon;

  return (
    <div className="inline-flex items-center gap-3 select-none">
      {icon}
      <span className="font-semibold tracking-wide text-xl text-white">
        ADMIN <span className="text-gray-300">APP</span>
      </span>
    </div>
  );
}
