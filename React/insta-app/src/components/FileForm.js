import Button from './Button.jsx';
import CustomFileInput from './CustomFileInput';
import { useState } from "react"
import logo from './10900020.png';
import './styles.css';
//import { Container, Grid, Box} from '@mui/material';



function FileForm() {
    const [fileFollowers, setFileFollowers] = useState(null);
    const [fileFollowing, setFileFollowing] = useState(null);
    const [data, setData] = useState(null);
    const handleFileInputChangeFollowers = (event) => {
        //console.log(event.target)
        setFileFollowers(event.target.files[0])
    }
    const handleFileInputChangeFollowing = (event) => {
        setFileFollowing(event.target.files[0])
    }

    const handleSubmit = async (event) => {
        //prevent default action of sending data to server
        event.preventDefault();

        const formData = new FormData();
        //name of the file FastApi receives
        formData.append('followers_file', fileFollowers);
        formData.append('following_file', fileFollowing)

        try {
            const endpoint = "http://localhost:8000/upload_followers"
            const response = await fetch(endpoint, {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                console.log("File uploaded sucessfully!");
                console.log(response);
                const response_data = await response.json()
                setData(response_data)
                //const processedData = response.data.result2
            } else {
                console.error("Failed to uplead file.");
            }

        } catch(error) {
            console.error(error);
        }
    }

    return (
        <div className="clear-grey-background">
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1 style={{ color: 'skyblue' }}>Easily check who follows back!</h1>
                <img src={logo} alt="Instagram Logo" style={{ width: '100px', height: '100px' }}/>               
            </div>   

                               

            <form onSubmit={handleSubmit}>
                <div style={{marginBottom: "20px"}}>
                    <CustomFileInput type="file" label="Select Followers File" onChange={handleFileInputChangeFollowers}/>
                    {fileFollowers && <p>{fileFollowers.name}</p>}
                    <CustomFileInput type="file" label="Select Following File" onChange={handleFileInputChangeFollowing}/>
                    {fileFollowing && <p>{fileFollowing.name}</p>}
                </div>

                <Button type="submit">Upload</Button>                
            </form>

            
            
            <h4 style={{ color: 'skyblue' }}>Unfollow:</h4>
            <pre>{JSON.stringify(data)}</pre>
        </div>
    )
}

//username _merge
export default FileForm;