import { useState } from 'react';
import { Link } from 'react-router-dom'

export default function Signup() {

    const [first_name, set_first_name] = useState("");
    const [email, set_email] = useState("");
    const [password, set_password] = useState("");
    const [response, set_response] = useState(null);
    const [error, set_error] = useState(null);

    const signup = (() => {
        const data = {
            "first_name": first_name,
            "email": email,
            "password": password
        };

        const options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }

        try {
            fetch('http://localhost:8000/signup', options).then(
                response => {
                    set_response(response.data);
                    console.log(response.json());
                }
            );
        } catch (err) {
            set_error(err);
        }
    });

    return (
        <div className="main-content">
        <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
                <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                    <h1 className="title-font font-medium text-3xl text-white">KhataBook</h1>
                    <p className="leading-relaxed mt-4 text-white">Manage All Your Expenese Here</p>
                </div>
                <div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                    <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
                    <div class="relative mb-4">
                        <label for="full-name" class="leading-7 text-sm text-gray-600">Full Name</label>
                        <input type="text" id="full-name" name="full-name" class="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => set_first_name(e.target.value)} />
                    </div>
                    <div class="relative mb-4">
                        <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
                        <input type="email" id="email" name="email" class="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => set_email(e.target.value)} />
                    </div>
                    <div class="relative mb-4">
                        <label for="email" class="leading-7 text-sm text-gray-600">Password</label>
                        <input type="password" id="email" name="email" class="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => set_password(e.target.value)} />
                    </div>
                    <button class="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg" onClick={signup}>SignUp</button>
                    <p class="text-xs text-gray-500 mt-3">Manage you Expenses Efficiently.</p>
                    <div className="text-grey-dark mt-6 px-8">
                        Already have an account?
                        <Link className="no-underline border-b border-blue text-black px-2" to="/login">
                            Log in </Link>
                    </div>
                    {response && <div>{response}</div>}
                </div>
            </div>
        </section>
        </div>
    );
}