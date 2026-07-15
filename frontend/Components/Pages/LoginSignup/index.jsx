import { motion } from "framer-motion";
import {
  BrainCircuit,
  Mail,
  Lock,
  User,
  Building2,
  ArrowRight
} from "lucide-react";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function LoginSignup() {

  const navigate = useNavigate();

  const [login, setLogin] = useState(true);


  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");



  const handleSignup = async () => {

    try {

      const response = await axios.post(
        `https://neuroloom.onrender.com/api/auth/signup`,
        {
          username,
          email,
          password,
          companyName
        }
      );


      console.log(response.data);


      alert("Account Created Successfully");


      navigate("/home");


    } catch(error){

      console.log("Full Error:", error);

  if (error.response) {
    console.log("Status:", error.response.status);
    console.log("Data:", error.response.data);
    alert(error.response.data.message || "Signup Failed");
  } else {
    console.log(error.message);
    alert(error.message);
  }

    }

  };



  return (

<div className="min-h-screen flex bg-slate-950 overflow-hidden">


{/* LEFT */}

<div className="w-1/2 flex items-center justify-center bg-white">


<motion.div

initial={{x:-60,opacity:0}}

animate={{x:0,opacity:1}}

transition={{duration:.7}}

className="w-[430px]"

>


<h1 className="text-5xl font-bold">

{login ? "Welcome Back" : "Create Account"}

</h1>


<p className="mt-3 text-gray-500">

AI Powered ERP for modern companies.

</p>



<div className="space-y-5 mt-10">


{
!login &&

<Input

icon={<User size={20}/>}

placeholder="Username"

value={username}

onChange={(e)=>setUsername(e.target.value)}

/>

}



<Input

icon={<Mail size={20}/>}

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>



<Input

icon={<Lock size={20}/>}

placeholder="Password"

type="password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>



{
!login &&

<Input

icon={<Building2 size={20}/>}

placeholder="Company Name"

value={companyName}

onChange={(e)=>setCompanyName(e.target.value)}

/>

}




<button

onClick={login ? null : handleSignup}

className="group w-full bg-indigo-600 rounded-2xl text-white py-4 font-semibold flex justify-center items-center gap-3 hover:bg-indigo-700 duration-300"

>


{login ? "Login" : "Create Account"}


<ArrowRight

className="group-hover:translate-x-1 duration-300"

/>


</button>



</div>



<p className="text-center mt-8">


{login 
? "Don't have an account?" 
: "Already have an account?"
}



<button

onClick={()=>setLogin(!login)}

className="text-indigo-600 ml-2 font-bold"

>


{login ? "Sign Up" : "Login"}


</button>



</p>


</motion.div>


</div>





{/* RIGHT SIDE */}


<div className="relative w-1/2 overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-cyan-700">



<motion.div

animate={{
y:[0,-30,0],
x:[0,30,0]
}}

transition={{
repeat:Infinity,
duration:10
}}

className="absolute w-96 h-96 bg-cyan-400/30 blur-[120px] rounded-full top-10 left-10"

/>



<motion.div

animate={{
y:[0,40,0],
x:[0,-40,0]
}}

transition={{
repeat:Infinity,
duration:12
}}

className="absolute w-[450px] h-[450px] bg-purple-500/30 blur-[120px] rounded-full bottom-0 right-0"

/>



<div className="relative h-full flex flex-col items-center justify-center text-white">


<motion.div

animate={{
rotate:[0,8,-8,0]
}}

transition={{
repeat:Infinity,
duration:6
}}

className="bg-white/10 backdrop-blur-xl rounded-3xl p-8"

>


<BrainCircuit size={80}/>


</motion.div>



<h1 className="text-7xl font-black mt-8">

Neuroloom

</h1>



<p className="text-xl text-center mt-6 max-w-lg text-indigo-100 leading-9">

The next-generation AI ERP platform that transforms business operations with intelligent automation, natural language interaction, and real-time analytics.

</p>



<div className="grid grid-cols-2 gap-5 mt-16">


<Card title="AI Assistant"/>

<Card title="Analytics"/>

<Card title="Projects"/>

<Card title="Smart ERP"/>


</div>



</div>



</div>



</div>


);


}




function Input({icon,...props}){

return(

<div className="flex items-center gap-3 border rounded-2xl px-5 py-4 focus-within:border-indigo-600 transition">


{icon}


<input

{...props}

className="outline-none w-full"

/>


</div>


)

}




function Card({title}){

return(

<motion.div

whileHover={{
scale:1.05
}}

className="bg-white/10 backdrop-blur-xl rounded-2xl p-6"

>


<h2 className="font-bold text-2xl">

{title}

</h2>


<p className="mt-2 text-indigo-100">

Powered by AI

</p>


</motion.div>

)

}