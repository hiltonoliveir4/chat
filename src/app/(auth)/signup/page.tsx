"use client"

import InputPassword from "@/components/InputPassword";
import Loader from "@/components/loader";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Bounce, toast } from "react-toastify";
import * as Yup from 'yup';

export default function SignUp() {
    const { t } = useTranslation();
    const router = useRouter()

    const validationSchema = useMemo(() => Yup.object().shape({
        name: Yup.string()
            .required(t('formErrors.required'))
            .min(2, t('formErrors.min', { count: 2 })),
        email: Yup.string()
            .email(t('formErrors.emailInvalid'))
            .required(t('formErrors.required')),
        password: Yup.string()
            .required(t('formErrors.required'))
            .min(6, t('formErrors.min', { count: 6 })),
        confirmPassword: Yup.string()
            .required(t('formErrors.required'))
            .oneOf([Yup.ref('password')], t('formErrors.passwordsMustMatch')),
    }), [t]);

    async function handleSubmit(values: SignUpForm) {
        const response = await signIn("register", {
            ...values,
            redirect: false,
            callbackUrl: '/',
        });

        if (response?.ok) {
            router.push(response?.url || "/")
            return
        }

        toast.error(`${t('sign.credencialsError')}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            {t('signup.message')}
                        </h1>
                        <Formik
                            initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
                            onSubmit={handleSubmit}
                            validationSchema={validationSchema}
                        >
                            {({ errors, isSubmitting }) => (
                                <Form className="space-y-4 md:space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">
                                            {t('signup.name')}
                                        </label>
                                        <Field
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="John Doe" />
                                        <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">
                                            {t('signup.email')}
                                        </label>
                                        <Field
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="email@email.com" />
                                        <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">
                                            {t('signup.password')}
                                        </label>
                                        <InputPassword name="password" id="password" />
                                        <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                                    </div>
                                    <div>
                                        <label htmlFor="confirm-password" className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">
                                            {t('signup.confirmPassword')}
                                        </label>
                                        <InputPassword name="confirmPassword" id="confirmPassword" />
                                        <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1" />
                                    </div>
                                    <button
                                        className="w-full h-9 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? <Loader className="w-4 h-4 fill-white"/> : t('signup.button')}
                                    </button>
                                </Form>
                            )}
                        </Formik>
                        <p className="text-xs font-light text-gray-500 dark:text-gray-400">
                            {t('signup.signInMessage')} {" "}
                            <Link className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                href={{ pathname: '/signin' }}
                            >
                                {t('signup.loginMessage')}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}