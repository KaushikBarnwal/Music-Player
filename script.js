
document.addEventListener('DOMContentLoaded', () => {
    const currentPlayingTitle = document.getElementById('currentTitle');
    const audioList = document.getElementById('audiolist');
    const progressBar = document.getElementById('progressbar');
    const PlayPause = document.getElementById('playpause');
    const Previous = document.getElementById('previous');
    const Next = document.getElementById('next');
    const Skip = document.getElementById('skip');
    const skipCount = document.getElementById('skipcount');
    const Mute = document.getElementById('mute');
    const volumeBar = document.getElementById('volumebar');
    const currentTime = document.getElementById('currenttime');
    const durationTime = document.getElementById('duration');
    const playList = document.getElementById('playlist');
    const searchBar = document.getElementById('searchbar');
    const searchResults = document.getElementById('searchresults');
    const Pic = document.getElementById('pic');
    const GIF = document.getElementById('gif');
    let previousVolume = audioList.volume;

    let Tracks = [
        { title: 'Aankhon Mein Teri', src: 'Music/1.mp3', coverimg: "covers/1.jpeg" },
        { title: 'Bekhayali', src: 'Music/2.mp3', coverimg: "covers/2.jpeg" },
        { title: 'Pachtaoge', src: 'Music/3.mp3', coverimg: "covers/3.jpeg" },
        { title: 'Chogada Loveyatri', src: 'Music/4.mp3', coverimg: "covers/4.jpeg" },
        { title: 'Hawa Banke', src: 'Music/5.mp3', coverimg: "covers/5.jpeg" },
        { title: 'Khairiyat', src: 'Music/6.mp3', coverimg: "covers/6.jpeg" },
        { title: 'Humsafar', src: 'Music/7.mp3', coverimg: "covers/7.jpeg" },
        { title: 'Iktara', src: 'Music/8.mp3', coverimg: "covers/8.jpeg" },
        { title: 'Kun Faya Kun', src: 'Music/9.mp3', coverimg: "covers/9.jpeg" },
        { title: 'Laaree Chootee', src: 'Music/10.mp3', coverimg: "covers/10.jpeg" },
        { title: 'Lut Gaye', src: 'Music/11.mp3', coverimg: "covers/11.jpeg" },
        // { title: 'Main Chali Main Chali', src: 'Music/12.mp3', coverimg: "covers/12.jpeg" },
        { title: 'Pushpa - Srivalli', src: 'Music/13.mp3', coverimg: "covers/13.jpeg" },
        { title: 'Raataan Lambiyan', src: 'Music/14.mp3', coverimg: "covers/14.jpeg" },
        { title: 'Tarasti Hai Nigahen', src: 'Music/15.mp3', coverimg: "covers/15.jpeg" },
        { title: 'Tera Rasta Mai Chhodu Na', src: 'Music/16.mp3', coverimg: "covers/16.jpeg" },
        { title: 'Tera Sath Tera Man Hai', src: 'Music/17.mp3', coverimg: "covers/17.jpeg" },
        { title: 'Tere Naal', src: 'Music/18.mp3', coverimg: "covers/18.jpeg" },
        { title: 'Vaaste Song', src: 'Music/19.mp3', coverimg: "covers/19.jpeg" },
        { title: 'Aankhon Aankhon', src: 'Music/20.mp3', coverimg: "covers/20.jpeg" },
    ]
    // Load favourites from localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    let currentTrackIndex = 0;
    GIF.style.opacity = 0;

    function loadtrack(index) {
        audioList.src = Tracks[index].src;
        currentPlayingTitle.textContent = Tracks[index].title;
        Pic.src= Tracks[currentTrackIndex].coverimg;
        updateplaylist();
    }
    function updateplaylist() {
        const items = playList.querySelectorAll('li');
        items.forEach((item, index) => {
            const playPauseIcon = item.querySelector('.playpauseicon');
            if (index === currentTrackIndex) {
                item.classList.add('active');
                playPauseIcon.innerHTML = `<i class="fa-solid fa-pause"></i>`;
            } else {
                item.classList.remove('active');
                playPauseIcon.innerHTML = `<i class="fa-regular fa-circle-play"></i>`;
            }
        });
    }
    function updateCurrentTime() {
        const minutes = Math.floor(audioList.currentTime / 60);
        const seconds = Math.floor(audioList.currentTime % 60);
        currentTime.textContent = `
            ${minutes}:${seconds < 10 ? '0' : ''}${seconds}
        `;
        progressBar.value = (audioList.currentTime / audioList.duration) * 100;
    }
    function updateDuration() {
        const minutes = Math.floor(audioList.duration / 60);
        const seconds = Math.floor(audioList.duration % 60);
        durationTime.textContent = `
            ${minutes}:${seconds < 10 ? '0' : ''}${seconds}
        `;
    }
    searchResults.style.display = 'none';
    function searchSongs(query) {
        searchResults.innerHTML = '';
        searchResults.style.display = query ? 'block' : 'none';
        if (query) {
            const results = Tracks.filter(track => track.title.toLowerCase().includes(query.toLowerCase()));
            results.forEach(track => {
                const resultItem = document.createElement('div');
                resultItem.textContent = track.title;
                resultItem.classList.add('searchItemClass');
                resultItem.addEventListener('click', () => {
                    const index = Tracks.indexOf(track);
                    currentTrackIndex = index;
                    loadtrack(currentTrackIndex);
                    audioList.play();
                    GIF.style.opacity = 1;
                    searchBar.value = '';
                    searchResults.innerHTML = '';
                    searchResults.style.display = 'none';
                });
                searchResults.appendChild(resultItem);
            });
        }
    }
    searchBar.addEventListener('input', (e) => {
        searchSongs(e.target.value);
    });

    progressBar.addEventListener('input', (e) => {
        const seekTime = (e.target.value / 100) * audioList.duration;
        audioList.currentTime = seekTime;
    });
    PlayPause.addEventListener('click', () => {
        if (audioList.paused) {
            audioList.play();
            GIF.style.opacity = 1;
            PlayPause.innerHTML = `
                <i class="fa-solid fa-pause"></i><br><span>Play/Pause</span>
            `;
        } else {
            audioList.pause();
            GIF.style.opacity = 0;
            PlayPause.innerHTML = `
                <i class="fa-regular fa-circle-play"></i><br><span>Play/Pause</span>
            `;
        }
    });
    Previous.addEventListener('click', () => {
        if (currentTrackIndex > 0) {
            currentTrackIndex--;
            loadtrack(currentTrackIndex);
            audioList.play();
            GIF.style.opacity = 1;
        }
    });
    Next.addEventListener('click', () => {
        if (currentTrackIndex < Tracks.length - 1) {
            currentTrackIndex++;
            loadtrack(currentTrackIndex);
            audioList.play();
            GIF.style.opacity = 1;
        }
    });
    Skip.addEventListener('click', () => {
        const Scount = parseInt(skipCount.value, 10);
        // const trackList = window.location.pathname.includes('favourite.html') ? favorites : Tracks;
        if (!isNaN(Scount)) {
            currentTrackIndex += Scount;
            if (currentTrackIndex >= Tracks.length) {
                currentTrackIndex = Tracks.length - 1;
            } else if (currentTrackIndex < 0){
                currentTrackIndex = 0;
            }
            loadtrack(currentTrackIndex);
            audioList.play();
            GIF.style.opacity = 1;
            skipCount.value = '';
        }
    });
    Mute.addEventListener('click', () => {
        audioList.muted = !audioList.muted;
        // Mute.innerHTML = audioList.muted ? `<i class="fa-solid fa-volume-xmark"></i>` : `<i class="fa-solid fa-volume-high"></i>`;
        if (audioList.muted) {
            audioList.volume = previousVolume;
            Mute.innerHTML = `
                <i class="fa-solid fa-volume-xmark"></i>
            `;
            volumeBar.value = 0;
        } else {
            audioList.muted = false;
            audioList.volume = previousVolume;
            Mute.innerHTML = `
                <i class="fa-solid fa-volume-high"></i>
            `;
            volumeBar.value = previousVolume;
        }
    });
    volumeBar.addEventListener('input', (e) => {
        audioList.volume = e.target.value;
        if (!audioList.muted) {
            previousVolume = e.target.value; 
        }
    });

    audioList.addEventListener('timeupdate', updateCurrentTime);
    audioList.addEventListener('loadedmetadata', () => {
        updateDuration();
        updateCurrentTime();
    });

    Tracks.forEach((track, index) => {
        const li = document.createElement('li');
        li.classList.add('listitems');

        const coverImgIcon = document.createElement('img');
        coverImgIcon.src = track.coverimg;
        coverImgIcon.classList.add('listcoverimg');

        const title = document.createElement('span');
        title.textContent = track.title;
        title.classList.add('listtitle');

        const favIcon = document.createElement('span');
        favIcon.innerHTML = `<i class="fa-regular fa-heart"></i>`;
        favIcon.classList.add('listfavicon');
        if (favorites.find(fav => fav.title === track.title)) {
            favIcon.innerHTML = `<i class="fa-solid fa-heart"></i>`;
        }
        favIcon.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents triggering the li click event
            const trackIndex = favorites.findIndex(fav => fav.title === track.title);
            if (trackIndex === -1) {
                favorites.push(track);
                favIcon.innerHTML = `<i class="fa-solid fa-heart"></i>`;
            } else {
                favorites.splice(trackIndex, 1);
                favIcon.innerHTML = `<i class="fa-regular fa-heart"></i>`;
            }
            localStorage.setItem('favorites', JSON.stringify(favorites));
        });

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
                audioList.play();
                GIF.style.opacity = 1;
                PlayPause.innerHTML = `
                    <i class="fa-solid fa-pause"></i><br><span>Play/Pause</span>
                `;
                updateplaylist();
            }
        });
        li.appendChild(coverImgIcon);
        li.appendChild(title);
        li.appendChild(favIcon);
        li.appendChild(playPauseIcon);
        li.addEventListener('click', () => {
            currentTrackIndex = index;
            loadtrack(currentTrackIndex);
            audioList.play();
            PlayPause.innerHTML = `
                    <i class="fa-solid fa-pause"></i><br><span>Play/Pause</span>
            `;
            GIF.style.opacity = 1;
        });
        playList.appendChild(li);
    });

    loadtrack(currentTrackIndex);
});
