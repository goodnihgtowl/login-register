import axios from 'axios';
import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router';
export default function Login() {

  //Declare user
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const router = useRouter()

  //Initialize error message
  const [errorMessage, setErrorMessage] = useState('')

  //Change state of logging user
  const onChangeHandler = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
    console.log("State", user)
  }


  const submitHandler = async (e: any) => {
    e.preventDefault()
    try {
      const data = await signIn('credentials', {
        redirect: false,
        email: user.email,
        password: user.password
      })

      console.log(data)
      if (data?.ok !== true) {
        throw new Error("Email or password is not correct!")
      }
      if (data?.ok === true) {
        router.push('/')
      }
    } catch (e: any) {
      setErrorMessage(e.message)
    }
  }

  return (
    <>

      <form method="POST" className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-black"
          >
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              onChange={(e) => { onChangeHandler(e) }}
              autoComplete="email"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-black"
          >
            Password
          </label>
          <div className="mt-1">
            <input
              name="password"
              id="password"
              type="password"
              onChange={(e) => { onChangeHandler(e) }}
              autoComplete="current-password"
              required
            />
          </div>
          <p className='text-black'>{errorMessage}</p>
        </div>

        <div>
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
          />
          <label
            htmlFor="remember-me"
          >
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a
            href="#"
          >
            Forgot your password?
          </a>
        </div>

      <div >
        <div className="text-sm">
          <a
            href="/register"
          >
            Don&apos;t have an account?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          onClick={(e) => submitHandler(e)}
          className = "bg-orange-400"
        >
          Sign in
        </button>
      </div>
    </form>
    </>
  );
}
