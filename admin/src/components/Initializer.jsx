import { useEffect, useRef } from 'react';
import { PLUGIN_ID } from '../pluginId';

// Fix for Strapi 5.x: Provide checkUserHasPermissions in multiple scopes
// This is a workaround for a known Strapi 5.x RBAC compatibility issue
const provideCheckUserHasPermissions = () => {
  const defaultImpl = async () => true;
  
  // Provide in multiple scopes to ensure it's accessible
  if (typeof window !== 'undefined') {
    if (!window.checkUserHasPermissions) {
      window.checkUserHasPermissions = defaultImpl;
    }
  }
  
  if (typeof globalThis !== 'undefined') {
    if (!globalThis.checkUserHasPermissions) {
      globalThis.checkUserHasPermissions = defaultImpl;
    }
  }
  
  if (typeof global !== 'undefined') {
    if (!global.checkUserHasPermissions) {
      global.checkUserHasPermissions = defaultImpl;
    }
  }
};

// Provide immediately at module load
provideCheckUserHasPermissions();

const Initializer = () => {
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      
      // Ensure the function is available after React hydration
      provideCheckUserHasPermissions();
      
      // Also try to patch it into Strapi's app context if available
      try {
        // This will be called when the app context is available
        const checkInterval = setInterval(() => {
          if (window.strapi?.app && typeof window.strapi.app.checkUserHasPermissions === 'undefined') {
            window.strapi.app.checkUserHasPermissions = async () => true;
            clearInterval(checkInterval);
          }
        }, 100);
        
        // Clear after 5 seconds to avoid infinite checking
        setTimeout(() => clearInterval(checkInterval), 5000);
      } catch (error) {
        // Silently fail if we can't access Strapi context
      }
    }
  }, []);

  return null;
};

export default Initializer;

