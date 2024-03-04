# Custom Video Player Task for Rigi (Frontend)

This project is a React.js based Video Player application with playlist support, featuring seeking, timer, autoplay, speed selector, playlist reordering and various other functionalities.

## 🔗 [Hosted Link](https://video-player-custom-dhavalkolhe.vercel.app/)

## Structure in brief

The project follows a modular structure with React components like `App`, `Player`, and `Playlist`, each handling specific functionalities and user interactions. `App` manages overall state, including video data, while `Player` focuses on video playback controls and interaction. `Playlist` displays a list of videos and allows reordering via `react-drag-reorder`. External libraries like `@phosphor-icons/react` and `react-drag-reorder` are utilized. Additionally, a custom hook `usePlayer` provides various video control functions. Styling is applied using Tailwind CSS for responsiveness. The project maintains clear separation of concerns and extensibility, facilitating easy maintenance and further development.

## Run Locally

Clone the project

```bash
  git clone https://github.com/dhavalkolhe/video-player-custom
```

Go to the project directory

```bash
  cd video-player-custom
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Features

#### Playback Features:

`Playlist support:` Organize and manage a collection of videos for sequential playback.

`Feature seeking:` Allow users to quickly jump to specific points within a video.

`Toggle Play/Pause:` Switches the video playback state between playing and paused.

`Toggle Mute:` Silences or unmutes the video audio.

`Timer:`
Switches the display between the total video duration and the remaining time until the video ends.

`AutoPlay:` Automatically start playback of the next video in a playlist.

`Volume Slider:` Allows users to adjust the video's volume level.

`Go to next/previous video:` Navigates to the next or previous video in the playlist.

`Full screen:` Enable viewing the video in full screen mode.

`Speed selector:` Control the playback speed of the video.

#### Video Management Features:

`Download:` Allow users to download videos for offline viewing.

`Picture-in-picture mode:` Enable users to watch the video in a small, resizable window that floats on top of other applications.

#### Playlist Management Features:

`Playlist rearrange:` Allow users to change the order of videos within a playlist by simply dragging and dropping.

`Playlist video filtering:` Provide options to filter videos in a playlist based on title.

`Click to play:` This functionality allows users to initiate playback of a specific video in a playlist by clicking on it.

## External

#### [LightHouse Peformance](https://drive.google.com/file/d/1mMKy8skO3yNPqxOUjciptZE6HmIswUfN/view?usp=sharing)
