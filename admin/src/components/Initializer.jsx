import { useEffect, useRef } from 'react';
import { PLUGIN_ID } from '../pluginId';

const Initializer = () => {
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
    }
  }, []);

  return null;
};

export default Initializer;

