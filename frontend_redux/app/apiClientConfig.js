import ApiClient from './services/ApiClient';
import SessionManager from './services/SessionManager';

let client = ApiClient.getInstance();

client.setBaseUrl(API_BASE_URL);
client.setAuthToken(SessionManager.getInstance().getAuthToken());
