import React from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import {v4 as uuidV4} from 'uuid'
import { ZegoSuperBoardManager } from "zego-superboard-web";

export default function Zego(props) {
    // const { id } = useParams();
    const id = props.roomId;
    let myMeeting = async (element) => {
        const appID = Your_appID;
        const serverSecret = "Your_serverSecret";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, id, uuidV4(), "Ajay");
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.addPlugins({ZegoSuperBoardManager});
        zp.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
            },
            whiteboardConfig: {            
                showAddImageButton: true, 
             },
        })
    }
    return (
        <>
            <div className='myCallContainer' ref={myMeeting} style={{ width: '60vw', height: '80vh' }}>
            </div>
        </>
    )
}

