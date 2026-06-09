export default function ApplicationLogo({ className = "h-9 w-9", ...props }) {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${className} text-brand-gold shrink-0`}
            {...props}
        >
            {/* The outer circular plate contour */}
            <circle
                cx="50"
                cy="50"
                r="42"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
            />
            {/* Inner offset circle/plate rim */}
            <circle
                cx="50"
                cy="50"
                r="34"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="opacity-40"
            />
            {/* Luxury Wine Glass silhouette / line art */}
            <path
                d="M38 28H62C62 28 61.5 48 50 54C38.5 48 38 28 38 28Z"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinejoin="round"
            />
            <path
                d="M50 54V72"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
            />
            <path
                d="M42 72H58"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
            />
            {/* Elegant luxury shine reflection line inside the glass */}
            <path
                d="M57 33C57 33 56.5 43 51 47"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="opacity-60"
            />
        </svg>
    );
}
