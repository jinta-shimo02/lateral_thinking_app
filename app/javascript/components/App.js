// app/javascript/components/App.js
import React from "react";
import Chat from "./Chat";

const App = () => {
    return (
        <div>
            <div className="flex w-full" style={{ padding: '0px 5%'}}>
                <div className="card bg-base-300 rounded-box grid h-10 flex-grow place-items-center" >content</div>
                <div className="divider lg:divider-horizontal"></div>
                <div className="card bg-base-300 rounded-box grid h-10 flex-grow place-items-center">content</div>
            </div>
            <Chat />
        </div>
    );
};

export default App;
