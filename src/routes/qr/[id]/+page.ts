import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getProfileById, getProfileIds } from '$lib/data/profiles';

export function entries() {
  return getProfileIds().map((id) => ({ id }));
}

export const load: PageLoad = ({ params }) => {
  const profile = getProfileById(params.id);

  if (!profile) {
    throw error(404, 'Profile not found');
  }

  return {
    qrId: params.id,
    profile
  };
};
