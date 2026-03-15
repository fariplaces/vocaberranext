'use client'
import { checkAuth } from '@/store/slices/authSlice';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AuthCheck = ({ children }) => {
   const dispath = useDispatch();
   const pathName = usePathname();
   const { user, isLoggedIn, loading } = useSelector((state) => state.auth);
   const router = useRouter();

   useEffect(() => {
      dispath(checkAuth());
   }, []);

   useEffect(() => {
      if (!loading && (!user || !isLoggedIn)) {
         router.push('/auth/login');
      }
      // Logged in but on login page → redirect home

      if (!loading && isLoggedIn && pathName === '/auth/login') {
         router.push('/')
      }
   }, [user, loading, router])

   if (loading) {
      return <div>Loading ....</div>
   } else {
      return <>
         {children}
      </>
         ;
   }
}
export default AuthCheck
