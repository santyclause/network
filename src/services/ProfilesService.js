import { Account } from "@/models/Account.js";
import { api } from "./AxiosService.js";
import { AppState } from "@/AppState.js";

class ProfilesService {


  async getProfileById(profileId) {
      const response = await api.get(`/api/profiles/${profileId}`)
      const newProfile = new Account(response.data);
      AppState.activeProfile = newProfile;
  }
}

export const profilesService = new ProfilesService();