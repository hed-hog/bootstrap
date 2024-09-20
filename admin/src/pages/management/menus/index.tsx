import { Helmet } from 'react-helmet'

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Menus - Hedhog</title>
      </Helmet>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Menus</h1>
        </div>
      </div>
    </>
  )
}
