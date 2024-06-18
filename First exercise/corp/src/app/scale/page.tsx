import Hero from '@/components/hero'
import ScaleImg from 'public/scale.jpg'

export default function ScalePage() {
  return (
    <Hero 
      imgData={ScaleImg} 
      imgAlt='steel factory' 
      title='Scale your app to infinity' 
    />
  );
}
