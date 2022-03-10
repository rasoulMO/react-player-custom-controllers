/* eslint-disable @next/next/no-img-element */
import React, {useRef, useEffect, useState} from "react";
import ReactPlayer from "react-player";

import Controls from "../components/Controls";
import Control from "../components/Control";

const format = (seconds) => {
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

let count = 0;

function App() {
	const [timeDisplayFormat, setTimeDisplayFormat] = React.useState("normal");
	const [bookmarks, setBookmarks] = useState([]);
	const [state, setState] = useState({
		pip: false,
		playing: true,
		controls: false,
		light: false,

		muted: true,
		played: 0,
		duration: 0,
		playbackRate: 1.0,
		volume: 1,
		loop: false,
		seeking: false,
	});

	const playerRef = useRef(null);
	const playerContainerRef = useRef(null);
	const controlsRef = useRef(null);
	const canvasRef = useRef(null);
	const {
		playing,
		controls,
		light,

		muted,
		loop,
		playbackRate,
		pip,
		played,
		seeking,
		volume,
	} = state;

	const handlePlayPause = () => {
		setState({...state, playing: !state.playing});
	};

	const handleRewind = () => {
		playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
	};

	const handleFastForward = () => {
		playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
	};

	const handleProgress = (changeState) => {
		// if (count > 3) {
		// 	controlsRef.current.style.visibility = "hidden";
		// 	count = 0;
		// }
		// if (controlsRef?.current.style.visibility === "visible") {
		// 	count += 1;
		// }
		if (!state.seeking) {
			setState({...state, ...changeState});
		}
	};

	const handleSeekChange = (e, newValue) => {
		console.log({newValue});
		setState({...state, played: parseFloat(newValue / 100)});
	};

	const handleSeekMouseDown = (e) => {
		setState({...state, seeking: true});
	};

	const handleSeekMouseUp = (e, newValue) => {
		console.log({value: e.target});
		setState({...state, seeking: false});
		// console.log(sliderRef.current.value)
		playerRef.current.seekTo(newValue / 100, "fraction");
	};

	const handleDuration = (duration) => {
		setState({...state, duration});
	};

	const handleVolumeSeekDown = (e, newValue) => {
		setState({
			...state,
			seeking: false,
			volume: parseFloat(newValue / 100),
		});
	};
	const handleVolumeChange = (e, newValue) => {
		// console.log(newValue);
		setState({
			...state,
			volume: parseFloat(newValue / 100),
			muted: newValue === 0 ? true : false,
		});
	};

	const toggleFullScreen = () => {
		console.log(playerContainerRef.current.requestFullscreen);
	};

	// const handleMouseMove = () => {
	// 	console.log("mousemove");
	// 	controlsRef.current.style.visibility = "visible";
	// 	count = 0;
	// };

	// const hanldeMouseLeave = () => {
	// 	controlsRef.current.style.visibility = "hidden";
	// 	count = 0;
	// };

	const handleDisplayFormat = () => {
		setTimeDisplayFormat(
			timeDisplayFormat === "normal" ? "remaining" : "normal"
		);
	};

	const handlePlaybackRate = (rate) => {
		setState({...state, playbackRate: rate});
	};

	const hanldeMute = () => {
		setState({...state, muted: !state.muted});
	};

	const addBookmark = () => {
		const canvas = canvasRef.current;
		canvas.width = 160;
		canvas.height = 90;
		const ctx = canvas.getContext("2d");

		ctx.drawImage(
			playerRef.current.getInternalPlayer(),
			0,
			0,
			canvas.width,
			canvas.height
		);
		const dataUri = canvas.toDataURL();
		canvas.width = 0;
		canvas.height = 0;
		const bookmarksCopy = [...bookmarks];
		bookmarksCopy.push({
			time: playerRef.current.getCurrentTime(),
			display: format(playerRef.current.getCurrentTime()),
			image: dataUri,
		});
		setBookmarks(bookmarksCopy);
	};

	const currentTime =
		playerRef && playerRef.current
			? playerRef.current.getCurrentTime()
			: "00:00";

	const duration =
		playerRef && playerRef.current
			? playerRef.current.getDuration()
			: "00:00";
	const elapsedTime =
		timeDisplayFormat === "normal"
			? format(currentTime)
			: `-${format(duration - currentTime)}`;

	const totalDuration = format(duration);

	return (
		<>
			<div className='relative m-20'>
				<div
					// onMouseMove={handleMouseMove}
					// onMouseLeave={hanldeMouseLeave}
					ref={playerContainerRef}
					className='relative w-full'
				>
					<ReactPlayer
						ref={playerRef}
						width='100%'
						height='100%'
						url='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
						pip={pip}
						playing={playing}
						controls={false}
						light={light}
						loop={loop}
						playbackRate={playbackRate}
						volume={volume}
						muted={muted}
						onProgress={handleProgress}
						config={{
							file: {
								attributes: {
									crossorigin: "anonymous",
								},
							},
						}}
					/>

					{/* <Controls
						ref={controlsRef}
						onSeek={handleSeekChange}
						onSeekMouseDown={handleSeekMouseDown}
						onSeekMouseUp={handleSeekMouseUp}
						onDuration={handleDuration}
						onRewind={handleRewind}
						onPlayPause={handlePlayPause}
						onFastForward={handleFastForward}
						playing={playing}
						played={played}
						elapsedTime={elapsedTime}
						totalDuration={totalDuration}
						onMute={hanldeMute}
						muted={muted}
						onVolumeChange={handleVolumeChange}
						onVolumeSeekDown={handleVolumeSeekDown}
						onChangeDispayFormat={handleDisplayFormat}
						playbackRate={playbackRate}
						onPlaybackRateChange={handlePlaybackRate}
						onToggleFullScreen={toggleFullScreen}
						volume={volume}
						onBookmark={addBookmark}
					/> */}

					<Control
						ref={controlsRef}
						onSeek={handleSeekChange}
						onSeekMouseDown={handleSeekMouseDown}
						onSeekMouseUp={handleSeekMouseUp}
						onDuration={handleDuration}
						onRewind={handleRewind}
						onPlayPause={handlePlayPause}
						onFastForward={handleFastForward}
						playing={playing}
						played={played}
						elapsedTime={elapsedTime}
						totalDuration={totalDuration}
						onMute={hanldeMute}
						muted={muted}
						onVolumeChange={handleVolumeChange}
						onVolumeSeekDown={handleVolumeSeekDown}
						onChangeDispayFormat={handleDisplayFormat}
						playbackRate={playbackRate}
						onPlaybackRateChange={handlePlaybackRate}
						onToggleFullScreen={toggleFullScreen}
						volume={volume}
						onBookmark={addBookmark}
					/>
				</div>

				<div className='mt-10 flex items-start justify-center'>
					{bookmarks.map((bookmark, index) => (
						<div key={index} item>
							<div
								onClick={() => {
									playerRef.current.seekTo(bookmark.time);
									controlsRef.current.style.visibility =
										"visible";

									setTimeout(() => {
										controlsRef.current.style.visibility =
											"hidden";
									}, 1000);
								}}
								elevation={3}
							>
								<Paper />
								<div>bookmark at {bookmark.display}</div>
							</div>
						</div>
					))}
				</div>
				<canvas ref={canvasRef} />
			</div>
		</>
	);
}

export default App;

function Paper() {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className='h-6 w-6'
			fill='none'
			viewBox='0 0 24 24'
			stroke='currentColor'
			strokeWidth={2}
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z'
			/>
		</svg>
	);
}
