import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { NextApiResponse } from "next";
import User from "../Schema/User";

export default function register() {

  const router = useRouter()
  const [password2, setPassword2] = useState('')
    const formik = useFormik({
      initialValues: {
        email: "",
        password: ""
      },
      onSubmit: async (values: any) => {
        // Do something with the form values
        try {
          if(values.password !== password2){
            throw new Error("Password doesn't match!")
          }
          console.log("Submit", values)
          await axios.post("/api/register", { user: values })
          router.push('/login')
        } catch (e: any) {
          setPasswordError(e.message)
        }
      }
    });
    const [passwordError, setPasswordError] = useState('')
    useEffect(()=>{
      console.log(passwordError)
    }, [passwordError])
    return (
      <>
                  <form onSubmit={formik.handleSubmit} method="POST" className="space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                      >
                        Email address
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          value={formik.values.email}
                          type="email"
                          autoComplete="email"
                          required
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <div className="mt-1">
                        <input
                          id="password"
                          name="password"
                          value={formik.values.password}
                          type="password"
                          autoComplete="password"
                          required
                          onChange={formik.handleChange}
                        />
                      </div>
                    
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="password2"
                      >
                        Re-enter Password
                      </label>
                      <div className="mt-1">
                        <input
                          id="password2"
                          name="password2"
                          type="password"
                          autoComplete="current-password"
                          onChange={(e)=>{setPassword2(e.target.value)}}
                          required
                        />
                      </div>
                    </div>
                    <p className="text-white">{passwordError}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
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
                          href="/login"
                        >
                          Already have account?
                        </a>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                      >
                        Register
                      </button>
                    </div>
                  </form>
      </>
    );
  }
