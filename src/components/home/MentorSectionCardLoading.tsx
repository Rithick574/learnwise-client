import Skeleton from '../ui/Skeleton'
import { useTheme } from '../ui/theme-provider';

export default function MentorSectionCardLoading() {
    const { theme } = useTheme();
    return (
        <div className="w-full md:w-1/3 lg:w-1/4 px-3">
            <div className={`${theme === "light" ? "bg-gray-100" : "bg-gray-800"} rounded-lg overflow-hidden mb-10 pb-14`}>
                <div className={`w-full h-32 ${theme === "light" ? "bg-gray-100" : "bg-gray-800"} rounded flex items-center justify-center`}>
                    <div className={`w-28 h-28 ${theme === "light" ? "bg-gray-300" : "bg-gray-900"} rounded-full animate-pulse`}>

                    </div>
                </div>
                <div className="px-1 text-center">
                    <div className="w-full mt-6 flex flex-col gap-1 items-center justify-center">
                        <Skeleton width={"90%"} height={"14px"} />
                        <Skeleton width={"70%"} height={"14px"} />
                    </div>
                </div>
            </div>
        </div>
    )
}
