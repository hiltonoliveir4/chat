import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { Field } from "formik";
import { useState } from "react";

interface InputPasswordProps {
    name: string;
    id: string;
}
export default function InputPassword({name, id}: InputPasswordProps) {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(prev => !prev);
    };
    return (
        <div className="relative">
            <Field
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id={id}
                name={name}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••" />
            <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400"
                aria-label={showPassword ? 'hide password' : 'show password'}
            >
                {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                ) : (
                    <EyeIcon className="h-5 w-5" />
                )}
            </button>
        </div>
    )
}