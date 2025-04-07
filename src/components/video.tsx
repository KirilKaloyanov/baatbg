import styles from "./video.module.css";

const Video = ({ videoId }: { videoId: string }) => {
  return (
    <div className={styles.videoContainer}>
      <iframe
        className={styles.videoIframe}
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; 
        autoplay; 
        clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Video;
