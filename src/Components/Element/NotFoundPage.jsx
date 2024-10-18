import { Button } from "@/Components/ui/button"
import { Link } from 'react-router-dom'
import useSetDataInLocalStorage from '@/Hooks/useSetDataInLocalStorage'
const NotFoundPage = () => {
  const { getDataFromLocalStorage } = useSetDataInLocalStorage()
  const access_token = getDataFromLocalStorage("access_token")
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-9xl font-extrabold text-gray-900 tracking-widest">404</h1>
      <div className="bg-blue-500 px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <Link
        to={`${access_token ? "/dashboard" : "/"}`}
        className="relative inline-block text-sm font-medium "
      >
        <Button variant="outline">Go Home</Button>
      </Link>
    </div>
  )
}

export default NotFoundPage