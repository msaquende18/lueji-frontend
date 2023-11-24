import React,{FC, useState, useEffect} from 'react'
import axios from 'axios';

type Props = {
    videoUrl: string;
    titulo: string;
}

const CursoPlayer: FC<Props> = ({videoUrl, titulo}) => {
    const [dadosDoVideo,setdadosDoVideo] = useState({
        otp:"",
        playbackInfo:"",
    });

    useEffect(() => {
        axios
          .post("https://academia-lueji.onrender.com/api/v1/getVdoCipherOTP", {
            videoId: videoUrl,
          })
          .then((res) => {
            setdadosDoVideo(res.data);
          });
    }, [videoUrl]);
  return (
    <div style={{ paddingTop: "56.25%", position: "relative", overflow: "hidden" }}>
      {dadosDoVideo.otp && dadosDoVideo.playbackInfo !== "" && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${dadosDoVideo?.otp}&playbackInfo=${dadosDoVideo.playbackInfo}&player=JnMYQ8XufI0JB2SI`}
          style={{
            border: 0,
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          allowFullScreen={true}
          allow="encrypted-media"
        ></iframe>
      )}
    </div>
  );
  
 };

export default CursoPlayer