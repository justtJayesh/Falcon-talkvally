import { Button, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { FcVideoCall } from "react-icons/fc";
import "./Landingpage.css";
import { useNavigate } from "react-router-dom";
import { useReactMediaRecorder } from "react-media-recorder";


const Landingpage = () => {
    const { status, startRecording, stopRecording, mediaBlobUrl } =
        useReactMediaRecorder({ video: true, audio: true, screen: true });

    const navigate = useNavigate();
    const fetchReq = async () => {
        try {
            const resp = await axios.get(
                "https://talkvally-backend.onrender.com/talkvally",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            console.log(resp.data);
        } catch (error) {
            navigate("/auth")
            console.log({ error: error.message });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/auth");
    };

    useEffect(() => {
        fetchReq();
    }, []);

    return (
        <div>
            <nav id="navbar">
                <div id="icon">
                    <FcVideoCall size={"40px"} />
                    <p>FALCON</p>
                </div>
                <Button variant={"unstyled"} onClick={handleLogout}>
                    Logout
                </Button>
            </nav>

            <div id="recording-container">
                <video id="video-player" src={mediaBlobUrl} controls />
                <div id="controls">
                    <Text fontSize={"30px"}>{status}</Text>
                    <Button variant={"outline"} onClick={startRecording}>
                        Start Recording
                    </Button>
                    <Button variant={"outline"} onClick={stopRecording}>
                        Stop Recording
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Landingpage;
