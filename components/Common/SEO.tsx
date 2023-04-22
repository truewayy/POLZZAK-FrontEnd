import Head from 'next/head';

interface SEOProps {
  title: string;
}

const SEO = ({ title }: SEOProps) => (
  <Head>
    <title>{title}</title>
    <meta
      name="description"
      content="손가락 거는 걸로는 부족했던 우리에게 필요한 칭찬 도장판 서비스, 폴짝!"
    />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Polzzak 폴짝" />
    <meta
      property="og:title"
      content="폴짝 | 참 잘했어요! 칭찬 도장을 모으며 폴짝 성장해요"
    />
    <meta
      property="og:description"
      content="손가락 거는 걸로는 부족했던 우리에게 필요한 칭찬 도장판 서비스, 폴짝!"
    />
    <meta property="og:image" content="/assets/images/img_thumbnail.png" />
    <meta property="og:url" content="https://polzzak.vercel.app" />
    <meta property="og:locale" content="ko_KR" />
    <meta
      name="keywords"
      content="칭찬 도장판, 미션 수행, 보상, 아이, 보호자, 육아, 성장, 약속, 칭찬, 동기부여, 소통, 습관"
    />
    <meta property="twitter:card" content="summary" />
    <meta property="twitter:site" content="Polzzak 폴짝" />
    <meta
      property="twitter:title"
      content="폴짝 | 참 잘했어요! 칭찬 도장을 모으며 폴짝 성장해요"
    />
    <meta
      property="twitter:description"
      content="손가락 거는 걸로는 부족했던 우리에게 필요한 칭찬 도장판 서비스, 폴짝!"
    />
    <meta
      property="twitter:image"
      content="/assets/images/img_twitter_thumbnail.png"
    />
    <meta property="twitter:url" content="https://polzzak.vercel.app" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Head>
);

export default SEO;
