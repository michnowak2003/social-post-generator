import {React, useState, useRef} from "react";
import domtoimage from 'dom-to-image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ConfigArea from "./components/ConfigArea/ConfigArea";
import Post from "./components/Post/Post";


function App() {
    const toastId = useRef(null);
    const [installationData, setInstallationData] = useState({city: "", power: "", background: {}, image: ""})

    const changeData = (type, value) => {
        console.log(value)
        const newData = {...installationData};
        if(value && type === "power"){
            value = `${Number.parseFloat(value).toFixed(1)} kWp`;
        }
        newData[type] = value;
        setInstallationData(newData)
    }

    const generatePost = () => {
        toastId.current = toast.info("Generowanie pliku", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        domtoimage.toJpeg(document.getElementById('post'), {
            quality: 0.95,
        })
            .then(function (dataUrl) {
                toast.update(toastId.current, {
                    render: 'Gotowe do pobrania!',
                    type: toast.TYPE.SUCCESS,
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                var link = document.createElement('a');
                link.download = 'my-image-name.jpeg';
                link.href = dataUrl;
                link.click();
            })
            .catch(function (error) {
                toast.update(toastId.current, {
                    render: 'Nieznany błąd!',
                    type: toast.TYPE.ERROR,
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                console.error('oops, something went wrong!', error);
            });
    }

    return (
    <div className="App">
        <ConfigArea changeData={(type, value) => changeData(type, value)} generatePost={() => generatePost()}/>
        <Post data={installationData}/>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    </div>
  );
}

export default App;
