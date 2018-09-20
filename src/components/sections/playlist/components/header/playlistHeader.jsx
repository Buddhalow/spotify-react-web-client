import React from 'react';

import moment from 'moment';
import withUiActions from '../../../../../hoc/uiChange';

import './playlistHeader.css';
import defaultCover from '../../../../../containers/mainSection/images/playlist.png';

const playlistHeader = ({ playlist, album = false, onArtistClick }) => {
  const img =
    playlist.images && playlist.images.length !== 0
      ? playlist.images[0].url
      : defaultCover;

  const owner = playlist.owner
    ? playlist.owner.display_name || playlist.owner.id
    : '';

  const songs = playlist.tracks ? playlist.tracks.total : '0';

  return (
    <div className="playlist-title-container">
      <div className="playlist-image-container">
        <img className="playlist-image" src={img} />
      </div>
      <div className="playlist-info-container">
        <p className="playlist-text">{album ? 'ALBUM' : 'PLAYLIST'}</p>
        <h3 className="header-title playlist">{playlist.name}</h3>
        {!album &&
          playlist.description && (
            <p className="description">{playlist.description}</p>
          )}
        {!album && (
          <p className="created-by">
            {'Created by: '}
            <span className="lighter-text">{owner}</span> - {songs} songs
          </p>
        )}
        {album && (
          <div>
            <div className="created-by">
              <div className="artist">
                By:{' '}
                {playlist.artists
                  ? playlist.artists.map((a, i) => (
                      <span key={i}>
                        <span
                          onClick={() => onArtistClick(a.id)}
                          className="artist-link"
                        >
                          {a.name}
                        </span>
                        {playlist.artists.length - 1 === i ? '' : ' ,'}
                      </span>
                    ))
                  : ''}
              </div>
              <span className="lighter-text">
                {' '}
                {moment(playlist.release_date).format('YYYY')}
              </span>{' '}
              - {playlist.total_tracks || 0} songs
            </div>
          </div>
        )}
        <button className="main-pause-play-btn">
          {true ? 'PLAY' : 'PAUSE'}
        </button>
        {!album && (
          <div className="followers">
            <div>FOLLOWERS</div>
            {playlist.followers ? playlist.followers.total : 0}
          </div>
        )}
      </div>
    </div>
  );
};

export default withUiActions(playlistHeader);
