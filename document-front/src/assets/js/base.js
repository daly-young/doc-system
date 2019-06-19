
import router from '@/router'
export const handleResult = (data) => {
  let { code } = data
  if (code === 9999) {
    router.push('/login')
  } else {
    return data
  }
}