'use client';
import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { useState } from "react";
import { auth } from '../pages/firebase/config'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
// import { createUserWithEmailAndPassword } from "@firebase/auth";
const Contact = ({ data }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);




  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password)
      console.log({res})
      // sessionStorage.setItem('user',true)
      setEmail('');
      setPassword('');
    } catch(e){
      console.error(e)
    }
    // console.log('User signed up: ', {email, password});
  };

  const { frontmatter } = data;
  const { title, info } = frontmatter;
  const { contact_form_action } = config.params;

// const { blog_folder, summary_length } = config.settings;

  return (
    <section className="section">
      <div className="container">
        {markdownify(title, "h1", "text-center font-normal")}
        <div className="contact-form d-flex justify-content-center">
          <div className="col-12 md:col-6 lg:col-3 text-center">
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="email"
                  type="email"
                  placeholder="Your email"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="passw"
                  type="password"
                  placeholder="Password"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                />
              </div>
              {/* <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-textarea w-full rounded-md"
                  rows="7"
                  placeholder="Your message"
                />
              </div> */}
              <button type="submit" className="btn btn-primary" onClick={handleSignUp}>
                Submit
              </button>
              {/* <Link className="btn btn-primary mt-4"
                href={`/case`}
                rel="">
                Submit
              </Link> */}
          </div>
          <div className="content col-12 md:col-6 lg:col-5">
            {markdownify(info.title, "h4")}
            {markdownify(info.description, "p", "mt-4")}
            {/* <ul className="contact-list mt-5">
              {info.contacts.map((contact, index) => (
                <li key={index}>
                  {markdownify(contact, "strong", "text-dark")}
                </li>
              ))}
            </ul> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;