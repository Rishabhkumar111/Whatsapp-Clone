import React, { useEffect } from "react";
import Image from "next/image";
import {FcGoogle} from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";

function login() {
  const router = useRouter();

  const [{userInfo, newUser}, dispatch] = useStateProvider();

  useEffect(()=>{
    if(userInfo?.id && !newUser)router.push("/");
  },[userInfo, newUser]);

  const handlelogin = async()=>{
    const provider = new GoogleAuthProvider();
    const {
      user:{displayName:name, email, photoURL:profileImage}
    } = await signInWithPopup(firebaseAuth, provider);
    try {
      if(email){
        const {data} = await axios.post(CHECK_USER_ROUTE, {email});
        
        if(!data.status){
          dispatch({
            type:reducerCases.SET_NEW_USER,
            newUser:true,
          });
          dispatch({
            type:reducerCases.SET_USER_INFO, 
            userInfo:{
              name,email,profileImage,status:"",
            },
          });
          router.push("/onboarding");
        } else{
          const {id,name,email,profilePicture:profileImage, status} = data.data;
          dispatch({
            type:reducerCases.SET_USER_INFO, 
            userInfo:{
              id,name,email,profileImage,status,
            },
          });
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return <div className="flex justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-6">
    <div className="flex justify-center items-center text-white gap-2">
      <Image src="/whatsapp.gif" height={300} width={300} alt="Whatsapp Image"/>
      <span className=" text-7xl">Whatsapp</span>
    </div>
    <button className=" flex justify-center text-center p-5 rounded-lg gap-7 bg-search-input-container-background" onClick={handlelogin}>
      <FcGoogle className=" text-4xl"/>
      <span className=" text-white text-2xl">Login with Google</span>
    </button>
  </div>;
}

export default login;
