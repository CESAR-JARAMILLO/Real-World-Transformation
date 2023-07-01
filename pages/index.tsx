import Head from 'next/head';
import Hero from '@/components/HomeComponents/Hero';
import Categories from '@/components/HomeComponents/Categories';
import Description from '@/components/HomeComponents/Description';

export default function Home() {
  return (
    <>
      <Head>
        <title>Real World Transformation</title>
        <meta name="description" content="Realistic goals" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />
      <Categories />
      <Description />
    </>
  );
}
