import React, { useEffect, useContext } from 'react';
import { Box, Flex, Img, Text, Button } from '@chakra-ui/react';
import { GameDataContext } from '../context/GameDataContext';
import images from '../lib/images';

//Enemy hitBox
const TargetHitBox = props => {
  return (
    <Flex
      fontSize="xl"
      direction="column"
      h="100%"
      minW="200px"
      color="whiteAlpha.900"
      align="center"
    >
      <Box className="charInfo">
        <Box className="targetLevel" margin="0 5px">
          Lvl. {props.level}
        </Box>
        <Flex>
          <Box className="hpBar" margin="0 5px">
            HpBar
          </Box>
          <Box className="hpNum">
            {props.health}/{props.maxHealth}
          </Box>
        </Flex>
      </Box>
      <Flex align="end" className="target" h="80%" w="100%">
        <Flex
          display="block"
          h="300px"
          w="300px"
          bgSize="contain"
          bgRepeat="no-repeat"
          bgPosition="bottom"
          bgImg={images.targets.ghost}
          onClick={props.click}
          cursor="crosshair"
        ></Flex>
      </Flex>
    </Flex>
  );
};

//Player Character hitbox
const PlayerHitBox = props => {
  return (
    <Flex
      fontSize="xl"
      direction="column"
      h="100%"
      minW="200px"
      color="whiteAlpha.900"
      align="center"
    >
      <Flex align="end" className="player" h="80%" w="100%">
        <Box
          h="300px"
          w="300px"
          bgSize="contain"
          bgRepeat="no-repeat"
          bgPosition="bottom"
        ></Box>
      </Flex>
    </Flex>
  );
};

const ActionWindow = () => {
  const { health, setHealth } = useContext(GameDataContext);
  const { dps, setDps } = useContext(GameDataContext);
  const { cells, setCells } = useContext(GameDataContext);
  const { maxHealth, setMaxHealth } = useContext(GameDataContext);
  const { level, setLevel } = useContext(GameDataContext);
  const [params, setParam, setParams] = useContext(GameDataContext);
  const newGame = () => {
    setParam('dps', 2);
    setParam('cells', 100);
    setParam('level', 3);
    getHealth();
  };

  //onClick functionality
  const click = () => {
    let newHp = params.health - params.dps;
    setParam('health', newHp);
    console.log(newHp + ' Hp left');

    if (newHp <= 0) {
      console.log('Enemy Taken Down!');
      giveCells();
      setParam('level', params.level + 1);
      respawn();
    } else {
      setParam('health', newHp);
    }
  };

  //Cells(currency) given on kills
  const giveCells = () => {
    let cellsGiven = Math.round(params.maxHealth / 2);
    console.log(cellsGiven + 'Cells Recieved');
    setParam('cells', cellsGiven + params.cells);
  };

  //Hp math
  const getHealth = () => {
    let newMaxHp = Math.round(
      4 * (params.level - 1 + 1.55 ** (params.level - 1.55))
    );
    setParam('health', newMaxHp);
    setParam('maxHealth', newMaxHp);
    console.log('Enemy Health: ' + newMaxHp);
  };

  //respawn Enemy
  const respawn = () => {
    getHealth();
    //add enemy image change
  };

  useEffect(() => {
    newGame();
  }, []);

  return (
    <Flex
      className="Main"
      direction="column"
      h="100%"
      flex="3 2 75%"
      w="75%"
      bgImage={images.backgrounds.forestBg}
      bgSize="2200px"
      bgPosition="bottom"
    >
      <Flex
        direction="column"
        className="InteractiveWindow"
        flex="5 1 750px"
        h="90%"
        justify="flex-end"
      >
        <Flex
          direction="row"
          className="characterSpace"
          height="50%"
          w="100%"
          justify="space-around"
          p="10px 100px"
          align="end"
        >
          <PlayerHitBox />
          <TargetHitBox
            level={params.level}
            health={params.health}
            maxHealth={params.maxHealth}
            click={click}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ActionWindow;
