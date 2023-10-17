import { get } from "../utils/queryString";
import { store } from "./store";
import { updateState } from "./commonSlice";

let skipLogin = true;
// let skipLogin = get('skipLogin')
// if (skipLogin == "") skipLogin = true

// if (skipLogin) {
store.dispatch(
  updateState({
    access_token: "dummy",
    userId: 300000006565312,
    userName: "kathrine.kaper",
    userType: "PER",
  })
);
//}
export default skipLogin;
