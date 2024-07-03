# 🎵 CodeAlpha_Music-Player 🎵

A web-based music player that allows users to play songs, manage playlists, and mark favorites. The player includes features like search, play/pause, next/previous track, volume control, and seek functionality.

## Features

- **Play/Pause**: ⏯️ Toggle play and pause for the current track.
- **Next/Previous**: ⏭️⏮️ Skip to the next or previous track in the playlist.
- **Volume Control**: 🔊 Adjust the volume and mute/unmute the audio.
- **Seek**: ⏩ Seek to a specific time in the track using the progress bar.
- **Favorites**: ❤️ Mark tracks as favorites and manage a separate favorites playlist.
- **Search**: 🔍 Search for tracks in the playlist and favorites.
- **Responsive Design**: 📱 Adapts to different screen sizes using media queries.

## Setup

1. 📥 Clone the repository or download the project files.
2. 🗂️ Ensure you have all the necessary media files (audio tracks and cover images) in the respective `Music` and `covers` directories.
3. 🌐 Open `index.html` and `favourite.html` in your preferred browser.

## Usage

### Playing Tracks

- **Play/Pause**: ⏯️ Click the play/pause button to toggle between play and pause.
- **Next/Previous**: ⏭️⏮️ Use the next and previous buttons to skip tracks.
- **Volume Control**: 🔊 Use the volume slider to adjust the volume. Click the mute button to mute/unmute the audio.
- **Seek**: ⏩ Drag the progress bar to seek to a specific part of the track.

### Managing Favorites

- **Mark as Favorite**: ❤️ Click the heart icon next to a track to add it to your favorites. It will be stored in `localStorage`.
- **View Favorites**: 📄 Navigate to the favorites page by clicking on the "Favourites" link in the navigation bar.
- **Play Favorites**: 🎶 Use the controls on the favorites page to play tracks from your favorites playlist.

### Search

- **Search Tracks**: 🔍 Use the search bar to find tracks in the current playlist. The search results will appear below the search bar.

## Responsive Design

📱 The player layout adapts to different screen sizes for a better user experience on mobile and tablet devices.

## Customization

- **Adding Tracks**: 🎵 Add your own tracks and cover images to the `Music` and `covers` directories. Update the `Tracks` array in `script.js` with the new track details.
- **Styling**: 🎨 Modify `styles.css` to customize the look and feel of the player.

## License

📜 This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

- Icons by [FontAwesome](https://fontawesome.com)
- 🎧 Music tracks and cover images are placeholders. Replace them with your own media files.
