import React, { FC, useEffect, useState } from "react";
import axios from "axios";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    axios
      .post("http://localhost:3000/api/v1/getVdoCipherOTP", {
        videoId: videoUrl,
      })
      .then((res) => {
        setVideoData(res.data);
      });
  }, [videoUrl]);
  return (
    <div style={{ paddingTop: "56%", position: "relative" }}>
      <iframe
        src="https://player.vdocipher.com/v2/?otp=20160313versASE3232rhzukP5S1PEX4t1HioOvqA0lrVo43LqOit32PDC6fLDqP&playbackInfo=eyJ2aWRlb0lkIjoiNzY2Y2FjYTdlMjZiNDVmNGJiMGVlNmM4MGJiMDIyMWMifQ=="
        style={{
          border: 0,
          maxWidth: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
        }}
        allowFullScreen={true}
        allow="encrypted-media"
      ></iframe>
    </div>
  );
};
export default CoursePlayer;
