import { Grid, Image } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Games = () => {
  return (
    <Grid
      templateColumns={{
        base: '1fr 1fr',
        md: '1fr 1fr 1fr 1fr',
        xl: '1fr 1fr 1fr 1fr 1fr',
      }}
      gap="4"
    >
      <NavLink to="/games/game-of-thrones">
        <Image
          width="200px"
          src="https://firebasestorage.googleapis.com/v0/b/rohlik-help-courier.appspot.com/o/games%2FGame%20of%20Thrones%2Fgame-of-thrones.png?alt=media&token=7348af3c-2a15-428d-86c4-4e1d30d2a078"
          aria-label="game-of-thrones"
        />
      </NavLink>
      <NavLink to="/games/game-of-thrones">
        <Image
          width="200px"
          src="https://firebasestorage.googleapis.com/v0/b/rohlik-help-courier.appspot.com/o/games%2FGame%20of%20Thrones%2Fgame-of-thrones.png?alt=media&token=7348af3c-2a15-428d-86c4-4e1d30d2a078"
          aria-label="game-of-thrones"
        />
      </NavLink>
      <NavLink to="/games/game-of-thrones">
        <Image
          width="200px"
          src="https://firebasestorage.googleapis.com/v0/b/rohlik-help-courier.appspot.com/o/games%2FGame%20of%20Thrones%2Fgame-of-thrones.png?alt=media&token=7348af3c-2a15-428d-86c4-4e1d30d2a078"
          aria-label="game-of-thrones"
        />
      </NavLink>
    </Grid>
  );
};

export default Games;
