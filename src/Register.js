import { useRef, useState, useEffect } from "react";  //importing hooks
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;  //validating username
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; //validating password
//react functional component
const Register = () => {
    const userRef =useRef();  //set the focus on user input when the component loads
    const errRef = useRef();  //incase of error, error is announced
 
    const [user, setUser] = useState('');  //user state
    const [validName, setValidName] = useState(false); //boolean whether name validates or not
    const [userFocus, setUserFocus] = useState(false);  //focus on user field

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
//useeffect hook to setting the focus when component loads and will set focus on username input
    useEffect(() => {
        userRef.current.focus();
    }, [] )
//validate the username
    useEffect(() =>{
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user]) //username is in the dependency array, so anytime it changes it will check the validation of the field

//useEffect for password and setting valid match of passward
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd; //validating pwd and confirm pwd; anytime one changes it will check again
        setValidMatch(match);
    }, [pwd, matchPwd]) //dependency array

//useEffect for error msg
    useEffect(()=>{
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        //if button enables with JS hack
        const v1= USER_REGEX.test(user);
        const v2= PWD_REGEX.test(pwd);
        if(!v1 || !v2){
            setErrMsg("Invalid Entry");
            return;
        }
        //to submit successfully
        console.log(user,pwd);
        setSuccess(true);
    }
    
    return (
        <> 
        {success ? (
            <section>
                <h1>Success!</h1>
                <p>
                    <a href="./signin.js">Sign In</a>
                </p>
            </section>    
        ) : (

    <section>
        <p ref ={errRef} className ={errMsg ? "errmsg": "offscreen"} 
        aria-live ="assertive">{errMsg}</p> 
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <lable htmlFor ="username"> 
               Username:
               <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon ={faCheck} />
               </span>
               <span className ={validName || !user ? "hide" : "invalid"}>
                <FontAwesomeIcon icon ={faTimes} />
               </span>
            </lable>
            <input 
            type= "text"
            id="username" //should match with htmlfor attribute of label
            ref={userRef}  //allow us to set focus on input
            autoComplete ="off" //donot see previous values suggested for this field
            onChange={(e) => setUser(e.target.value)} //ties the input to userstate, will provide event and set userstate
            required
            aria-invalid ={validName ? "false" : "true"}  //valid input or not
            aria-describedby ="uidnote" //describes the input field to give the full requirements
            onFocus= {() => setUserFocus(true)}
            onBlur ={()=> setUserFocus(false)}
            />
            <p id ="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon = {faInfoCircle} />
                4 to 24 characters. <br />
                Must begin with a letter .<br />
                Letters, numbers, underscores, hyphens allowed.
            </p>
            <label htmlFor="password">
                            Password:
                            <span className={validPwd ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validPwd || !pwd ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon ={faTimes} />
                            </span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: 
                            <span aria-label="exclamation mark">!</span> 
                            <span aria-label="at symbol">@</span> 
                            <span aria-label="hashtag">#</span> 
                            <span aria-label="dollar sign">$</span> 
                            <span aria-label="percent">%</span>
                        </p>
                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <span className ={validMatch && matchPwd ? "valid" : "hide"}> 
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes}  />

                            </span>
                        
                           
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="./signin.js">Sign In</a>
                        </span>
                    </p>
    </section>
        )}
    </>
  )
}

export default Register

