import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPenNib,
    faExclamationTriangle,
    faEnvelope,
    faComment,
    faPalette,
    faFire,
    faExternalLinkAlt,
    faBookSkull,
    faKey
} from "@fortawesome/free-solid-svg-icons";

import React from 'react';

const AboutPage: React.FC = () => {
    return (
        <div className="min-h-screen text-gray-800 dark:text-gray-200 transition-colors">
            <div className="hidden lg:block">
                <div className="container mx-auto px-6 py-12 max-w-6xl">
                    <div className="text-center mb-16">
                        <div className="relative mb-8 max-w-xs mx-auto">
                            <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-lg border-2 border-red-200 dark:border-red-800 mx-auto">
                                <img
                                    src="https://mntdvvnqrwqggrsjulph.supabase.co/storage/v1/object/public/illusrations/marcy_fletcher.webp"
                                    alt="Marcy Fletcher"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-serif">
                                Marcy Fletcher
                            </h1>

                            <div className="flex flex-col items-center space-y-2">
                                <p className="text-lg text-gray-600 dark:text-gray-400 font-sans">
                                    Your Little Devil with a Pen
                                </p>

                                <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full">
                                    <FontAwesomeIcon icon={faFire} className="text-red-500 text-xs" />
                                    <span className="text-sm font-medium text-red-700 dark:text-red-300">
                                        Explicit & Dark Fiction
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-8">
                        <div className="space-y-8">
                            <section className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                                        <FontAwesomeIcon icon={faEnvelope} className="text-white text-sm" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                        Find Me
                                    </h3>
                                </div>

                                <div className="space-y-4">
                                    <a
                                        href="https://www.deviantart.com/marcyfletcher"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-red-300 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
                                                <FontAwesomeIcon icon={faPalette} className="text-white" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900 dark:text-white">DeviantArt</p>
                                                <p className="text-gray-500 dark:text-gray-400 text-sm">@marcyfletcher</p>
                                            </div>
                                        </div>
                                        <FontAwesomeIcon icon={faExternalLinkAlt} className="text-gray-400 text-sm" />
                                    </a>

                                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                                                <FontAwesomeIcon icon={faComment} className="text-white" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900 dark:text-white">Discord</p>
                                                <p className="text-gray-500 dark:text-gray-400 text-sm">@masha.fin</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                                        <FontAwesomeIcon icon={faPenNib} className="text-white text-sm" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                        Commissions
                                    </h3>
                                </div>

                                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-500 text-sm" />
                                        <span className="font-semibold text-gray-900 dark:text-white">Status: Closed</span>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                        Currently not taking new commissions, but I'm always open to discuss your dark and twisted ideas.
                                    </p>
                                </div>
                            </section>

                            <section className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                                        <FontAwesomeIcon icon={faKey} className="text-white text-sm" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                        How Can I Get an Account?
                                    </h3>
                                </div>

                                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                        You can contact me through any available channel, and we’ll discuss our options. In the end, what kind of devil would I be if I didn’t try to make a deal?
                                    </p>
                                </div>
                            </section>
                        </div>

                        <div className="col-span-2">
                            <section className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                                        <FontAwesomeIcon icon={faBookSkull} className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-serif">
                                            A Devil's Library
                                        </h2>
                                    </div>
                                </div>

                                <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                                    <p>
                                        <i>Hello there. I'm a Devil wearing the skin of a young girl, but my friends simply call me Marcy!</i>
                                    </p>

                                    <p>
                                        This website is my personal library, where I collect my manuscripts. And perhaps, if you've been very naughty, I might just issue you a reader's pass to explore these forbidden shelves.
                                    </p>

                                    <p>
                                        I primarily write TG/TF skinsuit stories set in realistic environments. There's something utterly captivating about draping female skins over every man around - it's my particular obsession. The central theme throughout my work is male-to-female transformation, exploring the psychological, physical, and sexual nuances of this metamorphosis.
                                    </p>

                                    <p>
                                        Sometimes my dark fantasies lead me down twisted paths. You'll likely encounter controversial and triggering themes in my writings, but I always provide clear content warnings for material you may prefer to avoid.
                                    </p>

                                    <p>
                                        I give myself considerable creative freedom in exploring these dark territories. However, I ask you to remember that this is pure fiction. Despite the disturbing nature of some stories, I still care deeply for each reader. I may not endorse what my characters say or do - sometimes I just... get a little too immersed in the game.
                                    </p>

                                    <p>
                                        Please forgive me in advance. After all, I'm just a Devil.
                                    </p>

                                    <div className="text-right mt-8">
                                        <p className="text-xl font-serif text-gray-900 dark:text-white font-bold">
                                            – Marcy
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:hidden">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center mb-8">
                        <div className="relative mb-6 max-w-xs mx-auto">
                            <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-md border-2 border-red-200 dark:border-red-800 mx-auto">
                                <img
                                    src="https://mntdvvnqrwqggrsjulph.supabase.co/storage/v1/object/public/illusrations/marcy_fletcher.webp"
                                    alt="Marcy Fletcher"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-serif">
                                Marcy Fletcher
                            </h1>

                            <div className="flex flex-col items-center space-y-2">
                                <p className="text-base text-gray-600 dark:text-gray-400">
                                    Your Little Devil with a Pen
                                </p>

                                <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full">
                                    <FontAwesomeIcon icon={faFire} className="text-red-500 text-xs" />
                                    <span className="text-xs font-medium text-red-700 dark:text-red-300">
                                        Explicit & Dark Fiction
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="mb-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center">
                                <FontAwesomeIcon icon={faEnvelope} className="text-white text-xs" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                Find Me
                            </h3>
                        </div>

                        <div className="space-y-3">
                            <a
                                href="https://www.deviantart.com/marcyfletcher"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-pink-500 rounded flex items-center justify-center">
                                        <FontAwesomeIcon icon={faPalette} className="text-white text-sm" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white text-sm">DeviantArt</p>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs">@marcyfletcher</p>
                                    </div>
                                </div>
                                <FontAwesomeIcon icon={faExternalLinkAlt} className="text-gray-400 text-xs" />
                            </a>

                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center">
                                        <FontAwesomeIcon icon={faComment} className="text-white text-sm" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white text-sm">Discord</p>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs">@masha.fin</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center">
                                <FontAwesomeIcon icon={faPenNib} className="text-white text-xs" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                Commissions
                            </h3>
                        </div>

                        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                            <div className="flex items-center gap-2 mb-2">
                                <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-500 text-sm" />
                                <span className="font-semibold text-gray-900 dark:text-white text-sm">Status: Closed</span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed">
                                Currently not taking new commissions, but I'm always open to discuss your dark and twisted ideas.
                            </p>
                        </div>
                    </section>

                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                                <FontAwesomeIcon icon={faKey} className="text-white text-xs" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                How Can I Get an Account?
                            </h3>
                        </div>

                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                            <p className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed">
                                You can contact me through any available channel, and we’ll discuss our options. In the end, what kind of devil would I be if I didn’t try to make a deal?
                            </p>
                        </div>
                    </section>

                    <section className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                                <FontAwesomeIcon icon={faBookSkull} className="text-white" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white font-serif">
                                A Devil's Library
                            </h2>
                        </div>

                        <div className="space-y-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            <p>
                                <i>Hello there. I'm a Devil wearing the skin of a young girl, but my friends simply call me Marcy!</i>
                            </p>

                            <p>
                                This website is my personal library, where I collect my manuscripts. And perhaps, if you've been very naughty, I might just issue you a reader's pass to explore these forbidden shelves.
                            </p>

                            <p>
                                I primarily write TG/TF skinsuit stories set in realistic environments. There's something utterly captivating about draping female skins over every man around - it's my particular obsession. The central theme throughout my work is male-to-female transformation, exploring the psychological, physical, and sexual nuances of this metamorphosis.
                            </p>

                            <p>
                                Sometimes my dark fantasies lead me down twisted paths. You'll likely encounter controversial and triggering themes in my writings, but I always provide clear content warnings for material you may prefer to avoid.
                            </p>

                            <p>
                                I give myself considerable creative freedom in exploring these dark territories. However, I ask you to remember that this is pure fiction. Despite the disturbing nature of some stories, I still care deeply for each reader. I may not endorse what my characters say or do - sometimes I just... get a little too immersed in the game.
                            </p>

                            <p>
                                Please forgive me in advance. After all, I'm just a Devil.
                            </p>

                            <div className="text-right mt-6">
                                <p className="text-lg font-serif text-gray-900 dark:text-white font-bold">
                                    - Marcy
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;