/* ==========================================
   SUPABASE CONFIGURATION
========================================== */

/*
   Replace these two values with your
   Supabase project information.
*/


const SUPABASE_URL =
    "https://bxeugfyruajrmfsmggfl.supabase.co";


const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_Cfp1rTQEBbKnz_yZReUTMw_IIZ3yht9";


/* Create Supabase client */

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );


/* ==========================================
   LOGIN
========================================== */

const loginForm =
    document.getElementById("loginForm");


const loginMessage =
    document.getElementById("loginMessage");


const loginButton =
    document.getElementById("loginButton");


loginForm.addEventListener("submit", async function(event) {

    event.preventDefault();


    const email =
        document
        .getElementById("email")
        .value
        .trim();


    const password =
        document
        .getElementById("password")
        .value;


    /* Clear previous message */

    loginMessage.textContent = "";

    loginMessage.className = "message";


    /* Disable button */

    loginButton.disabled = true;

    loginButton.textContent = "Logging in...";


    try {

        const {
            data,
            error
        } = await supabaseClient.auth.signInWithPassword({

            email: email,

            password: password

        });


        /* Login error */

        if (error) {

            console.error(
                "Supabase Login Error:",
                error
            );


            loginMessage.textContent =
                "Login failed: " + error.message;

            loginMessage.classList.add("error");


            loginButton.disabled = false;

            loginButton.textContent = "Login";

            return;
        }


        /* Successful login */

        console.log(
            "Login successful:",
            data.user
        );


        loginMessage.textContent =
            "Login successful! Redirecting...";

        loginMessage.classList.add("success");


        /*
           Save login state locally.
           Supabase also persists the Auth session.
        */

        localStorage.setItem(
            "loggedIn",
            "true"
        );


        localStorage.setItem(
            "userEmail",
            data.user.email
        );


        /* Redirect */

        setTimeout(function() {

            window.location.href =
                "dashboard.html";

        }, 700);


    } catch (error) {

        console.error(error);


        loginMessage.textContent =
            "Something went wrong. Please try again.";

        loginMessage.classList.add("error");


        loginButton.disabled = false;

        loginButton.textContent = "Login";

    }

});