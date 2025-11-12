'use client';

import { use, useState } from 'react';

import { useForm } from 'react-hook-form';

import { CardDomain } from '@/components/card-domain';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { Loader } from 'lucide-react';

import ky from 'ky';
import { toast } from 'sonner';

function Page({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      domains: [{}],
    },
  });

  const handleRegister = async (domain: any, index: number) => {
    try {
      form.setValue(`domains.${index}.status` as any, 'registering');
      await ky.post('/api/register', {
        json: {
          domain: domain.domain,
          token,
        },
        timeout: 60000,
      });
      form.setValue(`domains.${index}.status` as any, 'registered');
    } catch (error) {
      console.error(error);
      toast.error(`Erro ao registrar domínio: ${domain.domain}`);
      form.setValue(`domains.${index}.status` as any, 'error');
    }
  };

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    const domains = data.domains;
    toast.promise(
      Promise.allSettled(
        domains.map((domain: any, index: number) =>
          handleRegister(domain, index)
        )
      ),
      {
        loading: 'Registrando domínios...',
        success: 'Domínios registrados com sucesso',
        error: 'Erro ao registrar domínios',
        finally: () => {
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <main className="h-dvh w-full flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col h-fit w-fit gap-4 bg-card shadow-lg rounded-md p-4"
        >
          {form.watch('domains').map((domain, index) => (
            <CardDomain key={`domain-${index}`} index={index} token={token} />
          ))}

          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader className="size-3.5 animate-spin" />}
            {isLoading ? 'Registrando...' : 'Registrar'}
          </Button>
        </form>
      </Form>
    </main>
  );
}

export default Page;
