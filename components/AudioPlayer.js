import React, {useState, useRef, useEffect} from "react";
import styles from "../styles/AudioPlayer.module.css";
import {BsArrowLeftShort, BsArrowRightShort} from "react-icons/bs";
import {FaPlay, FaPause} from "react-icons/fa";

const AudioPlayer = () => {
	// state
	const [isPlaying, setIsPlaying] = useState(false);
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);

	// references
	const audioPlayer = useRef(); // reference our audio component
	const progressBar = useRef(); // reference our progress bar
	const animationRef = useRef(); // reference the animation

	useEffect(() => {
		const seconds = Math.floor(audioPlayer.current.duration);
		setDuration(seconds);
		progressBar.current.max = seconds;
	}, [
		audioPlayer?.current?.loadedmetadata,
		audioPlayer?.current?.readyState,
	]);

	const calculateTime = (seconds) => {
		if (isNaN(seconds)) {
			return `00:00`;
		}
		const date = new Date(seconds * 1000);
		const hh = date.getUTCHours();
		const mm = date.getUTCMinutes();
		const ss = date.getUTCSeconds().toString().padStart(2, "0");
		if (hh) {
			return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
		}
		return `${mm}:${ss}`;
	};

	const togglePlayPause = () => {
		const prevValue = isPlaying;
		setIsPlaying(!prevValue);
		if (!prevValue) {
			audioPlayer.current.play();
			animationRef.current = requestAnimationFrame(whilePlaying);
		} else {
			audioPlayer.current.pause();
			cancelAnimationFrame(animationRef.current);
		}
	};

	const whilePlaying = () => {
		progressBar.current.value = audioPlayer.current.currentTime;
		changePlayerCurrentTime();
		animationRef.current = requestAnimationFrame(whilePlaying);
	};

	const changeRange = () => {
		audioPlayer.current.currentTime = progressBar.current.value;
		changePlayerCurrentTime();
	};

	const changePlayerCurrentTime = () => {
		progressBar.current.style.setProperty(
			"--seek-before-width",
			`${(progressBar.current.value / duration) * 100}%`
		);
		setCurrentTime(progressBar.current.value);
	};

	const backThirty = () => {
		progressBar.current.value = Number(progressBar.current.value - 30);
		changeRange();
	};

	const forwardThirty = () => {
		progressBar.current.value = Number(progressBar.current.value + 30);
		changeRange();
	};

	return (
		<div className={styles.audioPlayer}>
			<video
				width={255}
				ref={audioPlayer}
				src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
				type='video/mp4'
				preload='metadata'
			></video>
			{/* <audio
				ref={audioPlayer}
				src='https://cdn.simplecast.com/audio/cae8b0eb-d9a9-480d-a652-0defcbe047f4/episodes/af52a99b-88c0-4638-b120-d46e142d06d3/audio/500344fb-2e2b-48af-be86-af6ac341a6da/default_tc.mp3'
			></audio> */}
			<button className={styles.forwardBackward} onClick={backThirty}>
				<BsArrowLeftShort /> 30
			</button>
			<button onClick={togglePlayPause} className={styles.playPause}>
				{isPlaying ? <FaPause /> : <FaPlay className={styles.play} />}
			</button>
			<button className={styles.forwardBackward} onClick={forwardThirty}>
				30 <BsArrowRightShort />
			</button>

			{/* current time */}
			<div className={styles.currentTime}>
				{calculateTime(currentTime)}
			</div>

			{/* progress bar */}
			{/* <div className='bg-slate-700 rounded-full overflow-hidden'>
				<input
					type='range'
					// className={styles.progressBar}
					className='ring-cyan-500 dark:ring-cyan-400 ring-2 absolute  w-4 h-4 -mt-2 -ml-2 flex items-center justify-center bg-white rounded-full shadow'
					defaultValue='0'
					ref={progressBar}
					onChange={changeRange}
				/>
			</div> */}
			<div>
				<input
					defaultValue='0'
					type='range'
					id='volume'
					name='volume'
					min='0'
					max='11'
					ref={progressBar}
					onChange={changeRange}
				/>
			</div>

			{/* duration */}
			<div className={styles.duration}>
				{duration && !isNaN(duration) && calculateTime(duration)}
			</div>
		</div>
	);
};

export {AudioPlayer};
