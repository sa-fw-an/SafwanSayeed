import { Html, useProgress } from '@react-three/drei';

const CanvasLoader = () => {
  const { progress } = useProgress();

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    fontFamily: 'sans-serif',
  };

  const textStyle = {
    fontSize: '14px',
    color: '#F1F1F1',
    fontWeight: 'bold',
    marginTop: '40px',
    textAlign: 'center',
  };

  return (
    <Html as="div" center style={containerStyle}>
      <span className="canvas-loader" />
      <p style={textStyle}>{progress ? `${progress.toFixed(2)}%` : 'Loading...'}</p>
    </Html>
  );
};

export default CanvasLoader;
