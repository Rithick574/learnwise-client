import { FC } from "react";
import { ModeToggle } from '../../components/ui/mode-toggle';
import { useTheme } from "@/components/ui/theme-provider";

export const AdminSettings: FC = () => {
    const { theme } = useTheme();

    return (
        <div className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900"} p-8`}>
            <div className="container mx-auto">
                <div className={`${theme === "light" ? "bg-white" : "bg-gray-800"} shadow rounded-lg p-6`}>
                    <h1 className={`text-2xl font-semibold ${theme === "light" ? "text-gray-800" : "text-white"}`}>Admin Settings</h1>
                    <hr className="my-4" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className={`${theme === "light" ? "bg-white" : "bg-gray-800"} shadow rounded-lg p-4`}>
                            <h2 className={`font-medium text-lg ${theme === "light" ? "text-gray-700" : "text-white"}`}>Theme Settings</h2>
                            <div className="mt-4">
                                <label className={`${theme === "light" ? "text-gray-600" : "text-white"} font-light`}>Toggle Dark/Light Mode</label>
                                <div className="mt-2">
                                    <ModeToggle />
                                </div>
                            </div>
                        </div>
                        
                        <div className={`${theme === "light" ? "bg-white" : "bg-gray-800"} shadow rounded-lg p-4`}>
                            <h2 className={`font-medium text-lg ${theme === "light" ? "text-gray-700" : "text-white"}`}>User Management</h2>
                            <p className={`${theme === "light" ? "text-gray-600" : "text-white"} mt-2`}>Manage user roles, permissions, and more.</p>
                            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">Manage Users</button>
                        </div>
                        <div className={`${theme === "light" ? "bg-white" : "bg-gray-800"} shadow rounded-lg p-4`}>
                            <h2 className={`font-medium text-lg ${theme === "light" ? "text-gray-700" : "text-white"}`}>Security</h2>
                            <p className={`${theme === "light" ? "text-gray-600" : "text-white"} mt-2`}>Configure password policies, API keys, and other security features.</p>
                            <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">Update Security</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
