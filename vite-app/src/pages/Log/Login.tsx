import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center px-16 py-0 w-full max-w-[1440px]">
        <div className="flex flex-col items-center justify-center gap-8 w-full flex-1">
          <div className="flex flex-col items-center gap-6 w-full">
            <h2 className="text-4xl font-bold text-black text-center">
              Log In
            </h2>
            <p className="text-lg text-black text-center">
              Please enter your credentials to continue
            </p>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col w-[480px] items-center justify-center gap-4">
              <input
                className="w-full p-3 border border-solid border-black rounded-lg font-normal text-gray-800 placeholder:text-gray-600"
                placeholder="Email"
                type="email"
              />

              <input
                className="w-full p-3 border border-solid border-black rounded-lg font-normal text-gray-800 placeholder:text-gray-600"
                type="password"
                placeholder="Password"
              />

              <button className="w-full px-6 py-3 bg-black text-white rounded-lg font-normal hover:bg-black/90 transition-colors">
                Log in
              </button>

              <div className="flex flex-col items-start px-0 py-4 w-full">
                <div className="w-full h-px bg-gray-300" />
              </div>

              <button className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-solid border-black rounded-lg font-normal hover:bg-gray-50 transition-colors">
                <img
                  className="w-6 h-6"
                  alt="Google"
                  src="/google-icon.svg"
                />
                Log in with Google
              </button>

              <button className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-solid border-black rounded-lg font-normal hover:bg-gray-50 transition-colors">
                <img
                  className="w-6 h-6"
                  alt="Facebook"
                  src="/facebook-icon.svg"
                />
                Log in with Facebook
              </button>
            </div>

            <div className="flex flex-col items-center gap-4">
              <button className="text-black underline hover:text-gray-700">
                Forgot your password?
              </button>

              <div className="flex items-center gap-2">
                <span className="text-black">
                  Don't have an account?
                </span>
                <button className="text-black underline hover:text-gray-700">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 