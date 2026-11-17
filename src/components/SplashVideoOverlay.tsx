import { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useVideoPlayer, VideoView } from 'expo-video';

type SplashVideoOverlayProps = {
  onFinished: () => void;
};

export function SplashVideoOverlay({ onFinished }: SplashVideoOverlayProps) {
  const hasFinished = useRef(false);
  const player = useVideoPlayer(require('@/assets/branding/splash.mp4'), (videoPlayer) => {
    videoPlayer.loop = false;
    videoPlayer.muted = true;
    videoPlayer.play();
  });

  const finish = useCallback(() => {
    if (hasFinished.current) return;
    hasFinished.current = true;
    onFinished();
  }, [onFinished]);

  useEffect(() => {
    SplashScreen.hide();

    const endSubscription = player.addListener('playToEnd', finish);
    const errorSubscription = player.addListener('statusChange', ({ status }) => {
      if (status === 'error') finish();
    });
    const fallback = setTimeout(finish, 15000);

    return () => {
      endSubscription.remove();
      errorSubscription.remove();
      clearTimeout(fallback);
    };
  }, [finish, player]);

  return (
    <View pointerEvents="auto" style={styles.container}>
      <VideoView
        player={player}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        nativeControls={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 10,
    elevation: 10,
    backgroundColor: '#090B14',
  },
});
