import React, { useEffect, useState, useContext } from 'react';
import { Flex } from '@chakra-ui/react';
import { GameDataContext } from '../../context/GameDataContext';
import images from '../../lib/images';
import OrbChargedAnimation from '../../lib/animations/orbChargedAnimation';
import OrbIdleAnimation from '../../lib/animations/orbIdleAnimation.js';
import TargetHitBox from './components/TargetHitBox';
import PlayerHitBox from './components/PlayerHitBox';
import Inventory from '../Inventory';
import Banner from '../Banner';
import SpContainer from './components/SpContainer';

const DesktopView = props => {
  const [params] = useContext(GameDataContext);
  const {
    click,
    isMobile,
    specialReady,
    setSpecialReady,
    setPlayerBarProgress,
  } = props;

  return (
    <Flex w="100%" h="100%" flexWrap="wrap">
      <Flex
        className="Action-Window"
        direction="column"
        flex="3 2 75%"
        w="75%"
        bgImage={images.backgrounds.levelbg}
        bgSize="cover"
        bgRepeat="no-repeat"
        bgPosition="0px 0px"
        position="relative"
        style={{ imageRendering: 'pixelated' }}
      >
        <SpContainer
          isMobile={isMobile}
          enabled={specialReady}
          setProgress={setPlayerBarProgress}
          setSpecialReady={setSpecialReady}
        />
        <Flex
          direction="column"
          className="InteractiveWindow"
          flex="5 1 750px"
          h="80%"
          p="80px 0px"
          justify="end"
        >
          <Flex
            className="characterSpace"
            w="100%"
            justify="space-around"
            p="10px 100px"
          >
            <Flex h="100%" w="400px">
              {specialReady === true ? (
                <OrbChargedAnimation />
              ) : (
                <OrbIdleAnimation />
              )}

              <PlayerHitBox
                playerLevel={params.playerLevel}
                playerHealth={params.playerCurrentHp}
                playerMaxHealth={params.playerHp}
                dps={params.dps}
              />
            </Flex>

            <TargetHitBox
              level={params.enemyLevel}
              health={params.currentEnemyHp}
              maxHealth={params.enemyHp}
              enemyDamage={params.enemyDamage}
              click={click}
            />
          </Flex>
        </Flex>
      </Flex>
      <Inventory />
    </Flex>
  );
};

export default DesktopView;
