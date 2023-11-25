import { EnvelopeOpen, ListBullets, CheckCircle } from '@phosphor-icons/react';
import Navbar from '#/components/navbar';
import Overlay from '#/components/overlay';
import { paths } from '#/routes/paths';
import { CardLink } from '#/components/cardLink';
import { colors } from '#/components/cardLink/types';

import { useAuth } from '#/context/AuthContext';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation('home');
    const { mesas } = useAuth();
    const availableMesas = mesas.filter(
        (mesa) =>
            !JSON.parse(sessionStorage.getItem('actas') || '[]')
                .map((acta: { mesaId: string }) => acta.mesaId)
                .includes(mesa)
    );
    return (
        <div className="min-h-screen">
            <Overlay>
                <Navbar routerLink={paths.home} showArrow={false} />
                <section className="flex justify-center px-4 py-10">
                    <div className="w-full md:w-1/2 lg:w-full shadow-3xl rounded-xl py-4 flex flex-col items-center lg:max-w-[52.5rem]">
                        <span className="text-violet-primary text-[2rem] lg:text-[2.5rem] font-black mb-4">{t('title')}</span>
                        <div className="flex flex-col items-center space-y-2 w-full lg:space-y-4">
                            <span className="w-full pt-8 text-left lg:text-center lg:text-2xl lg:mb-3 lg:pt-6">{t('fiscalActions')}</span>
                            {availableMesas.length > 0 ? (
                                <CardLink
                                    link={paths.uploadActa}
                                    text={t('loadTableResults')}
                                    icon={<EnvelopeOpen size={32} />}
                                    color={colors.Violet}
                                />
                            ) : (
                                <CardLink text={t('alreadyUploadedTables')} icon={<CheckCircle size={32} />} color={colors.Green} />
                            )}
                            <CardLink
                                link={paths.votationTables}
                                text={t('uploadedTablesList')}
                                icon={<ListBullets size={32} />}
                                color={colors.Violet}
                            />
                        </div>
                    </div>
                </section>
            </Overlay>
        </div>
    );
};

export default Home;
