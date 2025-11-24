import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookSkull } from "@fortawesome/free-solid-svg-icons";

interface LibrarySectionProps {
    mobile?: boolean;
}

const LibrarySection: React.FC<LibrarySectionProps> = ({ mobile = false }) => {
    const containerClass = mobile ? "bg-gray-50 dark:bg-gray-800 rounded-2xl p-6" : "bg-gray-50 dark:bg-gray-800 rounded-2xl p-8";
    const iconSize = mobile ? "w-10 h-10" : "w-12 h-12";
    const titleSize = mobile ? "text-xl" : "text-2xl";
    const textSize = mobile ? "text-sm" : "text-base";

    return (
        <section className={containerClass}>
            <div className="flex items-center gap-4 mb-8">
                <div className={`${iconSize} bg-red-500 rounded-xl flex items-center justify-center`}>
                    <FontAwesomeIcon icon={faBookSkull} className="text-white text-xl" />
                </div>
                <div>
                    <h2 className={`${titleSize} font-bold text-gray-900 dark:text-white font-serif`}>
                        A Devil's Library
                    </h2>
                </div>
            </div>

            <div className={`space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed ${textSize}`}>
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
    );
};

export default LibrarySection;