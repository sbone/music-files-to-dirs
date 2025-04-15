# organize-music-files-into-folders-js

Script to organize a series of music files into proper folders, using their ID3 tags

Turn this:
```
media/
  ├── music.mp3
  ├── track.mp3
  ├── music_2.flac
```

Into this:
```
media/
  ├── {Artist 1}/{Album}/music.mp3
  ├── {Artist 2}/{Album 2}/track.mp3
  ├── {Artist 3}/{Album 3}/music_2.flac
```

## Setup

1. Create `./media` and populate with your music files
2. `npm install`

## Usage

1. `npm run organize`