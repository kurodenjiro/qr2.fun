import type { PageLoad } from './$types';
import { getProfileById } from '$lib/data/profiles';
import type { DisplayMode } from '$lib/types';

export const load: PageLoad = ({ params, url }) => {
  const mode: DisplayMode = url.searchParams.get('mode') === 'dark' ? 'dark' : 'light';
  const profile = getProfileById(params.id);

  return {
    qrId: params.id,
    mode,
    profile
  };
};
