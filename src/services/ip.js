import { get } from '../utils/queryString'

let ipQS = get('ip')
if(!ipQS){
  // ipQS = "182.72.11.106";  //primary
  ipQS = "114.79.159.250";  //secondary
}else {
  ipQS = ipQS.replaceAll("-",".")
}

export default ipQS