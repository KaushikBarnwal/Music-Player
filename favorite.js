
document.addEventListener('DOMContentLoaded', () => {
    const currentPlayingTitle = document.getElementById('currentTitle');
    const audioList = document.getElementById('audiolist');
    const progressBar = document.getElementById('progressbar');
    const PlayPause = document.getElementById('playpause');
    const Previous = document.getElementById('previous');
    const Next = document.getElementById('next');
    const Skip = document.getElementById('skip');
    const skipCount = document.getElementById('skipcount');
    // const Mute = document.getElementById('mute');
    // const volumeBar = document.getElementById('volumebar');
    // const currentTime = document.getElementById('currenttime');
    // const durationTime = document.getElementById('duration');
    const favPlaylist = document.getElementById('favplaylist');
    const searchBar = document.getElementById('searchbar');
    const searchResults = document.getElementById('searchresults');
    const Pic = document.getElementById('pic');
    const GIF = document.getElementById('gif');
    // let previousVolume = audioList.volume;

    let favorites =JSON.parse(localStorage.getItem('favorites')) || [];

    let currentTrackIndex = 0;
    GIF.style.opacity = 0;

    function loadtrack(index) {
        audioList.src = favorites[index].src;
        currentPlayingTitle.textContent = favorites[index].title;
        Pic.src = favorites[index].coverimg;
        updateFavPlaylist();
    }
    function updateFavPlaylist() {
        const items = favPlaylist.querySelectorAll('li');
        items.forEach((item, index) => {
            const playPauseIcon = item.querySelectorAll('li');
            if (index === currentTrackIndex) {
                item.classList.add('active');
                playPauseIcon.innerHTML = `<i class="fa-solid fa-pause"></i>`;
            } else {
                item.classList.remove('active');
                playPauseIcon.innerHTML = `<i class="fa-regular fa-circle-play"></i>`;
            }
        });
    }
    // function updateCurrentTime()
    // function updateDuration()
    function searchSongs(query) {
        searchResults.innerHTML = '';
        if (query) {
            const results = favorites.filter(track => track.title.toLowerCase().includes(query.toLowerCase()));
            results.forEach(track => {
                const resultItem = document.createElement('div');
                resultItem.textContent = track.title;
                resultItem.classList.add('searchItemClass');
                resultItem.addEventListener('click', () => {
                    const index = favorites.indexOf(track);
                    currentTrackIndex = index;
                    loadtrack(currentTrackIndex);
                    audioList.play();
                    GIF.style.opacity = 1;
                    searchBar.value = '';
                    searchResults.innerHTML = '';
                });
                searchResults.appendChild(resultItem);
            });
        }
    }
    searchBar.addEventListener('input', (e) => {
        searchSongs(e.target.value);
    });
    // progressBar.addEventListener()
    // PlayPause.addEventListener()
    Previous.addEventListener('click', () => {
        if (currentTrackIndex > 0) {
            currentTrackIndex--;
            loadtrack(currentTrackIndex);
            audioList.play();
            GIF.style.opacity = 1;
        }
    });
    Next.addEventListener('click', () => {
        if (currentTrackIndex < favorites.length - 1) {
            currentTrackIndex++;
            loadtrack(currentTrackIndex);
            audioList.play();
            GIF.style.opacity = 1;
        }
    });
    Skip.addEventListener('click', () => {
        const Scount = parseInt(skipCount.value, 10);
        if (!isNaN(Scount)) {
            currentTrackIndex += Scount;
            if (currentTrackIndex >= favorites.length) {
                currentTrackIndex = favorites.length - 1;
            } else if (currentTrackIndex < 0) {
                currentTrackIndex = 0;
            }
            loadtrack(currentTrackIndex);
            audioList.play();
            GIF.style.opacity = 1;
            skipCount.value = '';
        }
    });
    // Mute.addEventListener()
    // volumeBar.addEventListener()
    // audioList.addEventListener()
    // audioList.addEventListener()

    favorites.forEach((track, index) => {
        const li = document.createElement('li');
        li.classList.add('listitems');

        const coverImgIcon = document.createElement('img');
        coverImgIcon.src = track.coverimg;
        coverImgIcon.classList.add('listcoverimg');

        const title = document.createElement('span');
        title.textContent = track.title;
        title.classList.add('listtitle');

        const playPauseIcon = document.createElement('button');
        playPauseIcon.innerHTML = `<i class="fa-regular fa-circle-play"></i>`;
        playPauseIcon.classList.add('playpauseicon');
        playPauseIcon.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents triggering the li click event
            if (currentTrackIndex === index && !audioList.paused) {
                audioList.pause();
                GIF.style.opacity = 0;
                playPauseIcon.innerHTML = `<i class="fa-regular fa-circle-play"></i>`;
                PlayPause.innerHTML = `
                    <i class="fa-regular fa-circle-play"></i><br><span>Play/Pause</span>
                `;
            } else {
                currentTrackIndex = index;
                // loadtrack(currentTrackIndex);
                audioList.play();
                GIF.style.opacity = 1;
                playPauseIcon.innerHTML = `<i class="fa-solid fa-pause"></i>`;
                PlayPause.innerHTML = `
                    <i class="fa-solid fa-pause"></i><br><span>Play/Pause</span>
                `;
                updateFavPlaylist();
            }
        });

        li.appendChild(coverImgIcon);
        li.appendChild(title);
        li.appendChild(playPauseIcon);
        li.addEventListener('click', () => {
            currentTrackIndex = index;
            loadtrack(currentTrackIndex);
            audioList.play();
            GIF.style.opacity = 1;
        });
        favPlaylist.appendChild(li);
    });

    loadtrack(currentTrackIndex);
});