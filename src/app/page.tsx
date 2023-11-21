import SideNav from '@/components/layouts/SideNav'
import Image from 'next/image'
import HeaderMobile from '@/components/layouts/HeaderMobile'
import MarginWidthWrapper from '@/components/layouts/MarginWrapper'
import Header from '@/components/layouts/Header'
import PageWrapper from '@/components/layouts/PageWrapper'
import Balanza from '@/components/Balanza'
import DynamicListXY from '@/components/DynamicList'


export default function Home() {
  return (
    <div className="flex">
      <SideNav />
      <main className="flex-1">
        <MarginWidthWrapper>
          <Header />
          <HeaderMobile />
          <PageWrapper>
            <div>
              <Balanza />
              <DynamicListXY />
            </div>
          </PageWrapper>
        </MarginWidthWrapper>
      </main>
    </div>
  )
}
