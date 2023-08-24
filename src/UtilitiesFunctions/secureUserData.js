// const key = process.env.REACT_APP_ENCRYPT_KEY
const client =process.env.REACT_APP_TECH_CLIENT
export const userData = process.env.REACT_APP_USER_CLIENT

const encryptData = async (data, sessionKey) => {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const ciphertext = await crypto.subtle.encrypt({name: 'AES-GCM', iv}, sessionKey, data);
    const encrypted = new Uint8Array([...iv, ...new Uint8Array(ciphertext)]);
    const encryptedString = Array.from(encrypted).join(',');
    return encryptedString;
}

const decryptData = async (encryptedString, sessionKey) => {
    const encrypted = new Uint8Array(encryptedString.split(',').map(Number));
    const iv = encrypted.slice(0, 12);
    const ciphertext = encrypted.slice(12);
    const decrypted = await crypto.subtle.decrypt({name: 'AES-GCM', iv}, sessionKey, ciphertext);
    const decoder = new TextDecoder();
    const decryptedString =  decoder.decode(decrypted);
    return decryptedString;
}
export const secureJWTAndID = async (JWT, ID) => {
const USERINFO ={
    JWT,
    ID
}
    const encoder = new TextEncoder();
    const data = encoder.encode(JSON.stringify(USERINFO));
    const session_J_Key = await crypto.subtle.generateKey({name: 'AES-GCM', length: 256}, true, ['encrypt', 'decrypt']);
    const exportedKey = await crypto.subtle.exportKey('jwk', session_J_Key);
    sessionStorage.setItem('session_J_Key', JSON.stringify(exportedKey));
    
    const JWTAndID = await encryptData(data, session_J_Key);
    sessionStorage.setItem(client, JWTAndID);
console.log('jwt snd id for storeage', JWTAndID, 'name visible',client)
}

export const getJWTAndID = async () => {
    const JWTAndID =  sessionStorage.getItem(client);
   try {
    if (!JWTAndID) {
        return null;
      }
      
      const exportedKey = JSON.parse(sessionStorage.getItem('session_J_Key'));
      const sessionKey = await crypto.subtle.importKey('jwk', exportedKey, { name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
      
      // Decrypt and return the session storage data
      const decryptedString = await decryptData(JWTAndID, sessionKey);
      const JWT_AND_ID = await JSON.parse(decryptedString);
// console.log(JWT_AND_ID)
      return JWT_AND_ID;
   } catch (error) {
    throw error
   }
}

export const secureUserUid = async (USERINFO) => {

    const encoder = new TextEncoder();
    const data = encoder.encode(JSON.stringify(USERINFO));
    const uid_ss_Key = await crypto.subtle.generateKey({name: 'AES-GCM', length: 256}, true, ['encrypt', 'decrypt']);
    const exportedKey = await crypto.subtle.exportKey('jwk', uid_ss_Key);
    sessionStorage.setItem('uid_ss_Key', JSON.stringify(exportedKey));
    
    const User_Info = await encryptData(data, uid_ss_Key);
    sessionStorage.setItem(userData, User_Info);
console.log('userdata value stored',userData, 'key used for storage',uid_ss_Key)
}




  export const getSecureUserUid = async () => {
    const User_Info = sessionStorage.getItem(userData);
   try {
    if (!User_Info) {
        return null;
      }
      
      const exportedKey = JSON.parse(sessionStorage.getItem('uid_ss_Key'));
      const sessionKey = await crypto.subtle.importKey('jwk', exportedKey, { name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
      
      // Decrypt and return the session storage data
      const decryptedString = await decryptData(User_Info, sessionKey);
      const USER_INFO = await JSON.parse(decryptedString);

      return USER_INFO;
   } catch (error) {
    return error
   }
}

export const getJWT = async () => {
    const encryptedString = sessionStorage.getItem('JWT');
   try {
    if (!encryptedString) {
        return null;
      }
      
      const exportedKey = JSON.parse(sessionStorage.getItem('sessionKey'));
      const sessionKey = await crypto.subtle.importKey('jwk', exportedKey, { name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
      const jwt = await decryptData(encryptedString, sessionKey);

      return jwt;
   } catch (error) {
    return error
   }
}


// works same as getsucureuid

export const  UserData = async () => {
    const encryptedString = sessionStorage.getItem(userData);
   try {
    if (!encryptedString) {
        return null;
      }
      
      const exportedKey = JSON.parse(sessionStorage.getItem('sessionKey'));
      const sessionKey = await crypto.subtle.importKey('jwk', exportedKey, { name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
      
      const encrypted = new Uint8Array(encryptedString.split(',').map(Number));
      const iv = encrypted.slice(0, 12);
      const ciphertext = encrypted.slice(12);
      
      const decrypted = await crypto.subtle.decrypt({name: 'AES-GCM', iv}, sessionKey, ciphertext);
      const decoder = new TextDecoder();
      const decryptedString =  decoder.decode(decrypted);
      const decryptedData = await JSON.parse(decryptedString);
      return decryptedData;
   } catch (error) {
    return error
   }
    
  }