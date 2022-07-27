//转换数字函数
export function convertNum(num){
  //如果播放数字大于10万
  if(num>100000000){
    num=(num/100000000).toFixed(0)
    num=num+'亿'
  } else if(num>100000){
    num=(num/10000).toFixed(0)
    num=num+'万'
  }
  return num
}