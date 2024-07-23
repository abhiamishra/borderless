'use client';
import config from "@config/config.json";
import ReactMarkdown from 'react-markdown'
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { useState, useEffect } from "react";
import { auth } from "../config";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useRouter } from "next/navigation";
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut, getAuth } from '@firebase/auth';

const Question = ({ data }) => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [question, setQuestion] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');

  const { frontmatter } = data;
  const { title, info } = frontmatter;
  const { contact_form_action } = config.params;

  useEffect(() =>  {
    const fetchToken = async() => {
        // Retrieve the token from wherever you're storing it (e.g., localStorage)
        const storedToken = await user.getIdToken();;
        if (storedToken) {
            setToken(storedToken);
        }
    };

    fetchToken();
  }, []);


  const handleSubmit = async () => {
    setIsLoading(true);
    setShowAnswer(false);
    // const idToken = await user.getIdToken();
    try {
        const response = await fetch('https://borderless-backend.vercel.app/question', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ question: question }),
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        // Here you would typically send the question to your backend or AI service
        // For now, we'll just set a dummy answer
        const data = await response.json();
        console.log(data)
        setAnswer(data)
        // setAnswer("This is a placeholder answer. In a real application, this would be the response from your AI or backend service.");
        setShowAnswer(true);
    } finally {
        setIsLoading(false);
    
    }

  } 

  const handleExternalLinkClick = (url) => {
    // Handle potential external link opening logic (e.g., prompt user)
    window.open(url, '_blank'); // Open external links in new tab by default
  };

  const SentenceBreak = ({ children }) => {

    if (typeof children !== 'string') {
        return children; // Return non-string elements as-is
      }
    
    // Trim leading and trailing whitespace
    const trimmedChildren = children.trim();

    // Remove periods at the beginning or end, if present
    const contentWithoutStrayPeriods = trimmedChildren.replace(/^\.|\.$/g, '');
    
      return (
        <p>
          {contentWithoutStrayPeriods.split('.').map((sentence, index) => (
            <span key={index}>
              {sentence}.
              <br />
              {/* {index < children.split('.').length - 1 && <br />} */}
              <br />
            </span>
          ))}
        </p>
      );

  };

  return (
    <section className="section">
      <div className="container mx-auto px-4">
        {markdownify(title, "h1", "text-center font-normal mb-8")}
        <div className="max-w-3xl mx-auto">
          <p>Ask Borderless uses LLMs and answers can vary/be incorrect. Any output should not be taken as legal advice.</p>
          <br></br>
          <div className="w-full">
              <div className="mb-4">
                <input
                  className="form-input w-full rounded"
                  name="question"
                  type="text"
                  placeholder="Your question"
                  value={question} 
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                />
              </div>

              {showAnswer && (
              <div className="mb-4 p-4 bg-gray-100 rounded overflow-auto max-h-96"> {/* Added overflow and max height */}
                <ReactMarkdown
                  components={{
                    p: SentenceBreak,
                    a: ({ node, ...props }) => (
                      <a
                        {...props}
                        // No need for target="_blank" or rel attributes as handled in handleExternalLinkClick
                        className="text-blue-600 hover:underline"
                        onClick={() => handleExternalLinkClick(node.href)} // Handle click event for external links
                      />
                    )
                  }}
                >
                  {answer}
                </ReactMarkdown>
              </div>
            )}


              <div className="text-center">
                <button type="submit" className="btn btn-primary" onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
              
          </div>

        </div>
      </div>
    </section>
  );
};

export default Question;