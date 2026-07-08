export default function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`sparkle-divider ${className}`}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M8 0L9.41 6.59L16 8L9.41 9.41L8 16L6.59 9.41L0 8L6.59 6.59L8 0Z"
          fill="#C8A66B"
        />
      </svg>
    </div>
  );
}
