import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { profilesService } from './ProfilesService.js'

class AccountService {
  
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async updateAccount(userData) {
    const response = await api.put('/account', userData);
    AppState.account = new Account(response.data);
    profilesService.getProfileById(AppState.account.id);
  }
}

export const accountService = new AccountService()
