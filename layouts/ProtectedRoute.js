// ProtectedRoute.js
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../pages/firebase/config';
import { useEffect } from 'react'; // Add this import
// import getServer

export default function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  console.log("hi!)")
  console.log(user)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

//   if (!user[0]) {
//     console.log("um?")
//     router.push('/login');
//     return null;
//   }

  return children;
}