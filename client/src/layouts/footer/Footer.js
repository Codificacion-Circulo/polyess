import React from 'react'

function Footer(props) {
    return (
        <footer className="bg-light text-center text-white">

            <div className="container p-4 pb-0">

                <section className="mb-4">


                    <a className="mx-2" style={{ color: "#dd2a7b" }} href="#" role="button"><i class="fab fa-instagram fa-lg"></i></a>
                    
                    


                    <a className="mx-2" style={{ color: "#0077b5" }} href="#!" role="button"><i class="fab fa-linkedin fa-lg"></i></a>
                    
                    

                    <a className="mx-2" style={{ color: "#5865f2" }} href="#!" role="button"><i class="fab fa-discord fa-lg"></i></a>




                    <a className="mx-2" style={{ color: "#6e5494" }} href="#!" role="button"><i class="fab fa-github fa-lg"></i></a>
                   
                   




                </section>

            </div>



            <div className="text-center p-3 text-dark" style={{ backgroundColor: "#e3f2fd" }}>
                © 2021 Copyright:
                <a style={{ textDecoration: "none" }} className="text-dark mx-2" href="https://codificacion.org/">Polyess</a>
            </div>

        </footer>
    )
}

export default Footer

