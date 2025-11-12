'use client';

import { useForm } from 'react-hook-form';

import { CardDomain } from '@/components/card-domain';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import ky from 'ky';
import { toast } from 'sonner';

function Home() {
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
        },
      });
      form.setValue(`domains.${index}.status` as any, 'registered');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao registrar domínio');
      form.setValue(`domains.${index}.status` as any, 'error');
    }
  };

  const handleSubmit = async (data: any) => {
    const domains = data.domains;
    await Promise.allSettled(
      domains.map((domain: any, index: number) => handleRegister(domain, index))
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
            <CardDomain key={`domain-${index}`} index={index} />
          ))}

          <Button type="submit">Registrar</Button>
        </form>
      </Form>
    </main>
  );
}

export default Home;
