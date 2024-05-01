import { useTheme } from "./theme-provider";

export default function Skeleton({ width, height }: {width: string; height: string;}) {
    const { theme } = useTheme();
    return (
        <div
            className={`${theme === "light" ? "bg-gray-300" : "bg-gray-700"} animate-pulse rounded`}
            style={{ width, height }}
        ></div>
    );
};
