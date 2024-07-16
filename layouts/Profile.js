'use client';
import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { useState } from "react";
import { auth } from '../pages/firebase/config'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from "firebase/auth";
import { signOut } from '@firebase/auth';

const Profile = ({ data }) => {
  const auth = getAuth();
  const [user] = useAuthState(auth);

  const userEmail = user?.email;

  const { frontmatter } = data;
  const { title, info } = frontmatter;
  const { contact_form_action } = config.params;
    
  return (
    <section className="section"> 
        <div className="container">
            {markdownify(title, "h1", "text-center font-normal")}

            {userEmail ? (
                <h3>Logged in user email: {userEmail}</h3>
            ) : (
                <p>No user logged in</p>
            )}
            <br></br>
            <br></br>
            <button type="submit" className="btn btn-primary" onClick={() => signOut(auth)}>
                  Log Out
            </button>
        </div>
    </section>
    
  );
};

export default Profile;