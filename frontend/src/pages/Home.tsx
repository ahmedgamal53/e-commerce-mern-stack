import Hero from '../components/Hero'
// LatestCollection is currently implemented as JavaScript without type declarations.
// @ts-expect-error TS7016: no declaration file is available for this module.
import LatestCollection from '../components/LatestCollection'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import { useShop } from '../context/ShopContext'
import { LoaderCircle } from 'lucide-react'
import BestSeller from '../components/BestSeller'
const Home = () => {
  const {  loading } = useShop();
    if (loading) {
      return (
        <div>
          {loading && (
            <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-[2px] flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-lg px-6 py-5 flex flex-col items-center gap-3">
                <LoaderCircle size={32} className="animate-spin text-black" />
  
                <p className="text-sm text-gray-600">Loading...</p>
              </div>
            </div>
          )}
        </div>
      );
    }
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <NewsletterBox/>
    </div>
  )
}

export default Home