import React, {forwardRef} from "react";
import PropTypes from "prop-types";
import {Typography} from "@material-ui/core";

// eslint-disable-next-line react/display-name
const Control = forwardRef(
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
		const [anchorEl, setAnchorEl] = React.useState(null);
		const handleClick = (event) => {
			setAnchorEl(event.currentTarget);
		};

		const handleClose = () => {
			setAnchorEl(null);
		};

		const open = Boolean(anchorEl);
		const id = open ? "simple-popover" : undefined;

		const foo = played * 100;

		return (
			<>
				<div className='bg-white border-slate-100 dark:bg-slate-800 dark:border-slate-500 border-b rounded-t-xl p-4 pb-6 sm:p-10 sm:pb-8 lg:p-6 xl:p-10 xl:pb-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8'>
					<div className='flex items-center space-x-4'>
						<div className='min-w-0 flex-auto space-y-1 font-semibold'>
							<p className='text-cyan-500 dark:text-cyan-400 text-sm leading-6'>
								<abbr title='Episode'>Ep.</abbr> 128
							</p>
							<h2 className='text-slate-500 dark:text-slate-400 text-sm leading-6 truncate'>
								Scaling CSS at Heroku with Utility Classes
							</h2>
							<p className='text-slate-900 dark:text-slate-50 text-lg'>
								Full Stack Radio
							</p>
						</div>
					</div>
					<div className='space-y-2'>
						<div className='relative'>
							<div>
								<input
									defaultValue='0'
									type='range'
									id='volume'
									name='volume'
									min={0}
									max={onDuration}
									// ref={progressBar}
									onChange={onSeek}
									onMouseDown={onSeekMouseDown}
									onChangeCommitted={onSeekMouseUp}
								/>
							</div>
							{/* <div className='bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden'>
								<input
									type={`range`}
									min={0}
									max={onDuration}
									style={{width: `${foo}%`}}
									className='bg-cyan-500 dark:bg-cyan-400  h-2'
									role='progressbar'
									aria-label='music progress'
									aria-valuenow='1456'
									aria-valuemin='0'
									aria-valuemax='4550'
									value={played * 100}
									onMouseDown={onSeekMouseDown}
									onChangeCommitted={onSeekMouseUp}
									onDuration={onDuration}
								></input>
								{/* <div>
									<input
										type='range'
										className={styles.progressBar}
										defaultValue='0'
										ref={progressBar}
										onChange={changeRange}
									/>
								</div> */}

							{/* <input
									type='range'
									min={0}
									max={onDuration}
									style={{
										// width: `${foo}%`,
										left: `${foo}%`,
										top: `${foo}%`,
									}}
									onChange={onSeek}
									className='ring-cyan-500 dark:ring-cyan-400 ring-2 absolute  w-4 h-4 -mt-2 -ml-2 flex items-center justify-center bg-white rounded-full shadow'
								/> */}
							{/* <div className='w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-400 rounded-full ring-1 ring-inset ring-slate-900/5'></div>
								</div> */}
						</div>
						<div className='flex justify-between text-sm leading-6 font-medium tabular-nums'>
							<div className='text-cyan-500 dark:text-slate-100'>
								{elapsedTime}
							</div>
							<div className='text-slate-500 dark:text-slate-400'>
								{totalDuration}
							</div>
						</div>
					</div>
				</div>
				<div className='bg-slate-50 text-slate-500 dark:bg-slate-600 dark:text-slate-200 rounded-b-xl flex items-center'>
					<div className='flex-auto flex items-center justify-evenly'>
						<button
							type='button'
							onClick={onBookmark}
							aria-label='Add to favorites'
						>
							{BookMarkIcon()}
						</button>
						{/* <button
							type='button'
							className='hidden sm:block lg:hidden xl:block'
							aria-label='Previous'
						>
							<svg width='24' height='24' fill='none'>
								<path
									d='m10 12 8-6v12l-8-6Z'
									fill='currentColor'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M6 6v12'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button> */}
						<button
							onClick={onRewind}
							type='button'
							aria-label='Rewind 10 seconds'
						>
							<svg width='24' height='24' fill='none'>
								<path
									d='M6.492 16.95c2.861 2.733 7.5 2.733 10.362 0 2.861-2.734 2.861-7.166 0-9.9-2.862-2.733-7.501-2.733-10.362 0A7.096 7.096 0 0 0 5.5 8.226'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M5 5v3.111c0 .491.398.889.889.889H9'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button>
					</div>
					<button
						onClick={onPlayPause}
						type='button'
						className='bg-white text-slate-900 dark:bg-slate-100 dark:text-slate-700 flex-none -my-2 mx-auto w-20 h-20 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center'
						aria-label='Pause'
					>
						{playing ? (
							<svg width='30' height='32' fill='currentColor'>
								<rect
									x='6'
									y='4'
									width='4'
									height='24'
									rx='2'
								/>
								<rect
									x='20'
									y='4'
									width='4'
									height='24'
									rx='2'
								/>
							</svg>
						) : (
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5'
								viewBox='0 0 20 20'
								fill='currentColor'
							>
								<path
									fillRule='evenodd'
									d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z'
									clipRule='evenodd'
								/>
							</svg>
						)}
					</button>
					<div className='flex-auto flex items-center justify-evenly'>
						<button
							onClick={onFastForward}
							type='button'
							aria-label='Skip 10 seconds'
						>
							<svg width='24' height='24' fill='none'>
								<path
									d='M17.509 16.95c-2.862 2.733-7.501 2.733-10.363 0-2.861-2.734-2.861-7.166 0-9.9 2.862-2.733 7.501-2.733 10.363 0 .38.365.711.759.991 1.176'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M19 5v3.111c0 .491-.398.889-.889.889H15'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button>
						{/* <button
							type='button'
							className='hidden sm:block lg:hidden xl:block'
							aria-label='Next'
						>
							<svg width='24' height='24' fill='none'>
								<path
									d='M14 12 6 6v12l8-6Z'
									fill='currentColor'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M18 6v12'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button> */}
						<button
							onClick={handleClick}
							type='button'
							className='rounded-lg text-xs leading-6 font-semibold px-2 ring-2 ring-inset ring-slate-500 text-slate-500 dark:text-slate-100 dark:ring-0 dark:bg-slate-500'
						>
							<div>
								{[0.5, 1, 1.5, 2].map((rate) => (
									<button
										key={rate}
										//   onClick={() => setState({ ...state, playbackRate: rate })}
										onClick={() =>
											onPlaybackRateChange(rate)
										}
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
						</button>
					</div>
				</div>
			</>
		);
	}
);
Control.propTypes = {
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
export default Control;

function BookMarkIcon() {
	return (
		<svg width='24' height='24'>
			<path
				d='M7 6.931C7 5.865 7.853 5 8.905 5h6.19C16.147 5 17 5.865 17 6.931V19l-5-4-5 4V6.931Z'
				fill='currentColor'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}
