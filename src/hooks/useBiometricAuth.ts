import { useState, useEffect } from 'react';

interface BiometricCredentials {
  email: string;
  credentialId: string;
}

export const useBiometricAuth = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [savedCredentials, setSavedCredentials] = useState<BiometricCredentials[]>([]);

  useEffect(() => {
    // Check if WebAuthn is supported
    const checkSupport = () => {
      const supported = !!(navigator.credentials && window.PublicKeyCredential);
      setIsSupported(supported);
    };

    checkSupport();

    // Load saved credentials from localStorage
    const loadSavedCredentials = () => {
      try {
        const saved = localStorage.getItem('biometric_credentials');
        if (saved) {
          setSavedCredentials(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Error loading saved credentials:', error);
      }
    };

    loadSavedCredentials();
  }, []);

  const savePassword = async (email: string, password: string): Promise<boolean> => {
    if (!isSupported) return false;

    try {
      // Create credential options
      const credentialCreationOptions: CredentialCreationOptions = {
        publicKey: {
          rp: {
            name: "IJ Langa Consulting",
            id: window.location.hostname,
          },
          user: {
            id: new TextEncoder().encode(email),
            name: email,
            displayName: email,
          },
          pubKeyCredParams: [{ alg: -7, type: "public-key" }],
          authenticatorSelection: {
            authenticatorAttachment: "platform",
            userVerification: "required",
          },
          challenge: new TextEncoder().encode(Date.now().toString()),
        },
      };

      // Create credential
      const credential = await navigator.credentials.create(credentialCreationOptions) as PublicKeyCredential;
      
      if (credential) {
        // Store encrypted password with credential ID
        const credentialData = {
          email,
          credentialId: credential.id,
          encryptedPassword: btoa(password), // Simple base64 encoding (in production use proper encryption)
        };

        // Save to localStorage
        const existing = savedCredentials.filter(c => c.email !== email);
        const updated = [...existing, { email, credentialId: credential.id }];
        setSavedCredentials(updated);
        localStorage.setItem('biometric_credentials', JSON.stringify(updated));
        localStorage.setItem(`pwd_${credential.id}`, credentialData.encryptedPassword);
        
        return true;
      }
    } catch (error) {
      console.error('Error saving biometric credential:', error);
    }
    
    return false;
  };

  const authenticateWithBiometric = async (email: string): Promise<string | null> => {
    if (!isSupported) return null;

    try {
      // Find saved credential for email
      const savedCred = savedCredentials.find(c => c.email === email);
      if (!savedCred) return null;

      // Create authentication options
      const credentialRequestOptions: CredentialRequestOptions = {
        publicKey: {
          challenge: new TextEncoder().encode(Date.now().toString()),
          allowCredentials: [{
            id: new TextEncoder().encode(savedCred.credentialId),
            type: 'public-key',
          }],
          userVerification: "required",
        },
      };

      // Authenticate
      const credential = await navigator.credentials.get(credentialRequestOptions) as PublicKeyCredential;
      
      if (credential) {
        // Retrieve stored password
        const encryptedPassword = localStorage.getItem(`pwd_${credential.id}`);
        if (encryptedPassword) {
          return atob(encryptedPassword); // Decode password
        }
      }
    } catch (error) {
      console.error('Biometric authentication failed:', error);
    }
    
    return null;
  };

  const hasSavedCredential = (email: string): boolean => {
    return savedCredentials.some(c => c.email === email);
  };

  const removeSavedCredential = (email: string) => {
    const updated = savedCredentials.filter(c => c.email !== email);
    setSavedCredentials(updated);
    localStorage.setItem('biometric_credentials', JSON.stringify(updated));
    
    // Also remove stored password
    const credToRemove = savedCredentials.find(c => c.email === email);
    if (credToRemove) {
      localStorage.removeItem(`pwd_${credToRemove.credentialId}`);
    }
  };

  return {
    isSupported,
    savePassword,
    authenticateWithBiometric,
    hasSavedCredential,
    removeSavedCredential,
    savedCredentials,
  };
};