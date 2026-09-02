type Name = "instagram" | "facebook" | "tiktok";

const paths: Record<Name, React.ReactNode> = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <path d="M14.5 8.5h2V5.8h-2.2c-2 0-3.3 1.3-3.3 3.4v1.6H9v2.7h2v6.7h2.8v-6.7h2.1l.4-2.7h-2.5V9.6c0-.7.3-1.1.7-1.1z" />
  ),
  tiktok: (
    <path
      d="M13.6 3.5h2.2c.2 1.9 1.6 3.3 3.5 3.5v2.2a5.7 5.7 0 0 1-3.5-1.2v5.6a4.6 4.6 0 1 1-4.6-4.6c.2 0 .4 0 .6.05v2.3a2.35 2.35 0 1 0 1.8 2.28z"
      strokeLinejoin="round"
    />
  ),
};

export function SocialIcon({ name, className = "" }: { name: Name; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      aria-hidden="true"
      className={`size-[1.15rem] ${className}`}
    >
      {paths[name]}
    </svg>
  );
}
