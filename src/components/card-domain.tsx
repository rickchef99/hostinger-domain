import { useFieldArray, useFormContext } from 'react-hook-form';
import useSWR from 'swr';
import { useDebounce } from 'use-debounce';

import { Check, Loader, X } from 'lucide-react';

import { TextField } from 'maquinaweb-ui/text-field';

const CardDomain: React.FC<{ index: number }> = ({ index }) => {
  const { watch, control, setValue } = useFormContext();
  const prefix = `domains.${index}`;
  const { append } = useFieldArray({
    control,
    name: 'domains',
  });
  const status = watch(`${prefix}.status`);
  const domain = watch(`${prefix}.domain`);
  const [domainDebounced] = useDebounce(domain, 500);

  const { data, isLoading } = useSWR<
    {
      domain: string;
      is_available: boolean;
      is_alternative: boolean;
      restriction: string | null;
    }[]
  >({
    url: '/api/check',
    params: {
      domain: domainDebounced,
    },
    disabled: !domainDebounced,
  });

  const handleChange = (value: string) => {
    if (value.at(-1) === ' ') {
      setValue(`${prefix}.domain`, value.trim());
      append({ domain: '' });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <TextField
        prefix={prefix}
        name="domain"
        onChange={handleChange}
        label="Dominio"
        disabled={status === 'registering' || status === 'registered'}
      >
        {isLoading && (
          <Loader className="size-3.5 animate-spin absolute right-2 top-1/2 -translate-y-1/2" />
        )}
        {!isLoading && data?.[0]?.is_available && (
          <Check className="size-3.5 absolute right-2 top-1/2 -translate-y-1/2 text-green-500" />
        )}
        {!isLoading && !data?.[0]?.is_available && (
          <X className="size-3.5 absolute right-2 top-1/2 -translate-y-1/2 text-red-500" />
        )}
      </TextField>
      {status === 'registering' && (
        <Loader className="size-3.5 animate-spin absolute right-2 top-1/2 -translate-y-1/2" />
      )}
      {status === 'registered' && (
        <Check className="size-3.5 absolute right-2 top-1/2 -translate-y-1/2 text-green-500" />
      )}
    </div>
  );
};
export { CardDomain };
