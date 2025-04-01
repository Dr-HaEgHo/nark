import dynamic from 'next/dynamic';

export const Login = dynamic(() => import('../../components/auth/Login'), {
  ssr: false
})

export const Signup = dynamic(() => import('../../components/auth/Signup'), {
  ssr: false
})