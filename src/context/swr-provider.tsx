'use client';

import { SWRConfig } from 'swr';

import ky, { Options } from 'ky';
import { identity, pickBy } from 'lodash';

const fetcher = async (
  url:
    | string
    | ({
        url: string;
        params?: Record<string, string>;
        disabled?: boolean;
      } & Options)
) => {
  if (typeof url === 'object' && url.disabled) {
    return null;
  }

  try {
    if (typeof url === 'object') {
      const response = await ky
        .get(url.url, {
          ...url,
          searchParams: pickBy(url.params, identity),
        })
        .json();
      return response;
    }
    const response = await ky.get(url).json();
    return response;
  } catch (error) {
    throw error;
  }
};

export const SWRProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <SWRConfig
      value={{
        fetcher,
        keepPreviousData: true,
        errorRetryCount: 0,
        errorRetryInterval: Infinity,
        revalidateOnFocus: false,
      }}
    >
      {children}
    </SWRConfig>
  );
};
