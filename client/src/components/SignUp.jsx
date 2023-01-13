import React, {useContext, useState} from 'react'
import { LockClosedIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const SignUp = () => {
  const { handleSignUp, isSignedIn, isLoading } = useContext(AuthContext);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (

    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=yellow&shade=400"
              alt="Blog P"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create an Account With Blog P
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Have an Account?{' '}
              <Link to="/signin" className="font-medium text-yellow-500 hover:text-yellow-600">
                Sign In
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={e => { e.preventDefault(); handleSignUp({fullname, email, password})}}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Full Name
                </label>
                <input
                  id="full-name"
                  value={fullname}
                  onChange={e => setFullname(e.target.value)}
                  name="full-name"
                  type="text"
                  autoComplete=""
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-yellow-600 py-2 px-4 text-sm font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 mt-8"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-yellow-500 group-hover:text-yellow-400" aria-hidden="true" />
                </span>
                {
                  isLoading ? 'Creating Your Account ...' : 'Sign Up'
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp