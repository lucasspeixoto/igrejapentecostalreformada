/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import type { Metadata } from 'next';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

import ProfileMemberCard from './components/ProfileMemberCard';
import UserBio from './components/UserBio';
import UserPhoto from './components/UserPhoto';

export const metadata: Metadata = {
  title: 'Perfil',
  description: 'Meu perfil na plataforma IPR',
};

const Profile = () => {
  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="Perfil" />

      <div className="mt-5 grid grid-cols-5 gap-8">
        <div className="sm-col-span-5 col-span-8 md:col-span-3">
          <UserBio />
        </div>
        <div className="col-span-8 md:col-span-2">
          <div className="flex w-full flex-col items-center justify-center md:items-start">
            <ProfileMemberCard />

            <UserPhoto />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
