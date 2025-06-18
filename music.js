    let currentMusic = 0;

    const music = document.querySelector('#audio');

    const seekBar = document.querySelector('.seek-bar');
    const songName = document.querySelector('.music-name');
    const artistName = document.querySelector('.artist-name');
    const disk = document.querySelector('.disk');
    const currentTime = document.querySelector('.current-time');
    const musicDuration = document.querySelector('.song-duration');
    const playBtn = document.querySelector('.play-button');
    const forwardBtn = document.querySelector('.forwardbutton');
    const backwardBtn = document.querySelector('.backwardbutton');
    const marquee = document.getElementById("marquee-content");
    const marqueeContent = document.querySelector('.marquee-content');

    function updateSongText(song, artist) {

        const entry = `
            <p class="music-name">${song}</p>
            <p>•</p>
            <p class="artist-name">${artist}</p>
            <p>•</p>
        `;

        marquee.innerHTML = entry.repeat(100);
    }

    playBtn.addEventListener('click', () => {
        const marqueeContent = document.querySelector('.marquee-content');
        if (playBtn.className.includes('pause')) {
            music.play();
            if (marqueeContent) marqueeContent.classList.add('play');
        } else {
            music.pause();
            if (marqueeContent) marqueeContent.classList.remove('play');
        }
        playBtn.classList.toggle('pause');
        if (disk) disk.classList.toggle('play');
    });

    

    const setMusic = (i) => {
        seekBar.value = 0;
        let song = songs[i];
        currentMusic = i;
        music.src = song.path;

        songName.innerHTML = song.name;
        artistName.innerHTML = song.artist;
        if (disk) disk.style.backgroundImage = `url('${song.cover}')`;
        currentTime.innerHTML = '00:00';

        if (marquee) updateSongText(song.name, song.artist);
        
        music.onloadedmetadata = () => {
            seekBar.max = music.duration;
            musicDuration.innerHTML = formatTime(music.duration);
        };
    };


    setMusic(0);

    music.addEventListener('ended', () => {
        forwardBtn.click();
    });


    const formatTime = (time) => {
        let min = Math.floor(time / 60);
        if(min < 10){
            min = `0${min}`;
        }
        let sec = Math.floor(time % 60);
        if(sec < 10){
            sec = `0${sec}`;
        }
        return `${min} : ${sec}`;
    }

    // seek bar 

    setInterval(() => {
        seekBar.value = music.currentTime;
        currentTime.innerHTML = formatTime(music.currentTime);
       if (Math.floor(music.currentTime) >= Math.floor(music.duration)) {
            forwardBtn.click();
        }
    }, 900)

    seekBar.addEventListener('change', () => {
        music.currentTime = seekBar.value;
    })

    const playMusic = () => {
        music.play();
        playBtn.classList.remove('pause');
        if (disk) disk.classList.add('play');
        const marqueeContent = document.querySelector('.marquee-content');
        if (marqueeContent) marqueeContent.classList.add('play');
    }


    // forward and backward buttons

    forwardBtn.addEventListener('click', () => {
        if(currentMusic >= songs.length - 1){
            currentMusic = 0;
        }else{
            currentMusic++;
        }
        setMusic(currentMusic);
        playMusic();
    })

    backwardBtn.addEventListener('click', () => {
        if(currentMusic <= 0){
            currentMusic = songs.length - 1;
        }else{
            currentMusic--;
        }
        setMusic(currentMusic);
        playMusic();
    })

