import axios from 'axios';

const USER = '/api/user';

class UserService {
  /**
   * Gets necessary information for application receipt
   */
  static async getUsers() {
    const temp = await axios.get(USER);
    console.log(temp);
    return temp;
  }

}

export default UserService;
