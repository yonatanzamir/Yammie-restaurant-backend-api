
function adjustTimePattern(dateTime){
    const orderTimeFix=dateTime.split("-")
    orderTimeFix[1]=orderTimeFix[1].length==1 ? "0"+orderTimeFix[1] : orderTimeFix[1];
    return orderTimeFix.join("-")
}

module.exports={adjustTimePattern}