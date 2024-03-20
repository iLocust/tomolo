import fetch from 'node-fetch';
import readlineSync from 'readline-sync';
import { HttpsProxyAgent } from 'https-proxy-agent';
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
import fs from 'fs';

const randstr = length =>
    new Promise((resolve, reject) => {
        var text = "";
        var possible =
            "1234567890abcdef";
			//abcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        resolve(text);
    });

const ordernum = (apikey) => new Promise((resolve, reject) => { fetch(`https://smshub.org/stubs/handler_api.php?api_key=${apikey}&action=getNumber&service=ang&operator=any&country=6&maxPrice=1`, {
  headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0'
    },
  "method": "GET"
}).then(res => res.text())
        .then(res => {
            resolve(res)
        })
        .catch(err => reject(err));
});

const getotpnum = (apikey,idorder) => new Promise((resolve, reject) => { fetch(`https://smshub.org/stubs/handler_api.php?api_key=${apikey}&action=getStatus&id=${idorder}`, {
  headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0'
    },
  "method": "GET"
}).then(res => res.text())
        .then(res => {
            resolve(res)
        })
        .catch(err => reject(err));
});

const getotp = (nomer,deviceCode,gent) => new Promise((resolve, reject) => { fetch(`https://api-service.tomoro-coffee.id/portal/app/member/sendMessage?phone=${nomer}&areaCode=62&verifyChannel=SMS`, {
  agent: gent,
  headers: {
      'User-Agent': "2.6.2",
      'Connection': "Keep-Alive",
      'Accept-Encoding': "gzip",
      'token': '',
      'revision': "2.6.2",
      'countryCode': 'id',
      'appChannel': "google play",
      'appLanguage': 'en',
      'timeZone': "Asia/Jakarta",
      'deviceCode': deviceCode,
      'longitude': '',
      'latitude': ''
    },
  "body": null,
  "method": "GET"
}).then(res => res.json())
        .then(res => {
            resolve(res)
        })
        .catch(err => reject(err));
});

const verifotp = (nomer,otp,deviceCode,gent) => new Promise((resolve, reject) => { fetch('https://api-service.tomoro-coffee.id/portal/app/member/loginOrRegister', {
  method: 'POST',
  agent: gent,
  headers: {
	'User-Agent': '2.6.3',
      'Connection': "Keep-Alive",
      'Accept-Encoding': "gzip",
      'Content-Type': "application/json",
      'token': '',
      'revision': '2.6.3',
      'countryCode': 'id',
      'appChannel': "google play",
      'appLanguage': 'en',
      'timeZone': "Asia/Jakarta",
      'deviceCode': deviceCode,
      'longitude': '',
      'latitude': ''
  },
  body: JSON.stringify({
    'phoneArea': '62',
      'phone': nomer,
      'verifyCode': otp,
      'language': 'id',
      'deviceCode': '1',
      'deviceName': '1',
      'channel': "google play",
      'revision': "2.6.2",
      'type': 2,
      'source': ''
  })
}).then(res => res.json())
        .then(res => {
            resolve(res)
        })
        .catch(err => reject(err));
});

const giveClick = (token,reffcode,gent) => new Promise((resolve, reject) => { fetch('https://api-service.tomoro-coffee.id/portal/app/assistance/assist', {
  method: 'POST',
  agent: gent,
  headers: {
	'User-Agent': "TOMORO COFFEE/2.6.3 (Redmi Note 8; Android 11; UserEnv/mobile; AppType/app; Platform/Android; Scale/2.75; ScreenSize/1080x2260); jsBridgeVersion/3.1.0)  Mozilla/5.0 (Linux; Android 11; Redmi Note 8 Build/RQ3A.211001.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.6099.144 Mobile Safari/537.36",
      'Accept': "application/json",
      'Content-Type': "application/json",
      'Pragma': "no-cache",
      'Cache-Control': "no-cache",
      'sec-ch-ua': "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Android WebView\";v=\"120\"",
      'appChannel': "google play",
      'sec-ch-ua-mobile': '?1',
      'revision': "2.6.0",
      'countryCode': 'id',
      'appLanguage': 'en',
      'timeZone': "Asia/Jakarta",
      'token': token,
      'sec-ch-ua-platform': "\"Android\"",
      'Origin': "https://h5-app.tomoro-coffee.id",
      'X-Requested-With': "com.tomoro.indonesia.android",
      'Sec-Fetch-Site': "same-site",
      'Sec-Fetch-Mode': "cors",
      'Sec-Fetch-Dest': "empty",
      'Referer': "https://h5-app.tomoro-coffee.id/",
      'Accept-Language': 'en-US,en;q=0.9'
  },
  body: JSON.stringify({
      'assistanceCode': reffcode
  })
}).then(res => res.json())
        .then(res => {
            resolve(res)
        })
        .catch(err => reject(err));
});


console.log("============================================================================");
const reffmu = readlineSync.question('Masukan Reffcode (AS2024xxxx26348) ? ');;
const smshubkey = "102015Ub6983532d6c06ba5238e811a2dfe027e"

const lolo = 1;

if(lolo == 1) {
for (let i = 0; i < 1; i++) {
console.log("============================================================================");
const agoent = new HttpsProxyAgent('http://rezaapandi7_gmail_com:lunarselena@la.residential.rayobyte.com:8000');
const getnumber = await ordernum(smshubkey);
console.log(getnumber);
const splitnum = getnumber.split(':628');
const splitorder = getnumber.split(':');
const number = '8' + splitnum[1];
const orderid = splitorder[1]
console.log('Berhasil Beli Nomor dengan Order id ==> ' + orderid)
const deviceid = await randstr(16);
const getopt = await getotp(number,deviceid,agoent)
console.log('Menunggu Otp dikirim Ke ==> ' + '0' + number)
console.log(getopt)
if (getopt.success == true){

let kodetp
do {
	kodetp = await getotpnum(smshubkey,orderid);
	//console.log(kodetp)
	await delay(8000)
        } while(kodetp == "STATUS_WAIT_CODE");
if(kodetp == "STATUS_CANCEL"){
	
}else{
const splitotp = kodetp.split(':');
const otpmu = splitotp[1];
console.log('Berhasil dapat OTP ==> ' + otpmu)
const veripopt = await verifotp(number,otpmu,deviceid,agoent)
if(veripopt.success == true){
await fs.appendFileSync("akun.txt", `${number}|${veripopt.data.accountCode}|${veripopt.data.token}\n`);
const klikteman = await giveClick(veripopt.data.token,reffmu,agoent)
console.log(klikteman)
if(klikteman.success == true){
console.log('Berhasil Kirim Rp.' + klikteman.data.cut + ' untuk ' + klikteman.data.nickname)
console.log('Progres Sekarang Rp.' + klikteman.data.assistancePriceProgress)
console.log('Kurang Rp' + klikteman.data.phaseRemain)
}


}
}
}
const xxxx = readlineSync.question('Lanjut (y/n) ? ');
if(xxxx == 'y'){
i--;	
}
console.log("============================================================================");
}

}

var file = fs.readFileSync('akun.txt', 'utf-8');
var splitFile = file.split('\n');
if(lolo == 2) {
for (let i = 0; i < 3; i++) {
console.log("============================================================================");
const agoent = new HttpsProxyAgent('http://brd-customer-hl_d012f21d-zone-datacenter_proxy1:behizh62qs9r@brd.superproxy.io:22225');
var splitin= splitFile[i].split('|');
const klikteman = await giveClick(splitin[2],reffmu,agoent)
//console.log(klikteman)
if(klikteman.success == true){
console.log('Berhasil Kirim Rp.' + klikteman.data.cut + ' untuk ' + klikteman.data.nickname)
console.log('Progres Sekarang Rp.' + klikteman.data.assistancePriceProgress)
console.log('Kurang Rp' + klikteman.data.phaseRemain)
}

}
}
