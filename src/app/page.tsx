import Image from 'next/image';
import Link from 'next/link';

import { CheckIcon } from 'lucide-react';

import { ServiceForm } from '@/components/service-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function Page({ searchParams }: PageProps<'/'>) {
  const { success } = await searchParams;

  return (
    <section className="relative grow flex py-16 md:py-32">
      <div className="container md:relative">
        <div className="flex flex-col h-full md:items-center md:flex-row">
          {success === 'true' ? (
            <Card className="relative z-10 shadow-lg w-full py-8 md:max-w-md">
              <CardHeader className="flex flex-col gap-6 px-8">
                <CheckIcon className="size-12 text-primary" />
                <CardTitle className="font-bold text-2xl text-primary">Form submitted successfully</CardTitle>
                <CardDescription className="text-base text-balance">
                  Thank you for your submission. We will get back to you soon.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-8">
                <Button variant="outline">
                  <Link href="/">Back to home</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="relative z-10 shadow-lg w-full py-8 md:max-w-md">
              <CardHeader className="flex flex-col gap-6 px-8">
                <Image
                  src="/static/homeglobe-logo.svg"
                  width={178}
                  height={28}
                  alt="HomeGlobe"
                  draggable={false}
                />
                <CardTitle className="font-bold text-2xl">Find places to stay anywhere</CardTitle>
                <CardDescription className="text-base text-balance">
                  Discover entire homes and rooms perfect for any trip or special occation.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-8">
                <ServiceForm />
              </CardContent>
            </Card>
          )}
        </div>
        <div className="overflow-hidden absolute inset-0 max-md:top-80 md:right-0 md:left-40 md:rounded-3xl">
          <picture>
            <source
              srcSet="/static/homeglobe-hero.webp"
              type="image/webp"
            />
            <Image
              className="absolute inset-0 w-full h-full object-cover"
              src="/static/homeglobe-hero.png"
              width={1600}
              height={1000}
              alt="HomeGlobe"
              draggable={false}
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
