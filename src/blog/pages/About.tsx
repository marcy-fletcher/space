import PageHeader from "../../layout/PageHeader.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookSkull, faEnvelope, faFire, faPenNib} from "@fortawesome/free-solid-svg-icons";
import Badge from "../../common/components/Badge.tsx";
import Subtitle from "../../common/components/Subtitle.tsx";
import Header from "../../common/components/Header.tsx";
import Card from "../../layout/Card.tsx";
import Section from "../components/about/Section.tsx";
import ExternalLinkButton from "../components/about/ExternalLinkButton.tsx";
import {faDiscord, faDeviantart} from "@fortawesome/free-brands-svg-icons";
import {useDocumentTitle} from "../../layout/hooks/useDocumentTitle.ts";
import {usePageLog} from "../../common/hooks/usePageLog.ts";

const About = () => {

    useDocumentTitle('About');
    usePageLog('About');

    return (
        <div className="container mx-auto px-4 max-w-7xl">
            <PageHeader title="About Me" subtitle="Know your devil..."/>

            <div className="text-center">
                <div className="relative mb-4 max-w-xs mx-auto">
                    <div
                        className="relative w-40 h-40 rounded-full overflow-hidden shadow-lg border-2 border-red-200 dark:border-red-800 mx-auto">
                        <img
                            src="https://mntdvvnqrwqggrsjulph.supabase.co/storage/v1/object/public/illusrations/marcy_fletcher.webp"
                            alt="Marcy Fletcher"
                            className="w-full h-full object-cover text-transparent"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Header className="font-serif text-3xl">
                        Marcy Fletcher
                    </Header>

                    <div className="flex flex-col items-center space-y-2">

                        <Subtitle>
                            Your Little Devil with a Pen
                        </Subtitle>

                        <Badge>
                            <FontAwesomeIcon icon={faFire} className="text-danger-500 text-xs"/>
                            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                                Explicit & Dark Fiction
                            </span>
                        </Badge>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-8 mt-4">
                    <div className="flex flex-col gap-4">

                        <Section title="Account" icon={faPenNib} variant="green">
                            <Card className="dark:border-green-800 p-3">
                                <p className="text-gray-700 dark:text-gray-300 text-sm/6">
                                    You can contact me through any available channel, and we'll discuss our options.
                                </p>
                            </Card>
                        </Section>

                        <Section title="Comissions" icon={faPenNib} variant="yellow">
                            <Card className="dark:border-yellow-800 p-3">
                                <p className="text-gray-700 dark:text-gray-300 text-sm/6">
                                    Currently <b>not</b> taking new commissions, but I'm always open to discuss your
                                    ideas.
                                </p>
                            </Card>
                        </Section>

                        <Section title="Contact Me" icon={faEnvelope} variant={"red"}>
                            <div className="flex flex-col xs:grid xs:grid-cols-2 gap-4 md:flex">
                                <ExternalLinkButton
                                    title="Deviantart"
                                    subtitle="Direct Link"
                                    variant="green" icon={faDeviantart}
                                    content="https://www.deviantart.com/marcyfletcher" actionType="open"
                                />

                                <ExternalLinkButton
                                    title="Discord" subtitle="@masha.fin"
                                    variant="indigo" icon={faDiscord}
                                    content="@masha.fin" actionType="copy"
                                />
                            </div>
                        </Section>
                    </div>

                    <div className="col-span-2 flex">
                        <Section className="flex flex-col flex-1" title="A Devil's Library" icon={faBookSkull} variant="red">
                            <div className={`space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed text-justify grow`}>
                                <p>
                                    <i>Hello there. I'm a Devil wearing the skin of a young girl, but my friends simply call me Marcy!</i>
                                </p>

                                <p>
                                    This website is my personal library, where I collect my manuscripts. And perhaps, if you've been very naughty, I might just issue you a reader's pass to explore these forbidden shelves.
                                </p>

                                <p>
                                    I primarily write TG/TF skinsuit stories set in realistic environments. There's something utterly captivating about draping female skins over every man around - it's my particular obsession.
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
                        </Section>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default About;
