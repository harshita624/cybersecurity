// app/auth/error.js
import { useRouter } from 'next/navigation';

const ErrorPage = () => {
  const router = useRouter();
  const { error } = router.query; // Error message passed via query parameter

  return (
    <div className="error-page">
      <h1>Authentication Error</h1>
      <p>{error ? error : 'An unknown error occurred.'}</p>
      <a href="/auth/signin">Back to Sign In</a>
    </div>
  );
};

export default ErrorPage;

