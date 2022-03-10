import React, {forwardRef} from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import FastRewindIcon from "@material-ui/icons/FastRewind";
import FastForwardIcon from "@material-ui/icons/FastForward";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import VolumeUp from "@material-ui/icons/VolumeUp";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeMute from "@material-ui/icons/VolumeOff";
import FullScreen from "@material-ui/icons/Fullscreen";
import Popover from "@material-ui/core/Popover";

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
	},
	controlIcons: {
		color: "#777",

		fontSize: 50,
		transform: "scale(0.9)",
		"&:hover": {
			color: "#fff",
			transform: "scale(1)",
		},
	},

	bottomIcons: {
		color: "#999",
		"&:hover": {
			color: "#fff",
		},
	},

	volumeSlider: {
		width: 100,
	},
}));

const PrettoSlider = withStyles({
	root: {
		height: 8,
	},
	thumb: {
		height: 24,
		width: 24,
		backgroundColor: "#fff",
		border: "2px solid currentColor",
		marginTop: -8,
		marginLeft: -12,
		"&:focus, &:hover, &$active": {
			boxShadow: "inherit",
		},
	},
	active: {},
	valueLabel: {
		left: "calc(-50% + 4px)",
	},
	track: {
		height: 8,
		borderRadius: 4,
	},
	rail: {
		height: 8,
		borderRadius: 4,
	},
})(Slider);

function ValueLabelComponent(props) {
	const {children, open, value} = props;

	return (
		<Tooltip open={open} enterTouchDelay={0} placement='top' title={value}>
			{children}
		</Tooltip>
	);
}

// eslint-disable-next-line react/display-name
const Controls = forwardRef(
	(
		{
			onSeek,
			onSeekMouseDown,
			onSeekMouseUp,
			onDuration,
			onRewind,
			onPlayPause,
			onFastForward,
			playing,
			played,
			elapsedTime,
			totalDuration,
			onMute,
			muted,
			onVolumeSeekDown,
			onChangeDispayFormat,
			playbackRate,
			onPlaybackRateChange,
			onToggleFullScreen,
			volume,
			onVolumeChange,
			onBookmark,
		},
		ref
	) => {
		const classes = useStyles();
		const [anchorEl, setAnchorEl] = React.useState(null);
		const handleClick = (event) => {
			setAnchorEl(event.currentTarget);
		};

		const handleClose = () => {
			setAnchorEl(null);
		};

		const open = Boolean(anchorEl);
		const id = open ? "simple-popover" : undefined;

		return (
			<div
				ref={ref}
				className='absolute h-full w-full flex justify-between flex-col bg-gray-900/30'
			>
				<div className='flex justify-between flex-col h-full'>
					<div className='flex justify-between items-center flex-row p-5'>
						<div>
							<h1>Video Title</h1>
						</div>
						<div>
							<button onClick={onBookmark}>Bookmark</button>
						</div>
					</div>
					<div className='flex justify-center items-center flex-row'>
						<IconButton
							onClick={onRewind}
							className={classes.controlIcons}
							aria-label='rewind'
						>
							<FastRewindIcon
								className={classes.controlIcons}
								fontSize='inherit'
							/>
						</IconButton>
						<IconButton
							onClick={onPlayPause}
							className={classes.controlIcons}
							aria-label='play'
						>
							{playing ? (
								<PauseIcon fontSize='inherit' />
							) : (
								<PlayArrowIcon fontSize='inherit' />
							)}
						</IconButton>
						<IconButton
							onClick={onFastForward}
							className={classes.controlIcons}
							aria-label='forward'
						>
							<FastForwardIcon fontSize='inherit' />
						</IconButton>
					</div>
					{/* bottom controls */}
					<div className='flex justify-between items-center flex-row p-10'>
						<div className='p-5'>
							<PrettoSlider
								min={0}
								max={100}
								ValueLabelComponent={(props) => (
									<ValueLabelComponent
										{...props}
										value={elapsedTime}
									/>
								)}
								aria-label='custom thumb label'
								value={played * 100}
								onChange={onSeek}
								onMouseDown={onSeekMouseDown}
								onChangeCommitted={onSeekMouseUp}
								onDuration={onDuration}
							/>
						</div>

						<div>
							<div className='flex justify-between items-center'>
								<IconButton
									onClick={onPlayPause}
									className={classes.bottomIcons}
								>
									{playing ? (
										<PauseIcon fontSize='large' />
									) : (
										<PlayArrowIcon fontSize='large' />
									)}
								</IconButton>

								<IconButton
									// onClick={() => setState({ ...state, muted: !state.muted })}
									onClick={onMute}
									className={`${classes.bottomIcons} ${classes.volumeButton}`}
								>
									{muted ? (
										<VolumeMute fontSize='large' />
									) : volume > 0.5 ? (
										<VolumeUp fontSize='large' />
									) : (
										<VolumeDown fontSize='large' />
									)}
								</IconButton>

								<Slider
									min={0}
									max={100}
									value={muted ? 0 : volume * 100}
									onChange={onVolumeChange}
									aria-labelledby='input-slider'
									className={classes.volumeSlider}
									onMouseDown={onSeekMouseDown}
									onChangeCommitted={onVolumeSeekDown}
								/>
								<button
									variant='text'
									onClick={
										onChangeDispayFormat
										//     () =>
										//   setTimeDisplayFormat(
										//     timeDisplayFormat == "normal" ? "remaining" : "normal"
										//   )
									}
								>
									<Typography
										variant='body1'
										style={{color: "#fff", marginLeft: 16}}
									>
										{elapsedTime}/{totalDuration}
									</Typography>
								</button>
							</div>
						</div>

						<div>
							<button onClick={handleClick}>
								<Typography>{playbackRate}X</Typography>
							</button>

							<Popover
								container={ref.current}
								open={open}
								id={id}
								onClose={handleClose}
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								transformOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
							>
								<div container direction='column-reverse'>
									{[0.5, 1, 1.5, 2].map((rate) => (
										<button
											key={rate}
											//   onClick={() => setState({ ...state, playbackRate: rate })}
											onClick={() =>
												onPlaybackRateChange(rate)
											}
											variant='text'
										>
											<Typography
												color={
													rate === playbackRate
														? "secondary"
														: "inherit"
												}
											>
												{rate}X
											</Typography>
										</button>
									))}
								</div>
							</Popover>

							<IconButton
								onClick={onPlayPause}
								className={classes.bottomIcons}
							>
								<div item>
									<button
										onClick={onBookmark}
										startIcon={<BookmarkIcon />}
									></button>
								</div>
							</IconButton>
							<IconButton
								onClick={onToggleFullScreen}
								className={classes.bottomIcons}
							>
								<FullScreen fontSize='large' />
							</IconButton>
						</div>
					</div>
				</div>
			</div>
		);
	}
);

Controls.propTypes = {
	onSeek: PropTypes.func,
	onSeekMouseDown: PropTypes.func,
	onSeekMouseUp: PropTypes.func,
	onDuration: PropTypes.func,
	onRewind: PropTypes.func,
	onPlayPause: PropTypes.func,
	onFastForward: PropTypes.func,
	onVolumeSeekDown: PropTypes.func,
	onChangeDispayFormat: PropTypes.func,
	onPlaybackRateChange: PropTypes.func,
	onToggleFullScreen: PropTypes.func,
	onMute: PropTypes.func,
	playing: PropTypes.bool,
	played: PropTypes.number,
	elapsedTime: PropTypes.string,
	totalDuration: PropTypes.string,
	muted: PropTypes.bool,
	playbackRate: PropTypes.number,
};
export default Controls;
