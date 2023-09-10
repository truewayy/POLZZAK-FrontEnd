import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { stampboardDetail } from '@/apis/stamp';

import ChangeProfileView from './ChangeProfileView';

const ChangeProfile = () => {
  const { query } = useRouter();
  const stampboardId = query.stampboardId as string;
  const { data } = useQuery(
    ['stampboard', stampboardId],
    () => stampboardDetail(stampboardId),
    {
      enabled: !!stampboardId,
    }
  );

  const ChangeProfileVAProps = {
    currentValue: data?.data.kid.nickname ?? '',
    profileUrl: data?.data.kid.profileUrl ?? '',
  };

  return <ChangeProfileView {...ChangeProfileVAProps} />;
};

export default ChangeProfile;
