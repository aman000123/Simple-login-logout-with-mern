

import "./home.css";
const Home = ({ setLoginUsers }) => {
    return (
        <>
            <div>
                <div className="homepage">

                    <h1>Hello homepage</h1>
                    <div className="button" onClick={() => setLoginUsers({})}>Log out</div>
                </div>

            </div>

        </>
    )
}
export default Home