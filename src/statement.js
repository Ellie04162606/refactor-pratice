const COMEDY =  'comedy';
const TRAGEDY = 'tragedy';

function statement (invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = typeAmount(play,perf);
    volumeCredits += getVolumeCredits(play.type,perf.audience)
    //print line for this order
    result += ` ${play.name}: ${format(thisAmount)} (${perf.audience} seats)\n`;
    totalAmount += thisAmount;
  }

  result += `Amount owed is ${format(totalAmount)}\n`;
  result += `You earned ${volumeCredits} credits \n`;
  return result;
}

function format(thisAmount){
  return new Intl.NumberFormat('en-US', {
             style: 'currency',
             currency: 'USD',
             minimumFractionDigits: 2,
           }).format(thisAmount/100);
}

function getVolumeCredits(type,audience){
   let volumeCredits = Math.max(audience - 30, 0);
   if (COMEDY === type) volumeCredits += Math.floor(audience / 5);
   return volumeCredits;
}

function typeAmount(play,perf){
  let amount=0;
  switch (play.type) {
      case TRAGEDY:
        amount = tragedyAmount(perf.audience);
        break;
      case COMEDY:
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
