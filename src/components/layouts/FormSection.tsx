import React, { useState } from 'react';
import Button from '../inputs/Button';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { getAssetUrl } from '@/utils/assets';

const FormSection = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const response = await fetch('/api/send-email', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' },
        });

        setLoading(false);

        if (response.ok) {
            setSuccess('Message sent successfully!');
            setFormData({ name: '', email: '', message: '' });
        } else {
            setSuccess('Failed to send message.');
        }
    };

    return (
        <section id='contact' className='cs-x-container cs-y-container'>

        <div className={clsx('relative w-full flex justify-between gap-8 sm:p-8 p-4')}>
         {/* ✅ Imagem de fundo absoluta corrigida */}
        <div className="absolute inset-0 -z-10">
          <img
            src={getAssetUrl("/assets/img/all/light-pink-background.png")}
            alt="pink background"
            className="w-full h-full object-cover"
          />
        </div>
                <div className='grow flex flex-col gap-2 lg:gap-4'>
                    <div className='flex items-center gap-4'>
                        <div className='w-10 h-10 rounded-full bg-white flex justify-center items-center'>
                            <img src={getAssetUrl('/assets/img/icon/message-icon.png')} alt='Group of people icon' className='w-10 h-10' />
                        </div>
                        <h3 className='text-purple'>{t("HomePage.formSection.title")}</h3>
                    </div>
                    <p className='text-gray'>{t("HomePage.formSection.subTitle")}</p>
                    <form onSubmit={handleSubmit} className='flex flex-col items-center md:items-start gap-4'>
                        <input
                            className='w-full p-2 bg-white placeholder:text-gray'
                            type='text'
                            name='name'
                            placeholder={t('HomePage.formSection.inputName')}
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className='w-full p-2 bg-white placeholder:text-gray'
                            type='email'
                            name='email'
                            placeholder={t('HomePage.formSection.inputEmail')}
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            className='w-full p-2 bg-white placeholder:text-gray resize-none'
                            name='message'
                            placeholder={t('HomePage.formSection.inputMessage')}
                            cols={6}
                            rows={6}
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                        <Button type='submit' disabled={loading}>{loading ? 'Sending...' : t("HomePage.formSection.action")}</Button>
                    </form>
                    {success && <p className='text-green-600'>{success}</p>}
                </div>
                <div className='hidden xl:block p-16 relative min-w-[50%] h-auto'>
                    <img src={getAssetUrl('/assets/img/all/Group 1.png')} alt='Boys smiling to teacher' className='w-full h-full object-contain rounded-lg' />
                </div>
            </div>
        </section>
    );
};

export default FormSection;

