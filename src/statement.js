function statement (invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;
    thisAmount = selectType(play,perf);
    // add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);
    //print line for this order
    result += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits \n`;
  return result;
}

function selectType(play,perf){
let amount=0;
 switch (play.type) {
      case 'tragedy':
        amount = tragedyAmount(perf.audience);
        break;
      case 'comedy':
        amount = comedyAmount(perf.audience);
        break;
      default:
        throw new Error(`unknown type: ${play.type}`);
    }
    return amount;
}

function tragedyAmount(audience){
  let amount = 40000;
  if (audience > 30) {
    amount += 1000 * (audience - 30);
    }
  return amount;
}

function comedyAmount(audience){
  let amount = 30000 + 300 * audience;
  if (audience > 20) {
      amount += 10000 + 500 * (audience - 20);
  }
  return amount;
}

module.exports = {
  statement,
};
